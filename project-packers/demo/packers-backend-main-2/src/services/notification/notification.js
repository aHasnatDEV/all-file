import { auth } from '../middlewares';
import { recieveNotification, removeNotification } from './notification.entity';
import { sendNotification } from './notification.function';


export default function notification() {
  /**
   * GET /notification
   * @description this route is insert a category.
   * @response the notification.
   */
  this.route.get('/notification', auth, recieveNotification(this));

  // this.route.get('/moja', auth, sendNotification(this.db, this.ws, [{ {role:staff}, { role: 'admin' }], 'Hello its moja', 'cart'));
  this.route.get('/moja', auth, (req, res) => {
    sendNotification(this.db, this.ws, [{ '_id': '64b4cbc2bb769ae707dbfb4f' }], 'Frontend test account', 'account');
    res.end();
  });

  /**
  * POST /notification/:id
  * @description this route is used to remove a single notification
  * @response the notification.
  */
  this.route.delete('/notification/:id', auth, removeNotification(this));
}