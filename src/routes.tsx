import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { SignUp } from "./pages/sign-up";
import { SignIn } from "./pages/sign-in";
import { AppLayout } from "./pages/_layouts/app-layout";
import { HotelsHomepage } from "./pages/hotels-homepage";
import { HotelDetails } from "./pages/hotel-details";
import { Profile } from "./pages/profile";


export const router = createBrowserRouter([

        {
        path:'/',
        element: <AppLayout />,
        children: [
            {
            path: "/",
            element: <HotelsHomepage />,
            },
            {
            path: "/hotel/:id",
            element: <HotelDetails />
            },
            {
            path:"/profile",
            element: <Profile />
            }

        ]

        },

        {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
            path: "sign-up",
            element: <SignUp />,
            },
            {
            path: "sign-in",
            element: <SignIn />,
            }
                ]
        },

])