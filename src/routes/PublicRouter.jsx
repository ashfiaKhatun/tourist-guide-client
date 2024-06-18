import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import AddPackage from "../pages/Dashboard/Admin/AddPackage/AddPackage";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import MyProfile from "../pages/Dashboard/TourGuide/MyProfile/MyProfile";
import MyAssignedTours from "../pages/Dashboard/TourGuide/MyAssignedTours/MyAssignedTours";
import TouristProfile from "../pages/Dashboard/Tourist/TouristProfile/TouristProfile";
import MyBookings from "../pages/Dashboard/Tourist/MyBookings/MyBookings";
import MyWishlist from "../pages/Dashboard/Tourist/MyWishlist/MyWishlist";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage> ,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signIn',
                element: <SignIn></SignIn>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
           
        ]
    },
    // dashboard route
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [

            // Admin Route
            {
                path: 'admin-profile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: 'add-package',
                element: <AddPackage></AddPackage>
            },
            {
                path: 'manage-users',
                element: <ManageUsers></ManageUsers>
            },

            // Tour Guide Route
            {
                path: 'guide-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'assign-tour',
                element: <MyAssignedTours></MyAssignedTours>
            },

            // Tourist Route
            {
                path: 'tourist-profile',
                element: <TouristProfile></TouristProfile>
            },
            {
                path: 'bookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: 'wishlist',
                element: <MyWishlist></MyWishlist>
            },
        ]
    },
]);

export default router;