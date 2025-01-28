import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import CampDetails from "../pages/CampDetails/CampDetails";
import Home from "../pages/Home/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps/AvailableCamps";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import AddCamp from "../pages/Dashboard/AddCamp/AddCamp";
import AdminRoute from "./AdminRoute";
import ManageCamps from "../pages/Dashboard/ManageCamps/ManageCamps";
import UpdateCamp from "../pages/Dashboard/UpdateCamp/UpdateCamp";
import Profile from "../pages/Dashboard/Profile/Profile";
import RegisteredCamps from "../pages/Dashboard/RegisteredCamps/RegisteredCamps";

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
          fetch(
            `https://medical-camp-management-server-xi.vercel.app/camps/${params.campId}`
          ),
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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "add-camp",
        element: (
          <AdminRoute>
            <AddCamp />
          </AdminRoute>
        ),
      },
      {
        path: "manage-camps",
        element: (
          <AdminRoute>
            <ManageCamps />
          </AdminRoute>
        ),
      },
      {
        path: "manage-camps/update-camp/:id",
        element: (
          <AdminRoute>
            <UpdateCamp />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://medical-camp-management-server-xi.vercel.app/camps/${params.id}`
          ),
      },
      {
        path: "registered-camps",
        element: <RegisteredCamps />,
      },
    ],
  },

  {
    path: "*",
    element: (
      <h1 className="text-center text-red-600 text-4xl font-bold mt-20">
        Oops! Page not found.
      </h1>
    ),
  },
]);
