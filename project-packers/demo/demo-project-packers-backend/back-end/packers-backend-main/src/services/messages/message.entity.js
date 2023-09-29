import { sendMessageEvent } from './message.functions';
import Message from './message.schema';

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
    if (!validobj) res.status(400).send({ message: 'Bad Request', status: false });
    if (req.files?.image) {
      req.body.image = await imageUp(req.files.image.path);
    }
    const messageDoc = {
      support: req.params.id,
      message: req.body.message,
      sender: req.user.id,
      image: req.body.image
    };
    const message = await db.create({ table: Message, key: messageDoc });
    if (!message) return res.status(400).send({ message: 'Bad Request', status: false });
    await sendMessageEvent(ws, req.params.id, message);
    res.status(200).send(message);
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong', status: false });
  }
};

/**
 * @param getMessage function is used to create a message for the support chat
 * @param {Object} req - The request object have the information about page and any other filter.
 * @returns the messages of the support chat
 */
export const getMessage = ({ db }) => async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send({ message: 'Bad Request', status: false });
    const message = await db.find({ table: Message, key: { query: { support: req.params.id }, allowedQuery: allowedQuery } });
    message ? res.status(200).send(message) : res.status(400).send({ message: 'Bad Request', status: false });
  }
  catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong', status: false });
  }
};