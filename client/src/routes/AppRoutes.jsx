import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Events from "../pages/Events/Events";
import Profile from "../pages/Profile/Profile";
import ManageNotices from "../pages/Admin/ManageNotices";
import MyDonations from "../pages/MyDonations/MyDonations";
import PublicDonations from "../pages/PublicDonations/PublicDonations";
import Chat from "../pages/Chat/Chat";
import ChatRoom from "../pages/Chat/components/ChatRoom";
import ChatWindow from "../pages/Chat/components/GroupsTab";
import ChatsTab from "../pages/Chat/components/ChatsTab";
import GroupsTab from "../pages/Chat/components/GroupsTab";


import IDCard from "../pages/IDCard/IDCard";
import Admin from "../pages/Admin/Admin";

import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ManageEvents from "../pages/ManageEvents/ManageEvents";
import ManageDonations from "../pages/ManageDonations/ManageDonations";
import ManageGallery from "../pages/ManageGallery/ManageGallery";
import ManageTicker from "../pages/ManageTicker/ManageTicker";
import ManageExpenses from "../pages/ManageExpenses/ManageExpenses";
import ManageIDCards from "../pages/ManageIDCards/ManageIDCards";

import Receipt from "../pages/Receipt/Receipt";
import MoneyDonation from "../pages/MoneyDonation/MoneyDonation";
import Gallery from "../pages/Gallery/Gallery";

import AdminRoute from "./AdminRoute";

const PrivateRoute = ({
  children,
}) => {
  const token =
    localStorage.getItem(
      "token"
    );

  return token
    ? children
    : (
      <Navigate
        to="/login"
      />
    );
};

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
<Route
  path="/chat"
  element={
    <PrivateRoute>
      <Chat />
    </PrivateRoute>
  }
/>


        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

<Route
  path="/manage-notices"
  element={<ManageNotices />}
/>
        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/gallery"
          element={
            <Gallery />
          }
        />

        <Route
          path="/public-donations"
          element={
            <PublicDonations />
          }
        />

        <Route
          path="/receipt"
          element={
            <Receipt />
          }
        />

        {/* PRIVATE ROUTES */}

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/money-donation"
          element={
            <PrivateRoute>
              <MoneyDonation />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-donations"
          element={
            <PrivateRoute>
              <MyDonations />
            </PrivateRoute>
          }
        />

        <Route
          path="/id-card"
          element={
            <PrivateRoute>
              <IDCard />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-donations"
          element={
            <AdminRoute>
              <ManageDonations />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-events"
          element={
            <AdminRoute>
              <ManageEvents />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <AdminRoute>
              <ManageGallery />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-ticker"
          element={
            <AdminRoute>
              <ManageTicker />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-expenses"
          element={
            <AdminRoute>
              <ManageExpenses />
            </AdminRoute>
          }
        />

        <Route
          path="/manage-id-cards"
          element={
            <AdminRoute>
              <ManageIDCards />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;