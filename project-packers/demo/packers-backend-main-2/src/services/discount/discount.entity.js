import couponGenerator from '../../utils/couponGenerator';
import Discount from './discount.schema';
const allowedQuery = new Set(['paginate', 'page', 'limit', 'expiry_date', 'sortBy']);

//statics
import { badRequest, serverErr } from '../../utils/statics';

/**
 * @param registerDiscount function is used to register a discount to the discount collection
 * @param {Object} req This is the req object.
 * @returns the discount
 */
export const registerDiscount = ({ db }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    if (req.body?.percentage && !(req.body.percentage <= 100)) return res.status(400).send({ message: 'Percentage must be less than 100', status: false });
    if (!req.body.code) req.body.code = couponGenerator(req.body.amount ? req.body.amount : req.body.percentage);
    const discount = await db.create({ table: Discount, key: req.body });
    discount ? res.status(200).send(discount) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getAllDiscount function is used to get all the discounts from the discount collection
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns all the discounts
 */
export const getAllDiscount = ({ db }) => async (req, res) => {
  try {
    const filter = {};
    const today = new Date();
    if (req?.query?.filter) {
      if (req?.query?.filter === 'valid') filter.expiry_date = { $gte: today };
      else if (req?.query?.filter === 'expired') filter.expiry_date = { $lt: today };
    }
    delete req?.query?.filter;
    const discount = await db.find({ table: Discount, key: { query: { ...req.query, ...filter }, allowedQuery: allowedQuery , populate: { path: 'category usedBy.user' } } });
    discount ? res.status(200).send(discount) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param removeDiscount function removes the discount by id
 * @param req.params.id is the id of the discount sent in the params
 * @returns success or failed
 */
export const removeDiscount = ({ db }) => async (req, res) => {
  try {
    if (!req.body.id.length) return res.send(400).send(badRequest);
    const discount = await db.removeAll({ table: Discount, key: { id: { $in: req.body.id } } });
    discount.deletedCount < 1 ? res.status(400).send({ message: 'Coupon not found', status: false }) : res.status(200).send({ message: 'Deleted Successfully', status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param useDiscount function add the single discount by code
 * @param {Object} req This is the req object.
 * @returns percentage or amount
 */
export const useDiscount = ({ db }) => async (req, res) => {
  try {
    const discount = await db.findOne({ table: Discount, key: { code: req.query.code, paginate: false } });
    if (!discount) return res.status(400).send({ message: 'Coupon not found', status: false });
    if (new Date(discount.expiry_date) < new Date()) return res.status(400).send({ message: 'Coupon expired', status: false });
    if (discount.limit < discount.usedBy.length) return res.status(400).send({ message: 'Coupon expired', status: false });
    const used = discount.usedBy.find(user => { return user.user.toString() === req.user.id; });
    if (used) return res.status(400).send({ message: 'You have previously used this discount', status: false });
    discount.usedBy.push({ user: req.user.id });
    discount.limit -= 1;
    discount.save();
    discount.amount ? res.status(200).send({ code: discount.code, amount: discount.amount }) : res.status(200).send({ code: discount.code, percentage: discount.percentage });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param useDiscount function removes the discount by code
 * @param {Object} req This is the req object.
 * @returns percentage or amount
 */
export const abandonDiscount = ({ db }) => async (req, res) => {
  try {
    const discount = await db.findOne({ table: Discount, key: { code: req.query.code, paginate: false } });
    const newUsedBy = discount.usedBy.filter((user) => { return user.user.toString() !== req.user.id; });
    discount.usedBy = newUsedBy;
    discount.limit += 1;
    discount.save();
    res.status(200).send({ status: true, message: 'Coupon removed' });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};