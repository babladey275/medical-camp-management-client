import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CampDetails from "../pages/CampDetails/CampDetails";
import Home from "../pages/Home/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps/AvailableCamps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "available-camps",
        element: <AvailableCamps />,
      },
      {
        path: "camp-details/:campId",
        element: <CampDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/camps/${params.campId}`),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
