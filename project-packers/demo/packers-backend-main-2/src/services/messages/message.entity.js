import { sendMessageEvent } from './message.functions';
import Message from './message.schema';

//statics
import { badRequest, serverErr } from '../../utils/statics';

// these are the set to validate the request query.
const allowedQuery = new Set(['support', 'page', 'limit']);

/**
 * @param sendMessage function is used to recieve message from the user
 * @param {Object} req This is the req object.
 * @returns the message
 */
export const sendMessage = ({ ws, db, imageUp }) => async (req, res) => {
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
    const messageDoc = {
      support: req.params.id,
      message: req.body.message,
      sender: req.user.id,
      images: req.body.images || []
    };
    const message = await db.create({ table: Message, key: { ...messageDoc, populate: { path: 'sender', select: 'fullName email' } } });
    if (!message) return res.status(400).send(badRequest);
    await sendMessageEvent(ws, req.params.id, message);
    res.status(200).send(message);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * @param getMessage function is used to create a message for the support chat
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns the messages of the support chat
 */
export const getMessage = ({ db }) => async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send(badRequest);
    const message = await db.find({ table: Message, key: { query: { support: req.params.id, ...req.query, limit: 20 }, allowedQuery: allowedQuery, populate: { path: 'sender', select: 'fullName email' } } });
    message ? res.status(200).send(message) : res.status(400).send(badRequest);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};