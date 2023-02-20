import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import styles from "../../styles/Username.module.css";
import { adminLogin } from "../../helper/helperAdmin";

const Login = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      values = Object.assign(values);
      const loginPromise = adminLogin(values);
      const token = await loginPromise;

      localStorage.setItem("adminToken", token);

      toast.promise(loginPromise, {
        loading: "loading..",
        success: "Logged In",
        error: "Enter valid username and password",
      });

      loginPromise.then(() => {
        navigate("/admin/dashboard");
      });
    },
  });
  return (
    <div className="bg-gray-500">
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-2xl font-bold">Admin Login</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-200">
                Please Enter your Username and Password
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img className={styles.profile_img} src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png' t="avatar" />
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("userName")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username"
                />
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Password"
                />
                <div>
                  <button
                    className="border bg-indigo-700 hover:bg-red-500  py-2 px-5 rounded-lg text-gray-50 text-xl shadow-sm text-center"
                    type="submit"
                  >
                    {" "}
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
