import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../features/Auth/Login";
import Layout from "../features/Account/Layout";
import Register from "../features/Auth/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/account',
                element: <Layout />
            }
        ]
    }
]);
