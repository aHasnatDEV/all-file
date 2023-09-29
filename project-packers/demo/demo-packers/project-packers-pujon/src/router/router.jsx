import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Root from '../layout/Root';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import Notification from '../pages/Notification/Notification';
import Cart from '../pages/Cart/Cart';
import Blogs from '../pages/Blogs/Blogs';
import Blog from '../pages/Blog/Blog';
import About from '../pages/About/About';
import AuthRoot from '../layout/AuthRoot';
import Login from '../pages/Authentication/Login/Login';
import SignUp from '../pages/Authentication/SignUp/SignUp';
import AccountIdentify from '../pages/Authentication/AcccountIdentify/AccountIdentify';
import Verification from '../pages/Authentication/Verification/Verification';
import NewPass from '../pages/Authentication/NewPass/NewPass';
import FAQsPage from '../pages/Blog/FAQsPage/FAQsPage';
import Checkout from '../pages/Checkout/Checkout';
import MyAccount from '../layout/MyAccount';
import MyAccountOrders from '../pages/MyAccountPage/MyAccountOrders/MyAccountOrders';
import AccountDetails from '../pages/MyAccountPage/AccountDetails/AccountDetails';
import Item from '../pages/Item/Item';
import ConfirmationTemplate from '../Template/ConfirmationTemplate';
import Admin from '../layout/Admin';
import DashBoard from '../pages/Admin/Dashboard/DashBoard';
import ItemRequest from '../pages/Admin/ItemRequest/ItemRequest';
import AllOrders from '../pages/Admin/AllOrders/AllOrders';
import AllProducts from '../pages/Admin/AllProducts/AllProducts';
import Discount from '../pages/Admin/Discount/Discount';
import Categories from '../pages/Admin/Categories/Categories';
import Customers from '../pages/Admin/Customers/Customers';
import Support from '../pages/Admin/Support/Support';
import Staff from '../pages/Admin/Staff/Staff';
import ItemRequestUpdate from '../pages/Admin/ItemRequestUpdate/ItemRequestUpdate';
import OrderDetails from '../pages/Admin/OrderDetails/OrderDetails';
import AddOrUpdateProducts from '../pages/Admin/AddOrUpdateProducts/AddOrUpdateProducts';
import AddOrUpdateDiscount from '../pages/Admin/AddOrUpdateDiscount/AddOrUpdateDiscount';
import NewCustomer from '../pages/Admin/NewCustomer/NewCustomer';
import CustomerUpdate from '../container/AdminContainer/Customers/CustomerUpdate';
import ProtectedRouter from './ProtectedRouter';
import Redirect from '../components/Redirect/Redirect';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Redirect />,
	},
	{
		path: '/home',
		element: <Root />,
		children: [
			{
				path: '/home',
				element: <Home />,
			},
			{
				path: 'blogs',
				element: <Blogs />,
			},
			{
				path: 'shop',
				element: (
					<ProtectedRouter>
						<Shop />
					</ProtectedRouter>
				),
			},
			{
				path: 'notification',
				element: <Notification />,
			},
			{
				path: 'cart',
				element: <Cart />,
			},
			{
				path: 'blog/:id',
				element: <Blog />,
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: 'faqs',
				element: <FAQsPage />,
			},
			{
				path: 'checkout',
				element: <Checkout />,
			},
			{
				path: 'myAccount',
				element: (
					<ProtectedRouter>
						<MyAccount />
					</ProtectedRouter>
				),
				children: [
					{
						path: 'orders',
						element: <MyAccountOrders />,
					},
					{
						path: 'accountDetails',
						element: <AccountDetails />,
					},
				],
			},
			{
				path: 'items/:id',
				element: <Item />,
			},

      // TODO: remove this from here
      {
        path: "template1",
        element: <ConfirmationTemplate />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <AuthRoot />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "identify",
        element: <AccountIdentify />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
      {
        path: "set-password",
        element: <NewPass />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <DashBoard />,
      },
      {
        path: "itemRequest",
        element: <ItemRequest />,
      },
      {
        path: "updateItemRequest/:id",
        element: <ItemRequestUpdate />,
      },
      {
        path: "allOrders",
        element: <AllOrders />,
      },
      {
        path: "orderDetails/:id",
        element: <OrderDetails />,
      },
      {
        path: "allProducts",
        element: <AllProducts />,
      },
      {
        path: "addProduct",
        element: <AddOrUpdateProducts />,
      },
      {
        path: "updateProduct/:id",
        element: <AddOrUpdateProducts />,
      },
      {
        path: "discount",
        element: <Discount />,
      },
      {
        path: "addDiscount",
        element: <AddOrUpdateDiscount />,
      },
      {
        path: "updateDiscount/:id",
        element: <AddOrUpdateDiscount />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "newCustomer",
        element: <NewCustomer />,
      },
      {
        path: "customerUpdate/:id",
        element: <CustomerUpdate />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
    ],
  },
]);
