import Base from "./pages/Base";
import Fuzzy_Logic from './pages/FuzzyLogic';
import FuzzyGraphs from './pages/FuzzyGraphs';
import Resources from "./pages/Resources";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { FUZZY_LOGIC_ROUTE, RES_ROUTES,
     BASE_ROUTE, FUZZY_GRAPH_ROUTE, MAIN_ROUTE, LOG_ROUTE, REG_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },

    {
        path: FUZZY_LOGIC_ROUTE,
        Component: Fuzzy_Logic
    },

    {
        path: FUZZY_GRAPH_ROUTE,
        Component: FuzzyGraphs
    }
]

export const publicRoutes = [

    {
        path: BASE_ROUTE,
        Component: Base
    },

    {
        path: RES_ROUTES,
        Component: Resources
    },

    {
        path: REG_ROUTE,
        Component: Login
    },

    {
        path: LOG_ROUTE,
        Component: Login
    }
]