import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.schema';
import decodeAuthToken from '../../utils/decodeAuthToken';
import generateMailTemplate from '../../utils/generateMailTemplate';
import fs from 'fs';
import path from 'path';
import Order from '../order/order.schema';

//statics
import { badRequest, serverErr, unAuthorized } from '../../utils/statics';

// these are the set to validate the request body or query.
const createAllowed = new Set(['fullName', 'email', 'password', 'phone']);
const allowedQuery = new Set(['fullName', 'page', 'limit', 'id', 'paginate', 'role', 'filter']);
const ownUpdateAllowed = new Set(['fullName', 'phone', 'avatar', 'passwordChange']);

// the attern to match password
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,16}).*$/;

/**
 * Creates a new user in the database with the specified properties in the request body.
 * The 'role' property is automatically set to 'user', and the 'password' property is hashed using bcrypt.
 *
 * @param {Object} req - The request object containing the properties for the new user.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Object} The created user object, including the JWT token.
 * @throws {Error} If the request body includes properties other than those allowed or if there is an error during the database operation.
 */
export const register = ({ db, lyra }) => async (req, res) => {
  try {
    const valid = Object.keys(req.body).every(k => createAllowed.has(k));
    if (!valid) return res.status(400).send(badRequest);
    if (req.body.email === req.body.password || !(pattern.test(req.body.password))) return res.status(400).send({ message: 'Password conditions not met', status: false });
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = await db.create({ table: User, key: req.body });

    await lyra.insert('customer', {
      id: user._id.toString(),
      name: user.fullName,
      phone: user.phone
    });
    user ? res.status(200).send(user) : res.status(400).send(badRequest);
  }
  catch (e) {
    console.log(e);
    res.status(500).send(serverErr);
  }
};

/**
 * Creates a new user in the database with the specified properties in the request body.
 * The 'role' property is automatically set to 'user', and the 'password' property is hashed using bcrypt.
 *
 * @param {Object} req - The request object containing the properties for the new user.
 * @param {Object} db - The database object for interacting with the database.
 * @returns {Object} The created user object, including the JWT token.
 * @throws {Error} If the request body includes properties other than those allowed or if there is an error during the database operation.
 */
export const registerStaff = ({ db }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    req.body.loggedin = false;
    const staff = await db.create({ table: User, key: req.body });
    staff ? res.status(200).send(staff) : res.status(400).send(badRequest);
  }
  catch (e) {
    console.log(e);
    res.status(500).send(serverErr);
  }
};


/**
 * This function is used for login a user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the data for success response. Otherwise it will through an error.
 */
export const login = ({ db, settings }) => async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) return res.status(400).send('Bad requests');
    const user = await db.findOne({ table: User, key: { email: req.body.email } });
    if (!user) return res.status(401).send(unAuthorized);
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).send(unAuthorized);
    const token = jwt.sign({ id: user.id }, settings.secret);
    res.cookie(settings.secret, token, {
      httpOnly: true,
      ...settings.useHTTP2 && {
        sameSite: 'None',
        secure: true,
      },
      ...req.body.rememberMe && { expires: new Date(Date.now() + 172800000/*2 days*/) },
    });
    user.loggedin = true;
    await db.save(user);
    res.status(200).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function is used send user data to the frontend after social login.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns the user.
 */
