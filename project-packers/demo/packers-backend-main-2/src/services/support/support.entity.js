import Support from './support.schema';
import { sendNotification } from '../notification/notification.function';
import Message from '../messages/message.schema';
import { sendMessageEvent } from '../messages/message.functions';


//statics
import { badRequest, serverErr } from '../../utils/statics';
import generateNumber from '../../utils/generateNumber';

/**
 * these are the set to validate the request body or query.
 */
const supportUpdateAllowed = new Set(['status', 'staff']);
const allowedQuery = new Set(['status', 'type']);

/**
 * @param registerSupport function is used to create a support chat
 * @param {Object} req This is the req object.
 * @returns the support and the message sent by user and emits a message in admin
 */
export const registerSupport = ({ db, ws, imageUp }) => async (req, res) => {
  try {
    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    if (req.files?.images?.length > 1) {
      for (const image of req.files.images) {
        const img = await imageUp(image.path);
        req.body.images = [...(req.body.images || []), img];
      }
    }
    else if (req.files?.images) {
      req.body.images = [await imageUp(req.files.images.path)];
    }
    const supportDoc = {
      supportNumber: generateNumber(),
      user: req.user.id,
      type: req.body.type
    };
    const support = await db.create({ table: Support, key: supportDoc });
    const messageDoc = {
      support: support.id,
      message: req.body.message,
      sender: req.user.id,
      images: req.body.images || []
    };
    const message = await db.create({ table: Message, key: { ...messageDoc, populate: { path: 'sender', select: 'fullName email' } } });
    if (!support) return res.status(400).send(badRequest);
    sendNotification(db, ws, [{ 'role': 'admin' }, { 'role': 'staff' }, { 'access': 'support' }, { 'role': 'super-admin' }], 'There is a new support request', 'account');
    await sendMessageEvent(ws, support.id, message);
    res.status(200).send(support);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getAllSupport function is used to get all the Support
 * @param {Object} req - The request object have the information filter.
 * @returns all the support
 */
export const getAllSupport = ({ db }) => async (req, res) => {
  try {
    if (req.query.status === 'all') delete req.query.status;
    if (req.query.type === 'all') delete req.query.type;
    const support = await db.find({
      table: Support, key: { query: req.query, allowedQuery: allowedQuery, paginate: false, populate: { path: 'user staff', select: 'fullName email' } }
    });
    support ? res.status(200).send(support) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getSingleSupport function is used to get a signle support
 * @param req.params.id This is the id of the request.
 * @returns the request request
 */
export const getSingleSupport = ({ db }) => async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send(badRequest);
    const support = await db.findOne({
      table: Support, key: {
        id: req.params.id, paginate: false, populate: {
          path: 'user staff', select: 'fullName email'
        }
      }
    });
    support ? res.status(200).send(support) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getCurrentUserSupport function is used to get current user support
 * @returns the usre data
 */
export const getCurrentUserSupport = () => async (req, res) => {
  try {
    const support = await Support.findOne({ user: req.user.id, status: { '$ne': 'close' } })
      .populate('user staff', 'fullName email')
      .sort({ createdAt: -1 });
    support ? res.status(200).send(support) : res.status(400).send({});
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param updateSupport function updates the single order by id
 * @param req.params.id is the id of the support sent in the params
 * @returns the support
 */
export const updateSupport = ({ db, ws }) => async (req, res) => {
  try {
    const isValid = Object.keys(req.body).every(k => supportUpdateAllowed.has(k));
    if (!isValid) return res.status(400).send(badRequest);
    const support = await db.update({ table: Support, key: { id: req.params.id, body: req.body } });
    if (req.body.status == 'close') await sendMessageEvent(ws, support.id, 'closed');
    support ? res.status(200).send(support) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param acceptSupport function joins the support staff to the user support chat room
 * @param req.params.id is the id of the support sent in the params
 * @returns the support
 */
export const acceptSupport = ({ db, ws }) => async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send(badRequest);
    const support = await db.findOne({ table: Support, key: { id: req.params.id } });
    if (!support || support.staff) return res.status(400).send({ message: 'No room for new staff', status: false });
    support.staff = req.user.id;
    support.status = 'open';
    support.save();
    sendNotification(db, ws, [{ '_id': support.user }], 'Your support request has been accepted. Please check', 'account');
    res.status(200).send(support);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param removeSupport function removes the support by the id array
 * @param req.params.id is the id of the Support sent in the params
 * @returns success or failed
 */
export const removeSupport = ({ db }) => async (req, res) => {
  try {
    if (!req.body.id.length) return res.send(400).send(badRequest);
    const support = await db.removeAll({ table: Support, key: { id: { $in: req.body.id } } });
    support.deletedCount < 1 ? res.status(400).send({ message: 'Coupon not found' }) : res.status(200).send({ message: 'Deleted Successfully', status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param entry function is used to join a user/staff to the room
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns the messages of the support chat
 */
export const entry = async ({ data, session }) => {
  try {
    const { entry, room } = data;
    if (!session.user) throw new Error(badRequest);
    if (entry) {
      return session.join(room);
    }
    session.leave(room);
  }
  catch (err) {
    console.log(err);
  }
};
