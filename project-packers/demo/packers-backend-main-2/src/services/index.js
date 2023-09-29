import blog from './blog/blog';
import cart from './cart/cart';
import category from './category/category';
import demo from './demo/demo';
import discount from './discount/discount';
import image from './image/image';
import message from './messages/message';
import notification from './notification/notification';
import order from './order/order';
import product from './product/product';
import request from './request/request';
import support, { entryEvent } from './support/support';
import user from './user/user';
import search from './search/search'

export const services = (app) => {
  app.configure(demo);
  app.configure(user);
  app.configure(cart);
  app.configure(product);
  app.configure(order);
  app.configure(request);
  app.configure(category);
  app.configure(discount);
  app.configure(image);
  app.configure(blog);
  app.configure(notification);
  app.configure(support);
  app.configure(message);
  app.configure(search);
  entryEvent(app);
};