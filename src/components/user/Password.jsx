import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../../helper/validateUser";
import useFetch from "../../hook/fetch.hook";
import { useAuthStore } from "../../store";
import { generateOtp, verifyUser } from "../../helper/helperUser";
import UsernamePage from "./UserName";

import styles from "../../style/Username.module.css";

const Password = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyUser({ username, password: values.password });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password not match</b>,
      });
      loginPromise.then((res) => {
      
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/");
      });
    },
  });

  function resendOtphandler() {
    let sendPromise = generateOtp(username);

    toast.promise(sendPromise, {
      loading: "Sending..",
      success: <b>OTP has been send to your mail</b>,
      error: <b>Could not send</b>,
    });

    sendPromise.then((OTP) => {
      navigate(`/reset/${username}`);
 
    });
  }

  if (isLoading) return <UsernamePage />;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className={styles.background_img}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-2xl font-bold">
                Hello {apiData?.firstName || apiData?.username}
              </h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Explore more by connecting with us
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <img
                  className={styles.profile_img}
                  src={apiData?.profile || 'https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png'}
                  alt="avatar"
                />
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <div>
                  <button
                    className="border bg-indigo-700 hover:bg-red-500  py-2 px-5 rounded-lg text-gray-50 text-xl shadow-sm text-center"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <div className="text-center py-4">
                <span className="text-grey-500">
                  Forgot Password?{" "}
                  <a onClick={resendOtphandler} className="text-red-500">
                    Change
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
