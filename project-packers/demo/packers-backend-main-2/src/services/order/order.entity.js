import generateMailTemplate from '../../utils/generateMailTemplate';
import Request from '../request/request.schema';
import Discount from '../discount/discount.schema';
import Cart from '../cart/cart.schema';
import Products from '../product/product.schema';
import User from '../user/user.schema';
import Orders from './order.schema';
import fs from 'fs';
import path from 'path';
import { sendNotification } from '../notification/notification.function';
import generateNumber from '../../utils/generateNumber';

//statics
import { badRequest, serverErr } from '../../utils/statics';

//   these are the set to validate the request query.
const allowedQuery = new Set(['page', 'limit', 'sortBy', 'orderNumber', 'status', 'date', 'populate', '_id', 'id', 'user', 'search']);

/**
 * This function is for payment through ssl commerz
 * Discount conditions are checked if there are any
 * @param discountItemsTotal calculates the total price of the items where discount is applicable
 * @param nondiscountItemsTotal calculates the total price of the items where discount is not applicable
 * @param {Object} req - The request object have the information about the order, userid and orderid.
 * after order the selected item quantity is subtracted from the main order collection
 * @redirects to the success, fail or cancel url
 */
export const registerOrder = ({ db, sslcz, settings, lyra }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    const cart = await db.findOne({ table: Cart, key: { user: req.user.id, body: req.body } });
    req.body = { ...req.body, products: cart?.products, requests: cart?.requests, discountApplied: cart?.discountApplied?.code };
    if (req.body.shippingaddress) req.user.shippingaddress = req.body.shippingaddress;
    db.save(req.user);

    // Fetch products and requests
    const { products, requests, discountApplied } = req.body;
    const productIds = products ? products.map((product) => product.product) : [];
    const requestIds = requests ? requests.map((request) => request.request) : [];
    const [productsData, requestsData] = await Promise.all([
      db.find({ table: Products, key: { query: { '_id': { '$in': productIds } }, allowedQuery: allowedQuery, paginate: false } }),
      db.find({ table: Request, key: { query: { '_id': { '$in': requestIds } }, allowedQuery: allowedQuery, paginate: false } })
    ]);

    let totalPrice = 0;
    let productNames = [];
    let productCategories = [];
    let discountItemsTotal = 0;
    let nondiscountItemsTotal = 0;

    if (products?.length > 0) {
      for (const orderedProduct of products) {
        const element = productsData.find((product) => orderedProduct.product.toString() === product._id.toString());
        if (!element) continue;
        if (element.quantity < orderedProduct.productQuantity) {
          return res.status(400).send({ message: `${element.name} is out of stock.`, status: false });
        }
        const productPrice = element.price + element.tax + element.fee;
        if (discountApplied) {
          const discount = await db.findOne({ table: Discount, key: { code: discountApplied, paginate: false } });
          req.body.discountApplied = {
            amount: discount?.amount,
            percentage: discount?.percentage,
            code: discount?.code
          };
          if (element.category.toString() === discount.category.toString() && element.subcategory.toString() === discount.subcategory.toString()) {
            discountItemsTotal += productPrice * orderedProduct.productQuantity;
          }
          else {
            nondiscountItemsTotal += productPrice * orderedProduct.productQuantity;
          }
        }
        else {
          nondiscountItemsTotal += productPrice * orderedProduct.productQuantity;
        }
        productNames.push(element.name);
        productCategories.push(element.category.name || 'product');
        element.quantity -= orderedProduct.productQuantity;
        await element.save();
      }
    }
    if (requests?.length > 0) {
      for (const orderedRequest of requests) {
        const element = requestsData.find((request) => orderedRequest.request.toString() === request._id.toString());
        if (!element) continue;
        productNames.push(element.name);
        productCategories.push('request');
        totalPrice += (element.price + element.tax + element.fee) * orderedRequest.requestQuantity;
      }
    }
    // Discount calculation
    let discount = 0;
    if (discountApplied) {
      discount = await db.findOne({ table: Discount, key: { code: discountApplied, paginate: false } });
      if (!discount) return res.status(400).send({ message: 'Coupon not found', status: false });
      const currentDate = new Date();
      if (new Date(discount.expiry_date) < currentDate) return res.status(400).send({ message: 'Coupon expired', status: false });
      if (discount.limit < discount.usedBy.length) return res.status(400).send({ message: 'Coupon expired', status: false });
      if (discount.percentage) {
        discount = (discountItemsTotal * discount.percentage) / 100;
      } else {
        discount = discount.amount;
      }
    }

    totalPrice = totalPrice + nondiscountItemsTotal - discount;
    if (isNaN(totalPrice)) return res.status(400).send(badRequest);

    req.body.user = req.user.id;
    req.body.insideDhaka ? totalPrice += 99 : totalPrice += 150;
    req.body.orderNumber = generateNumber();
    console.log(totalPrice, nondiscountItemsTotal, discountItemsTotal);
    const order = await db.create({ table: Orders, key: { ...req.body, populate: { path: 'user', select: 'fullName' } } });
    if (!order) return res.status(400).send(badRequest);

    await lyra.insert('order', {
      id: order._id.toString(),
      orderNumber: order.orderNumber,
      customer: order.user.fullName
    });

    // Generate and send to redirect
    const data = {
      total_amount: totalPrice.toFixed(2),
      currency: 'BDT',
      tran_id: `${'PP' + Date.now().toString(36).toUpperCase()}`,
      success_url: `${settings.domain}ordersuccess/${order.id}`,
      fail_url: `${settings.domain}orderfail/${order.id}`,
      cancel_url: `${settings.domain}orderfail/${order.id}`,
      ipn_url: `${settings.domain}orderipn`,
      shipping_method: 'Courier',
      product_name: `${productNames.join()}`,
      product_category: `${productCategories.join()}`,
      product_profile: 'general',
      cus_name: `${order.shippingaddress.name ? order.shippingaddress.name : req.user.name}`,
      cus_email: `${order.email}`,
      cus_add1: `${order.shippingaddress.address}`,
      cus_add2: `${order.shippingaddress.address}`,
      cus_city: `${order.shippingaddress.city}`,
      cus_state: `${order.shippingaddress.city}`,
      cus_postcode: `${order.shippingaddress.zip}`,
      cus_country: 'Bangladesh',
      cus_phone: `${order.phone}`,
      ship_name: `${order.shippingaddress.name ? order.shippingaddress.name : req.user.fullName}`,
      ship_add1: `${order.shippingaddress.address}`,
      ship_add2: `${order.shippingaddress.address}`,
      ship_city: `${order.shippingaddress.city}`,
      ship_state: `${order.shippingaddress.city}`,
      ship_postcode: `${order.shippingaddress.zip}`,
      ship_country: 'Bangladesh',
      discount_amount: 0,
      emi_option: 0,
      value_a: totalPrice.toFixed(2)
    };

    sslcz.init(data).then(apiResponse => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      order.sessionkey = apiResponse.sessionkey;
      order.total = totalPrice;
      order.save();
      res.send({ url: GatewayPageURL });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function updates the status of the order to failed
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns {Object} the order
 */
export const payOrder = ({ db, settings, sslcz }) => async (req, res) => {
  try {
    const order = db.findOne({ table: Orders, key: { id: req.params.id } });
    const data = {
      total_amount: order.totalPrice.toFixed(2),
      currency: 'BDT',
      tran_id: `${'PP' + Date.now().toString(36).toUpperCase()}`,
      success_url: `${settings.domain}ordersuccess/${order.id}`,
      fail_url: `${settings.domain}orderfail/${order.id}`,
      cancel_url: `${settings.domain}orderfail/${order.id}`,
      ipn_url: `${settings.domain}orderipn`,
      shipping_method: 'Courier',
      product_name: 'Products',
      product_category: 'Products',
      product_profile: 'general',
      cus_name: `${order.shippingaddress.name ? order.shippingaddress.name : req.user.name}`,
      cus_email: `${order.email}`,
      cus_add1: `${order.shippingaddress.address}`,
      cus_add2: `${order.shippingaddress.address}`,
      cus_city: `${order.shippingaddress.city}`,
      cus_state: `${order.shippingaddress.city}`,
      cus_postcode: `${order.shippingaddress.zip}`,
      cus_country: 'Bangladesh',
      cus_phone: `${order.phone}`,
      ship_name: `${order.shippingaddress.name ? order.shippingaddress.name : req.user.fullName}`,
      ship_add1: `${order.shippingaddress.address}`,
      ship_add2: `${order.shippingaddress.address}`,
      ship_city: `${order.shippingaddress.city}`,
      ship_state: `${order.shippingaddress.city}`,
      ship_postcode: `${order.shippingaddress.zip}`,
      ship_country: 'Bangladesh',
      discount_amount: 0,
      emi_option: 0,
      value_a: order.totalPrice.toFixed(2)
    };

    sslcz.init(data).then(apiResponse => {
      let GatewayPageURL = apiResponse.GatewayPageURL;
      order.sessionkey = apiResponse.sessionkey;
      order.save();
      res.send({ url: GatewayPageURL });
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};


/**
 * This function updates status of the order and clears the user cart after successful payment
 * @param {Object} req - The request object have the response from ssl commerz.
 * @returns {Object} the order
 */
export const orderSuccess = ({ db, ws, mail, sslcz, settings }) => async (req, res) => {
  try {
    sslcz.validate({ val_id: req.body.val_id }).then(async (data) => {
      if (data.amount != req.body.value_a) {
        return res.redirect(settings.frontendURL);
      }
      const order = await db.update({
        table: Orders, key: {
          id: req.params.id, body: {
            val_id: data.val_id,
            trxID: data.tran_id,
            bankTranid: data.bank_tran_id,
            storeAmount: data.store_amount,
            status: 'paid'
          }, populate: { path: 'products.product requests.request' }
        }
      });
      if (order.requests.length > 0) {
        const requestIds = order.requests.map((request) => request.request.id);
        await db.update({ table: Request, key: { id: { '$in': requestIds }, body: { status: 'closed' } } });
      }
      await db.update({ table: Cart, key: { user: order.user, body: { products: [], requests: [], discountApplied: null } } });
      const emailTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'order.ejs'), 'utf-8');
      const options = {
        order: order,
        serverLink: `${settings.domain}`,
        homeLink: `${settings.domain}`,
        toplogo: 'https://asset.cloudinary.com/dtihpuutc/7ba37c541ca14faf4f5897e431a15807',
        whitelogo: 'https://asset.cloudinary.com/dtihpuutc/6561a4a68f947e42db0ce8037cae0edf',
        orderlogo: 'https://asset.cloudinary.com/dtihpuutc/3adf4f842838bd32ac94a002181eff1a'
      };
      sendNotification(db, ws, [{ '_id': order.user }], 'Your order has been placed', 'cart');
      const html = generateMailTemplate(emailTemplate, options);
      const maillog = await mail({ receiver: order.email, subject: 'Order mail', body: html, type: 'html' });
      if (!maillog) {
        const currentDate = new Date();
        const logMessage = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}: Email sending failed for order ID ${order.id}: ${maillog?.rejected?.join(',')}\n`;
        const logStream = fs.createWriteStream(path.join(path.resolve(), 'logs', 'order_email_log.txt'), { flags: 'a' });
        logStream.write(logMessage);
        logStream.end();
      }
      if (req.body.val_id) {
        res.redirect(settings.frontendURL + 'checkout?order=success?orderid=' + order.id);
      }
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function updates the status of the order to failed
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns {Object} the order
 */
export const orderFail = ({ db, settings }) => async (req, res) => {
  try {
    await db.update({
      table: Orders, key: { id: req.params.id, body: { failedReason: req.body.error, status: 'cancelled' }, populate: { path: 'products.product requests.request' } }
    });
    return res.redirect(settings.frontendURL + 'checkout?order=failed');
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function initiates a refund for the specific order
 * @param {Object} req - The request object have the response from ssl commerz.
 * @returns {Object} the order
 */
export const refundOrder = ({ db, sslcz }) => async (req, res) => {
  try {
    const order = await db.findOne({ table: Orders, key: { id: req.params.id } });
    const data = {
      refund_amount: order.total,
      refund_remarks: req.body.remarks || '',
      bank_tran_id: order.bankTranid,
    };
    sslcz.initiateRefund(data).then(data => {
      if (data.status === 'failed') return res.status(400).send(data);
      order.refundRefid = data.refund_ref_id;
      order.status = data.status === 'success' ? 'refunded' : 'refundProcessing';
      order.save();
      res.status(200).send(order);
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function queries a refund for the specific order
 * @param {Object} req - The request object have the response from ssl commerz.
 * @returns {Object} the order
 */
export const refundStatus = ({ db, sslcz }) => async (req, res) => {
  try {
    const order = await db.findOne({ table: Orders, key: { id: req.params.id } });
    if (!order.refundRefid) return res.staus(400).send({ message: 'Refund has not been initialized', status: false });
    const data = {
      refund_ref_id: order.refundRefid
    };
    sslcz.refundQuery(data).then(data => {
      order.status = data.status === 'success' ? 'refunded' : 'refundProcessing';
      order.save();
      res.status(200).send({
        initiated_on: data.initiated_on,
        refunded_on: data.refunded_on,
        status: data.status,
        errorReason: data.errorReason
      });
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function queries a refund for the specific order
 * @param {Object} req - The request object have the response from ssl commerz.
 * @returns {Object} the order
 */
export const transactionStatus = ({ db, sslcz }) => async (req, res) => {
  try {
    const order = await db.findOne({ table: Orders, key: { id: req.params.id } });
    const data = {
      tran_id: order.trxID
    };
    sslcz.transactionQueryByTransactionId(data).then(data => {
      res.status(200).send(data);
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};


/**
 * This function gets all the orders in the database
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns {Object} all the orders
 */
export const getAllOrders = ({ db, lyra }) => async (req, res) => {
  try {
    if (req.query.status === 'all') delete req.query.status;
    if (!req.query.search) {
      const orders = await db.find({
        table: Orders,
        key: {
          allowedQuery, query: req.query, populate: { path: 'user products.product requests.request', select: 'fullName email phone address name description origin images quantity price category tags link status fee tax', },
        },
      });
      return res.status(200).send(orders);
    }

    const searchData = await lyra.search('order', {
      term: req.query.search,
    });

    const orderIds = searchData.hits.map((order) => order.id);

    const allOrders = await db.find({
      table: Orders,
      key: {
        allowedQuery,
        query: { id: { $in: orderIds }, ...req.query },
        populate: {
          path: 'user products.product requests.request',
          select: 'fullName email phone address name description origin images quantity price category tags link status fee tax',
        },
      },
    });

    res.status(200).send(allOrders);
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getSingleOrder function is used to get a single order from the orders collection
 * @param req.params.id This is the id of the order.
 * @returns the order
 */
export const getSingleOrder = ({ db }) => async (req, res) => {
  try {
    const order = await db.findOne({
      table: Orders, key: {
        id: req.params.id, populate: {
          path: 'user products.product requests.request', select: 'fullName email phone address name description origin images quantity price category tags link status tax fee'
        }
      }
    });
    order ? res.status(200).send(order) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getUserOrder function is used to get a single order from the orders collection
 * @param req.params.id This is the id of the user.
 * @returns the order
 */
export const getUserOrder = ({ db }) => async (req, res) => {
  try {
    const order = await db.find({ table: Orders, key: { query: { ...req.query, user: req.user.id, }, allowedQuery: allowedQuery, populate: { path: 'user products.product requests.request', select: 'fullName email phone address name description origin images quantity price category tags link status tax fee' } } });
    order ? res.status(200).send(order) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};


/**
 * @param updateOrder function updates the single order by id
 * @param req.params.id is the id of the order sent in the params
 * @returns the order after update
 */
export const updateOrder = ({ db, lyra }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every(
      (k) => req.body[k] !== '' || req.body[k] !== undefined
    );
    if (!validobj) return res.status(400).send(badRequest);
    const order = await db.update({
      table: Orders,
      key: { id: req.params.id, body: req.body },
    });

    // remove previously inserted search data
    await lyra.remove('order', req.params.id);

    // insert updated order data for orama search
    await lyra.insert('order', {
      id: order._id.toString(),
      orderNumber: order.orderNumber,
      customer: order.user.fullName
    });

    order ? res.status(200).send(order) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param removeOrder function updates the single order by id
 * @param req.params.id is the id of the order sent in the params
 * @returns successful or failed
 */
export const removeOrder = ({ db, lyra }) => async (req, res) => {
  try {
    if (!req.body.id.length) return res.send(400).send(badRequest);
    const order = await db.removeAll({ table: Orders, key: { id: { '$in': req.body.id } } });
    req.body.id.forEach(async id => {
      await lyra.remove('order', id);
    });
    order.deletedCount < 1 ? res.status(400).send({ message: 'Order not found', status: false }) : res.status(200).send({ message: 'Deleted Successfully', status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param { req } this parameter contains the request object
 * @param getCustomer function gets the customers details in the admin dashboar
 * @returns the customers data
 */
export const getCustomer = ({ lyra }) => async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (req.query.status === 'abandoned') {

      const pipeline = [
        { $match: { status: 'pending', date: { $lt: new Date(Date.now() - 1000 * 60 * 60 * 24) } } },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $addFields: {
            totalOrder: { $size: '$user' }
          },
        },
        { $unwind: '$user' },
        {
          $group: {
            _id: '$user._id',
            fullName: { $first: '$user.fullName' },
            phone: { $first: '$user.phone' },
            shippingAddress: { $first: '$shippingaddress' },
            totalOrder: { $sum: '$totalOrder' },
            totalSpent: { $sum: '$total' }
          }
        }
      ];

      if (req.query.search) {
        const searchData = await lyra.search('customer', { term: req.query.search });
        const searchIds = searchData.hits.map(elem => elem.id);
        pipeline.unshift({
          $match: { _id: { $in: searchIds } }
        });
      }

      if (req.query?.sortBy) {
        const [field, sortOrder] = req.query.sortBy.split('|');
        pipeline.push({
          $sort: { [field]: sortOrder === 'desc' ? -1 : 1 }
        });
      }

      if (req.query.paginate === 'true') {
        pipeline.push({
          $skip: (page - 1) * limit,
        });
        pipeline.push({
          $limit: limit
        });
      }

      const result = await Orders.aggregate(pipeline);

      return res.status(200).send({ docs: result, totalDocs: result.length, limit, page, totalPages: result.length / page });
    }

    const pipeline = [
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'user',
          as: 'orders'
        }
      },
      {
        $addFields: {
          totalOrder: {
            $cond: {
              if: { $isArray: '$orders' },
              then: { $size: '$orders' },
              else: 0,
            },
          },
        },
      },
      { $unwind: '$orders' },
      {
        $group: {
          _id: '$_id',
          fullName: { $first: '$fullName' },
          phone: { $first: '$phone' },
          shippingAddress: { $first: '$shippingaddress' },
          totalOrder: { $sum: 1 },
          totalSpent: { $sum: '$orders.total' }
        }
      }
    ];

    if (req.query.status === 'new') {
      pipeline.push({
        $match: { totalOrder: 1 }
      });
    }

    if (req.query.status === 'returning') {
      pipeline.push({
        $match: { totalOrder: { $gt: 1 } }
      });
    }

    if (req.query.search) {
      const searchData = await lyra.search('customer', { term: req.query.search });
      const searchIds = searchData.hits.map(elem => elem.id);
      pipeline.unshift({
        $match: { _id: { $in: searchIds } }
      });
    }

    if (req.query?.sortBy) {
      const [field, sortOrder] = req.query.sortBy.split('|');
      pipeline.push({
        $sort: { [field]: sortOrder === 'desc' ? -1 : 1 }
      });
    }

    if (req.query.paginate === 'true') {
      pipeline.push({
        $skip: (page - 1) * limit,
      });
      pipeline.push({
        $limit: limit
      });
    }

    const customers = await User.aggregate(pipeline);
    customers ? res.status(200).send({ docs: customers, totalDocs: customers.length, limit, page, totalPages: customers.length / page }) : res.status(400).send({ message: 'Bad Request', status: false });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};
/**
 * This Function is used to get Dashboard overview data
 * @returns the customers data
 */
export const getOverView = () => async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const result = await Orders.aggregate([
      {
        $match: { date: { $gte: thirtyDaysAgo } },
      },
      {
        $facet: {
          totalCostResult: [
            {
              $unwind: '$products',
            },
            {
              $lookup: {
                from: 'products',
                localField: 'products.product',
                foreignField: '_id',
                as: 'productInfo',
              },
            },
            {
              $unwind: '$productInfo',
            },
            {
              $group: {
                _id: null,
                totalCost: {
                  $sum: {
                    $multiply: [
                      { $add: ['$productInfo.price', '$productInfo.tax'] },
                      '$products.productQuantity',
                    ],
                  },
                },
              },
            },
          ],
          totalRevenueResult: [
            {
              $unwind: '$products',
            },
            {
              $lookup: {
                from: 'products',
                localField: 'products.product',
                foreignField: '_id',
                as: 'productInfo',
              },
            },
            {
              $unwind: '$productInfo',
            },
            {
              $group: {
                _id: null,
                totalRevenue: {
                  $sum: { $multiply: ['$productInfo.fee', '$products.productQuantity'] },
                },
              },
            },
          ],
          totalOrderCount: [{ $count: 'totalOrder' }],
          completedOrderCount: [
            { $match: { status: 'completed' } },
            { $count: 'completedOrder' },
          ],
          cancelledOrderCount: [
            { $match: { status: 'cancel' } },
            { $count: 'cancelledOrder' },
          ],
        },
      },
    ]);

    const {
      totalCostResult,
      totalRevenueResult,
      totalOrderCount,
      completedOrderCount,
      cancelledOrderCount,
    } = result[0];
    const totalRequest = await Request.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });


    const overview = {
      totalCost: totalCostResult[0] ? totalCostResult[0].totalCost : 0,
      totalRevenue: totalRevenueResult[0] ? totalRevenueResult[0].totalRevenue : 0,
      totalOrder: totalOrderCount[0] ? totalOrderCount[0].totalOrder : 0,
      completedOrder: completedOrderCount[0] ? completedOrderCount[0].completedOrder : 0,
      cancelledOrder: cancelledOrderCount[0] ? cancelledOrderCount[0].cancelledOrder : 0,
      totalRequest
    };
    res.status(200).send(overview);

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong', status: false });

  }
};

/**
 * @param chartData function  serve Area chart and heatmap data
 * @query req.qyery.filter is the query to filter area chart by month or week
 * @returns successful or failed
 */

export const chartData = () => async (req, res) => {
  try {
    const areaChartData = req?.query?.filter ? await generateChartData(req.query.filter) : await generateChartData('month');

    const heatmapData = [];

    for (let day = 1; day <= 7; day++) {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      startOfDay.setDate(startOfDay.getDate() - startOfDay.getDay() + day);
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      const ordersData = await Orders.aggregate([
        {
          $match: { date: { $gte: startOfDay, $lte: endOfDay } },
        },
        {
          $group: {
            _id: { hour: { $hour: '$date' } },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            hour: '$_id.hour',
            count: 1,
          },
        },
      ]);

      const dayData = {
        day,
        '3am': 0,
        '6am': 0,
        '9am': 0,
        '12am': 0,
        '3pm': 0,
        '6pm': 0,
        '9pm': 0,
        '12pm': 0,
      };

      ordersData.forEach((data) => {

        const hour = (data.hour) + 6;

        const slot = hour >= 3 && hour < 6 ? '3am' : hour >= 6 && hour < 9 ? '6am' :
          hour >= 9 && hour < 12 ? '9am' : hour >= 12 && hour < 15 ? '12am' :
            hour >= 15 && hour < 18 ? '3pm' : hour >= 18 && hour < 21 ? '6pm' : '9pm';
        dayData[slot] += data.count;
      });

      heatmapData.push(dayData);
    }

    res.status(200).send({ areaChart: areaChartData, heatmapData });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong', status: false });

  }
};


const generateChartData = async (filter) => {
  if (filter === 'month') {
    const startOfMonth = new Date();
    startOfMonth.setMonth(0);
    const endOfMonth = new Date();
    const orderData = await Orders.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          order: { $sum: 1 },
        },
      },
    ]);

    const requestData = await Request.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          request: { $sum: 1 },
        },
      },
    ]);

    const mergedData = [];
    for (let month = startOfMonth.getMonth(); month <= endOfMonth.getMonth(); month++) {
      const order = orderData.find(item => item._id === month + 1) || { _id: month + 1, order: 0 };
      const request = requestData.find(item => item._id === month + 1) || { _id: month + 1, request: 0 };

      mergedData.push({
        month: month + 1,
        order: order.order,
        request: request.request,
      });
    }
    return mergedData;
  }
  else {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const orderCounts = await Orders.aggregate([
      {
        $match: {
          date: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: '$date',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const reqCounts = await Request.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: '$createdAt',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const order = Array(7).fill(0);
    const request = Array(7).fill(0);
    orderCounts.forEach((dayCount) => {
      const dayIndex = dayCount._id === 1 ? 6 : dayCount._id - 2;
      order[dayIndex] = dayCount.count;
    });
    reqCounts.forEach((dayCount) => {
      const dayIndex = dayCount._id === 1 ? 6 : dayCount._id - 2;
      request[dayIndex] = dayCount.count;
    });
    const result = [];

    for (let i = 0; i < order.length; i++) {
      result.push({
        day: i + 1,
        order: order[i],
        request: request[i]
      });
    }


    return result;

  }



};
