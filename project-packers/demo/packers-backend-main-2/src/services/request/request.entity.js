import deleteImages from '../../utils/deleteImages';
import generateMailTemplate from '../../utils/generateMailTemplate';
import Cart from '../cart/cart.schema';
import Request from './request.schema';
import fs from 'fs';
import path from 'path';
import { sendNotification } from '../notification/notification.function';
import generateNumber from '../../utils/generateNumber';

//statics
import { badRequest, serverErr } from '../../utils/statics';

// these are the set to validate the request body or query.
const createAllowed = new Set(['name', 'link', 'note', 'quantity', 'images']);
const allowedQuery = new Set(['page', 'limit', 'id', '_id', 'paginate', 'status', 'date', 'createdAt', 'requestNumber', 'search', 'sortBy']);

/**
 * @param registerRequest function is used to register a request to the request collection
 * @param {Object} req This is the req object.
 * @throws {Error} If the request body includes properties other than those allowed or if there is an error during the database operation.
 * @returns the request
 */
export const registerRequest = ({ db, imageUp, lyra }) => async (req, res) => {
  try {
    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');
    const valid = Object.keys(req.body).every((k) => createAllowed.has(k));
    if (!valid)
      return res.status(400).send(badRequest);
    if (req.files?.images?.length > 1) {
      for (const image of req.files.images) {
        const img = await imageUp(image.path);
        req.body.images = [...(req.body.images || []), img];
      }
    } else if (req.files?.images) {
      req.body.images = [await imageUp(req.files.images.path)];
    }
    req.body.user = req.user.id;

    req.body.requestNumber = generateNumber();
    const request = await db.create({ table: Request, key: { ...req.body, populate: { path: 'user', select: 'fullName' } } });

    // insert request data for orama search
    await lyra.insert('request', {
      id: request._id.toString(),
      requestNumber: request.requestNumber,
      name: request.name,
      link: request.link,
      customer: request.user.fullName
    });

    request ? res.status(200).send(request) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getAllRequests function is used to get all the requests
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns all the requests
 */
export const getAllRequests = ({ db, lyra }) => async (req, res) => {
  try {
    if (req.query.status === 'all') delete req.query.status;
    if (!req.query.search) {
      const request = await db.find({
        table: Request,
        key: {
          allowedQuery,
          query: req.query,
          populate: { path: 'user', select: 'fullName email phone address' },
        },
      });
      return res.status(200).send(request);
    }

    const searchData = await lyra.search('request', {
      term: req.query.search
    });

    const requestIds = searchData.hits.map((request) => request.id);

    const request = await db.find({
      table: Request,
      key: {
        allowedQuery,
        query: { id: { $in: requestIds }, ...req.query },
        populate: { path: 'user', select: 'fullName email phone address' },
      },
    });

    request ? res.status(200).send(request) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getSingleRequest function is used to get a signle request from the requests collection
 * @param req.params.id This is the id of the request.
 * @returns the request request
 */
export const getSingleRequest = ({ db }) => async (req, res) => {
  try {
    const request = await db.findOne({ table: Request, key: { id: req.params.id, populate: { path: 'user', select: 'fullName email address phone' } } });
    request ? res.status(200).send(request) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param updateRequest function updates the single request by id
 * @param req.params.id is the id of the request sent in the params
 * @returns the request after update
 */
export const updateRequest = ({ db, imageUp, lyra }) => async (req, res) => {
  try {
    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');//
    const request = await db.findOne({ table: Request, key: { id: req.params.id } });
    if (req.body?.removeImages?.length > 0) {
      await deleteImages(req.body.removeImages);
      request.images = request.images.filter(
        (img) => !req.body.removeImages.includes(img)
      );
      delete req.body.removeImages;
    }
    if (req.files?.images?.length > 1) {
      for (const image of req.files.images) {
        const img = await imageUp(image.path);
        req.body.images = [...(req.body.images || []), img];
      }
    }
    else if (req.files?.images) {
      req.body.images = [await imageUp(req.files.images.path)];
    }
    request.images = [...(request.images || []), ...(req.body.images || [])];
    delete req.body?.images;
    Object.keys(req.body || {}).forEach((param) => (request[param] = req.body[param]));
    await request.save();

    // remove previously inserted search data
    await lyra.remove('request', req.params.id);

    // insert updated request data for orama search
    await lyra.insert('request', {
      id: request._id.toString(),
      requestNumber: request.requestNumber,
      name: request.name,
      link: request.link,
      customer: request.user.fullName
    });

    request ? res.status(200).send(request) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param invoiceRequest function updates the single request by id
 * @param req.params.id is the id of the request sent in the params
 * @returns the request
 */
export const invoiceRequest = ({ db, mail, settings, ws, imageUp }) => async (req, res) => {
  try {
    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');
    const request = await db.findOne({ table: Request, key: { id: req.params.id } });
    if (!request) return res.status(400).send(badRequest);
    if (req.body?.removeImages?.length > 0) {
      await deleteImages(req.body.removeImages);
      request.images = request.images.filter(
        (img) => !req.body.removeImages.includes(img)
      );
      delete req.body.removeImages;
    }
    if (req.files?.images?.length > 1) {
      for (const image of req.files.images) {
        const img = await imageUp(image.path);
        req.body.images = [...(req.body.images || []), img];
      }
    }
    else if (req.files?.images) {
      req.body.images = [await imageUp(req.files.images.path)];
    }
    request.images = [...(request?.images || []), ...(req.body?.images || [])];
    delete req.body?.images;
    Object.keys(req.body || {}).forEach((param) => (request[param] = req.body[param]));
    await request.save();
    const requestData = await db.populate(
      request, { path: 'user', select: 'email' },
    );
    const emailTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'request.ejs'), 'utf-8');
    const options = {
      request: requestData,
      serverLink: `${settings.domain}`,
      acceptLink: `${settings.domain}acceptrequest/${request.id}`,
      declineLink: `${settings.domain}declinerequest/${request.id}`,
      toplogo: 'https://asset.cloudinary.com/dtihpuutc/7ba37c541ca14faf4f5897e431a15807',
      whitelogo: 'https://asset.cloudinary.com/dtihpuutc/6561a4a68f947e42db0ce8037cae0edf',
    };
    const html = generateMailTemplate(emailTemplate, options);
    const maillog = await mail({ receiver: requestData.user.email, subject: 'Request mail', body: html, type: 'html' });
    if (!maillog) {
      const currentDate = new Date();
      const logMessage = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}: Email sending failed for order ID ${request.id}: ${maillog?.rejected?.join(',')}\n`;
      const logStream = fs.createWriteStream(path.join(path.resolve(), 'logs', 'request_email_log.txt'), { flags: 'a' });
      logStream.write(logMessage);
      logStream.end();
      sendNotification(db, ws, [{ '_id': request.user }], 'Your have a new request in your mail. Please check', 'cart');
    }
    return res.status(200).send(request);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param removeRequest function removes the request by id
 * @param req.params.id is the id of the request sent in the params
 * @returns success or failed
 */
export const removeRequest = ({ db, lyra }) => async (req, res) => {
  try {

    if (!req.body.id.length) return res.status(400).send(badRequest);
    const requestToDelete = await db.find({ table: Request, key: { query: { '_id': { '$in': req.body.id } }, allowedQuery: allowedQuery, paginate: false } });
    if (requestToDelete.length < 1) return res.status(400).send({ message: 'Request not found' });
    const imagePathsToDelete = await requestToDelete.reduce(async (acc, request) => {
      acc.push(...request.images);
      return acc;
    }, []);
    await deleteImages(imagePathsToDelete);
    const deleteResult = await db.removeAll({ table: Request, key: { id: { '$in': req.body.id } } });
    req.body.id.forEach(async id => {
      await lyra.remove('request', id);
    });
    deleteResult.deletedCount < 1 ? res.status(400).send({ message: 'Request not found' }) : res.status(200).send({ message: 'Deleted Successfully', status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param declineRequest function set the status of the request to abondon after the user abondon from the mail
 * @param req.params.id is the id of the request sent in the params
 * @returns success or failed
 */
export const declineRequest = ({ db, settings }) => async (req, res) => {
  try {
    await db.update({ table: Request, key: { id: req.params, body: { status: 'cancelled' } } });
    return res.redirect(settings.frontendURL);
    // request ? res.status(200).send({ message: 'Deleted Successfully', status: true }) : res.status(400).send({ message: 'Request not found', status: false });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param acceptRequest function send the request to the user cart
 * @param req.params.id is the id of the request sent in the params
 * @returns the cart
 */
export const acceptRequest = ({ db, ws, settings }) => async (req, res) => {
  try {
    const request = await db.update({ table: Request, key: { id: req.params.id, body: { status: 'accepted' } } });
    // if (!request)  redirect to front end
    const tempbody = {
      request: request.id,
      requestQuantity: request.quantity
    };
    const cart = await db.findOne({ table: Cart, key: { user: request.user, paginate: false, populate: { path: 'requests.request' } } });
    if (cart) {
      cart.requests = [...(cart.requests || []), tempbody];
      await cart.save();
      sendNotification(db, ws, [{ '_id': request.user }], 'Your request status has been updated check your cart', 'cart');
      return res.redirect(settings.frontendURL);
    }
    const createcart = {
      user: request.user,
      requests: [tempbody]
    };
    const newcart = await db.create({ table: Cart, key: createcart });
    if (!newcart) return res.status(400).send({ message: badRequest });
    sendNotification(db, ws, [{ '_id': request.user }], 'Your request status has been updated check your cart', 'cart');
    return res.redirect(settings.frontendURL);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};