export const socialSuccess = ({ settings }) => async (req, res) => {
  try {
    if (!req.user && !req.cookies[settings.secret]) return res.status(400).send(badRequest);
    if (req.user) {
      const token = jwt.sign({ id: req.user.id }, settings.secret);
      res.cookie(settings.secret, token, {
        httpOnly: true,
        ...settings.useHTTP2 && {
          sameSite: 'None',
          secure: true,
        },
        expires: new Date(Date.now() + 172800000/*2 days*/),
      });
      return res.status(200).send(req.user);
    }
    const token = req.cookies[settings.secret];
    res.cookie(settings.secret, token, {
      httpOnly: true,
      ...settings.useHTTP2 && {
        sameSite: 'None',
        secure: true,
      },
      expires: new Date(Date.now() + 172800000/*2 days*/),
    });
    const user = await decodeAuthToken(token);
    res.status(200).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};


/**
 * This function is used for load a user profile from request header.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the data for success response. Otherwise it will through an error.
 */
export const me = ({ settings }) => async (req, res) => {
  try {
    if (!req.user.loggedin) {
      res.clearCookie(settings.secret, {
        httpOnly: true,
        ...settings.useHTTP2 && {
          sameSite: 'None',
          secure: true,
        },
        expires: new Date(Date.now())
      });
      return res.status(400).send({ message: 'You are signed out.Please Sign in again', status: false });
    }
    res.status(200).send(req.user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};


/**
 * This function is used for logout a user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the data for success response. Otherwise it will through an error.
 */
export const logout = ({ settings }) => async (req, res) => {
  try {
    res.clearCookie(settings.secret, {
      httpOnly: true,
      ...settings.useHTTP2 && {
        sameSite: 'None',
        secure: true,
      },
      expires: new Date(Date.now())
    });
    if (req.session) req.session.destroy();
    return res.status(200).send({ message: 'Logout successful', status: true });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};


/**
 * This function is used get all users in the database by query.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns a object, that contains resulted data and other information like page, limit.
 */
export const getAll = ({ db }) => async (req, res) => {
  try {
    if (req.query.role) req.query.role = JSON.parse(req.query.role);
    const users = await db.find({ table: User, key: { query: { ...req.query }, allowedQuery: allowedQuery } });
    res.status(200).send(users);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function is used to find a user by id.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the data of the id otherwise no result found with status 404 .
 */
export const userProfile = ({ db }) => async (req, res) => {
  try {
    const user = await db.findOne({ table: User, key: { id: req.params.id, } });
    user ? res.status(200).send(user) : res.status(400).send('No result found');
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};


const setPassword = async ({ oldPass, newPass, user }) => {
  if (!oldPass || !newPass) throw ({ status: 400, reason: badRequest });
  if (oldPass) {
    const isValid = await bcrypt.compare(oldPass, user.password);
    if (!isValid) throw ({ status: 401, reason: 'Invalid old Password' });
  }
  return await bcrypt.hash(newPass, 8);
};

/**
 * This function is used to update user own profile.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the updated data.
 */
export const updateOwn = ({ db, imageUp }) => async (req, res) => {
  try {
    if (req.body.data) req.body = JSON.parse(req.body.data || '{}');
    if (req.files?.avatar?.path) {
      req.body.avatar = await imageUp(req.files?.avatar.path);
    }
    const isValid = Object.keys(req.body).every(k => ownUpdateAllowed.has(k));
    if (!isValid) return res.status(400).send(badRequest);
    if (req.body.passwordChange) {
      if (req.user.email === req.body.passwordChange.newPass || !(pattern.test(req.body.passwordChange.newPass))) return res.status(400).send({ message: 'Password conditions not met', status: false });
      req.body.password = await setPassword({ oldPass: req.body.passwordChange.oldPass, newPass: req.body.passwordChange.newPass, user: req.user });
      delete req.body.passwordChange;
    }
    Object.keys(req.body).forEach(k => (req.user[k] = req.body[k]));
    await db.save(req.user);
    res.status(200).send(req.user);
  }
  catch (err) {
    console.log(err);
    res.status(err.status || 500).send(err.reason || serverErr);
  }
};


/**
 * This function is used update a user by admin, admin can update without only password and notifySubs.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns It returns the updated data.
 */
export const updateUser = ({ db, imageUp }) => async (req, res) => {
  try {
    if (req.body?.data) req.body = JSON.parse(req.body.data || '{}');
    if (req.files?.avatar?.path) {
      req.body.avatar = await imageUp(req.files?.avatar.path);
    }
    const user = await db.findOne({ table: User, key: { id: req.params.id } });
    if (!user) return res.status(400).send(badRequest);
    if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 8);
    Object.keys(req.body).forEach(k => (user[k] = req.body[k]));
    await db.save(user);
    res.status(200).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(err.status || 500).send(err.reason || serverErr);
  }
};


export const remove = ({ db, lyra }) => async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.remove({ table: User, key: { id } });
    if (!user) return res.status(400).send({ message: 'User not found' });

    // delete user data from orama search
    await lyra.remove('customer', user._id.toString());
    res.status(200).send({ message: 'Deleted Successfully', status: true });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function is used to send OTP to the user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns a temporary encrypted token.
 */
export const sendOTP = ({ db, mail, settings }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    const user = await db.findOne({ table: User, key: { email: req.body.email } });
    if (!user) return res.status(400).send({ message: 'User not found', status: false });
    var otp = Math.floor(1000 + Math.random() * 9000);
    const options = {
      otp: otp,
      toplogo: 'https://res.cloudinary.com/dtihpuutc/image/upload/v1692681308/toplogo_qzylg9.png',
      whitelogo: 'https://res.cloudinary.com/dtihpuutc/image/upload/v1692681308/logowhitetext_iuvgl7.png',
      orderlogo: 'https://res.cloudinary.com/dtihpuutc/image/upload/v1692681308/orderlogo_dn1ndm.png'
    };
    const emailTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'otpMail.ejs'), 'utf-8');
    const html = generateMailTemplate(emailTemplate, options);
    const sendmail = await mail({ receiver: req.body.email, subject: 'Reset Password', body: html, type: 'html' });
    if (!sendmail) return res.status(400).send({ message: 'Error Sending Mail', status: false });
    const token = await jwt.sign({ id: user.id, otp: otp, time: Date.now() }, settings.secret);
    res.status(200).send({ token: token });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function is used to send OTP to the user.
 * @param {otp, token} req This is the request object.
 * @param {Object} res this is the response object
 * @returns successful or failed validation of OTP.
 */
export const verifyOTP = ({ settings }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    const decoded = await jwt.verify(req.body.token, settings.secret);
    const { otp, time } = decoded;
    if (req.body.otp !== otp.toString()) return res.status(400).send({ message: 'Wrong OTP', status: false });
    if ((Date.now() - time) > (1000 * 60 * 5)) return res.status(400).send({ message: 'Time Expired', status: false });
    res.status(200).send({ status: true });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

/**
 * This function is used to send OTP to the user.
 * @param { newpassword, token,otp } req This is the request object.
 * @param {Object} res this is the response object
 * @returns successful or failed change of password.
 */
export const resetpassword = ({ db, settings }) => async (req, res) => {
  try {
    const validobj = Object.keys(req.body).every((k) => req.body[k] !== '' || req.body[k] !== undefined);
    if (!validobj) return res.status(400).send(badRequest);
    const decoded = await jwt.verify(req.body.token, settings.secret);
    const { id, otp, time } = decoded;
    if (req.body.otp !== otp.toString()) return res.status(400).send({ message: 'Wrong OTP', status: false });
    if ((Date.now() - time) > (1000 * 60 * 7)) return res.status(400).send('Time Expired');
    const user = await db.findOne({ table: User, key: { id } });
    const samePass = await bcrypt.compare(req.body.newpassword, user.password);
    if (samePass) return res.status(400).send({ message: 'Password cannot be same as previous password', status: false });
    if (user.email === req.body.newpassword || !(pattern.test(req.body.password))) return res.status(400).send({ message: 'Password conditions not met', status: false });
    const password = await bcrypt.hash(req.body.newpassword, 8);
    user.password = password;
    await user.save();
    res.status(200).send({ status: true });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(serverErr);
  }
};

export const mailtest = () => async (req, res) => {
  try {
    const options = {
      otp: '1234',
      toplogo: 'https://res.cloudinary.com/dtihpuutc/image/upload/v1692681308/toplogo_qzylg9.png',
      whitelogo: 'https://res.cloudinary.com/dtihpuutc/image/upload/v1692681308/logowhitetext_iuvgl7.png',
    };
    // const html = generateMailTemplate(emailTemplate, options);
    res.render('mail', options);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};
/**
 * This function is used to Logout All Staff.
 * @param {Object} res this is the response object
 * @returns successful or failed change of password.
 */
export const logoutAll = ({ db, ws }) => async (req, res) => {
  try {
    const updatedData = await db.updateMany({ table: User, key: { filter: { role: ['staff', 'admin'] }, update: { loggedin: false } } });
    if (!updatedData) return res.status(400).send('Log out all staff unsuccessfull');
    const users = await db.find({ table: User, key: { role: ['admin', 'staff'], paginate: false } });
    const docs = new Set(users.map(user => ({ user: user._id.toString() })));
    ws.to([...docs].map(doc => doc.user)).emit('notification', { logout: true });
    res.status(200).send({ status: true, message: 'Logged out all staffs' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
};

/**
 * This function is used get all customer data.
 * @param { newpassword, token,otp } req This is the request object.
 * @param {Object} res this is the response object
 * @returns successful or failed change of password.
 */

export const getCustomers = ({ db }) => async (req, res) => {
  try {

    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 30);
    let filter = req.query?.filter === 'new' ? { createdAt: { $gte: newDate } } : null;
    const users = await db.find({ table: User, key: { role: 'user', ...filter, query: req.query, allowedQuery: allowedQuery, paginate: req.query.paginate === 'true' } });
    if (!users) return res.status(400).send({ status: false, message: 'Something wents wrong' });

    const userWithOrderCount = await Promise.all(users?.docs?.map(async user => {

      const orders = await Order.find({ user: user._id });
      const amountSpent = orders.reduce((total, order) => total + order.storeAmount, 0);

      return {
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        address: user.shippingaddress,
        orders: orders.length,
        amountSpent

      };
    }));
    users.docs = userWithOrderCount;
    res.status(200).send(users);


  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');

  }
};

