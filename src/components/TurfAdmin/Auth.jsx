import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrectToken } from "../../features/auth/authSlice";

const Auth = () => {
  const token = useSelector(selectCurrectToken);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/turfAdmin/login" state={{ from: location }} replace />
  );
};

export default Auth;
