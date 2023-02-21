import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import UserName from "./components/user/UserName";
import Password from "./components/user/Password";
import ProfilePage from "./pages/user/Profile";
import Booking from "./pages/user/Booking";
import OneTurfView from "./pages/user/OneTurf";
import Register from "./components/user/Register";
import Otp from "./components/user/Otp";
import BookNowPage from "./pages/user/BookNow";
import Reset from "./components/user/Reset";
import TurfHome from "./pages/TurfAdmin/HomePage";
import Login from "./components/TurfAdmin/Login";
import Profile from "./pages/TurfAdmin/Profile";
import AddTurf from "./pages/TurfAdmin/AddTurfPage";
import OneTurf from "./pages/TurfAdmin/OneTurfView";
import UploadIMG from "./pages/TurfAdmin/UploadIMG";
import AddLocation from "./pages/TurfAdmin/AddLocation";
import UploadDoc from "./pages/TurfAdmin/UploadDOC";
import TurfAdminRegister from "./components/TurfAdmin/Register";
import ForgotPassword from "./components/TurfAdmin/ForgotPassword";
import OtpTurfAdmin from "./components/TurfAdmin/Otp";
import ChangePasswordTurf from "./components/TurfAdmin/ChangePassword";
import UserList from "./pages/admin/UserList";
import TurfAdminmng from "./pages/admin/TurfAdminmng";
import RequestsPage from "./pages/admin/RequestPage";
import AdminLogin from "./components/admin/Login";
import RequestTurfDetails from "./pages/admin/RequestTurfDetails";
import Dashboard from "./pages/admin/Dashboard";
import Layout from "./components/Layout";
import Auth from "./components/TurfAdmin/Auth";
import { AuthorizeUser } from "./components/user/Auth";
import OrderSuccessPage from "./components/user/OrderSuccessPage";

function App() {

  return (
    <Routes>
      {/* User Side */}
      <Route path="/profile" element={
        <AuthorizeUser>
        <ProfilePage />
      </AuthorizeUser>} />
      <Route path="/booking" element={<AuthorizeUser><Booking /></AuthorizeUser>} />
      <Route path="/book/:id" element={<AuthorizeUser><BookNowPage /></AuthorizeUser>} />
      <Route path="/turf/:id" element={<AuthorizeUser><OneTurfView /></AuthorizeUser>} />

      <Route
        path="/"
        element={
          <AuthorizeUser>
            <Home />
          </AuthorizeUser>
        }
      />
      <Route path="/login" element={<UserName />} />
      <Route path="/password" element={<Password />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp/:userName" element={<Otp />} />
      <Route path="/reset/:id" element={<Reset />} />
      <Route path="/orderSuccess" element={<OrderSuccessPage/>} />

      {/* TurfAdmin Side */}
      <Route path="/" element={<Layout />}>
        <Route element={<Auth />}>
          <Route path="/turfAdmin/home" element={<TurfHome />} />
          <Route path="/turfAdmin/profile" element={<Profile />} />
          <Route path="/turfAdmin/addTurf" element={<AddTurf />} />
          <Route path="/turfAdmin/turf/:id" element={<OneTurf />} />
          <Route path="/turfAdmin/uploadImg/:id" element={<UploadIMG />} />
          <Route path="/turfAdmin/editTurf/:id" element={<AddTurf />} />
          <Route path="/turfAdmin/addlocation/:id" element={<AddLocation />} />
          <Route path="/turfAdmin/uploadDoc/:id" element={<UploadDoc />} />
        </Route>
        <Route path="/turfAdmin/login" element={<Login />} />
        <Route path="/turfAdmin/register" element={<TurfAdminRegister />} />
        <Route path="/turfAdmin/forgot" element={<ForgotPassword />} />
        <Route
          path="/turfAdmin/changePassword/:email"
          element={<ChangePasswordTurf />}
        />
        <Route path="/turfAdmin/otp/:type/:value" element={<OtpTurfAdmin />} />
      </Route>

      {/* Admin Side */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<UserList />} />
      <Route path="/admin/TurfAdminmng" element={<TurfAdminmng />} />
      <Route path="/admin/requests" element={<RequestsPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/viewDetails/:id" element={<RequestTurfDetails />} />
    </Routes>
  );
}

export default App;
