import Base from "./pages/Base";
import Login from "./pages/Login";
import Main from './pages/Main';
import Resources from "./pages/Resources";
import { MAIN_ROUTE, REG_ROUTES, RES_ROUTES, BASE_ROUTES, LOGIN_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]

export const publicRoutes = [
    {
        path: REG_ROUTES,
        Component: Login
    },

    {
        path: LOGIN_ROUTE,
        Component: Login
    },

    {
        path: RES_ROUTES,
        Component: Resources
    },

    {
        path: BASE_ROUTES,
        Component: Base
    }
]