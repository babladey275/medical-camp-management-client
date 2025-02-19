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
import ManageRegisteredCamps from "../pages/Dashboard/ManageRegisteredCamps.jsx/ManageRegisteredCamps";
import Analytics from "../pages/Dashboard/Analytics/Analytics";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Payment from "../components/Payment/Payment";
import ErrorPage from "../components/ErrorPage/ErrorPage";

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
        path: "manage-registered-camps",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps />
          </AdminRoute>
        ),
      },
      {
        path: "registered-camps",
        element: <RegisteredCamps />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "registered-camps/payment",
        element: <Payment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
