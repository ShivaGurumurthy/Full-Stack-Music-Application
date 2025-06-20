import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PageNotFound from "../Pages/PageNotFound";s
import ForgotPassword from "../auth/ForgotPassword";
import UserLayout from "../Components/User/UserLayout";
import UserAccount from "../Components/User/UserAccount";
import UpdatePicture from "../Components/User/UpdatePicture";
import UpdateProfile from "../Components/User/UpdateProfile";
import UpdatePassword from "../Components/User/UpdatePassword";
import DeleteAccount from "../Components/User/DeleteAccount";
import AdminLayout from "../Components/Admin/AdminLayout";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import AddAlbums from "../Components/Admin/AddAlbums";
import Dashboard from "../Components/Home/Dashboard";
import AlbumDetails from "../Components/Home/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "album-details",
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: "auth/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/forgot-password",
        element: (
          <PublicRoutes>
            <ForgotPassword />
          </PublicRoutes>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <AdminRoutes>
            <AdminLayout />
          </AdminRoutes>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                <AdminDashboard />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
          {
            path: "add-albums",
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                <AddAlbums />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "user-profile",
        element: (
          <ProtectedRoutes>
            <UserLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <UserAccount />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-picture",
            element: (
              <ProtectedRoutes>
                <UpdatePicture />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-profile",
            element: (
              <ProtectedRoutes>
                <UpdateProfile />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-password",
            element: (
              <ProtectedRoutes>
                <UpdatePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "delete-account",
            element: (
              <ProtectedRoutes>
                <DeleteAccount />
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;
