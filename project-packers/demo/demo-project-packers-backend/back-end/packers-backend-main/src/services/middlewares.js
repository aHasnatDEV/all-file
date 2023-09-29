import decodeAuthToken from '../utils/decodeAuthToken';

/**
 * This function is used for validating user role.
 * It is an express middleware.
 * It checks that the role of the user is allowed to proceed the request or not.
 * @param {Array} allowed The allowed roles.
 * @throws {Error} If the role is not allowed then it throws an error.
 */
export function checkRole(allowed) {
  return async (req, res, next) => {
    try {
      if (allowed.includes(req.user.role)) return next();
      else throw new Error('Unauthorized.');
    }
    catch (e) {
      res.status(401).send({ status: 401, reason: { message: 'Unauthorized', status: false } });
    }
  };
}


/**
 * This function is used for validating user access.
 * It checks that the access of the user is allowed to proceed the request or not.
 * @param {Array} allowed The allowed roles.
 * @throws {Error} If the role is not allowed then it throws an error.
 */
export function checkAccess(role, allowed) {
  return async (req, res, next) => {
    try {
      if (role.includes(req.user.role) && req.user.access.includes(allowed)) return next();
      else if (req.user.role.includes('admin') || req.user.role.includes('super-admin')) return next();
      else throw new Error('Unauthorized.');
    }
    catch (e) {
      res.status(401).send({ status: 401, reason: { message: 'Unauthorized', status: false } });
    }
  };
}

/**
 * This function is used to authenticate request.
 * After authetication it inserts the user data to reqest object.
 */
export async function auth(req, res, next) {
  try {
    const token = req.cookies?.coredevs || (process.env.NODE_ENV === 'development' ? req.header('Authorization')?.replace('Bearer ', '') : null);
    if (!token) return res.status(401).send({ status: 401, reason: { message: 'Unauthorized', status: false } });
    const user = await decodeAuthToken(token);
    if (!user) return res.status(401).send({ status: 401, reason: { message: 'Unauthorized', status: false } });
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ status: 401, reason: { message: 'Unauthorized', status: false } });
  }
}

/**
 * This function is the middleware of passport.
 * This is used to store the session of passport
 */
export async function passportMiddleware(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
}

/**
 * This function is the middleware of socketauth.
 */
export async function socketAuth(socket, next) {
  try {
    const token = (socket.handshake?.headers?.cookie || '')?.split(';')?.find(s => s.includes('coredevs='))?.replace('coredevs=', '')?.replace(/\s/g, '') || socket?.handshake?.headers?.coredevs?.replace('Bearer ', '');
    if (!token) throw new Error({ message: 'Unauthorized', status: false });
    const user = await decodeAuthToken(token);
    if (!user) throw new Error({ message: 'Unauthorized', status: false });
    socket.user = user;
    socket.join(user.id);
    next();
  } catch (e) {
    console.log(e);
    next(new Error({ message: 'Unauthorized', status: false }));
  }
}