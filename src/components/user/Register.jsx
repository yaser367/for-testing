import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registrationValidate } from "../../helper/validateUser";
import convertToBase64 from "../../helper/convert";
import { registerUser, generateOtp } from "../../helper/helperUser";

import styles from "../../style/Username.module.css";
import { useState } from "react";
const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      Password: "",
    },
    validate: registrationValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      const userName = values.username;
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating..",
        success: <b>Registred Successfully...!</b>,
        error: <b>Could not Register.</b>,
      });

      registerPromise.then(function (data) {
        console.log(userName + "user");
        console.log(data + "data");
        navigate(`/otp/${userName}`);
      });
      registerPromise.catch((E) => console.log(E));
    },
  });

  /**fromik doesn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div className={styles.background_img}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass} style={{ width: "45%" }}>
            <div className="title flex flex-col items-center">
              <h4 className="text-2xl font-bold">Register</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Happy to join you!
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    className={styles.profile_img}
                    src={
                      file ||
                      "https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png"
                    }
                    alt="avatar"
                  />
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                />
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("email")}
                  className={styles.textbox}
                  type="email"
                  placeholder="Email*"
                />
                <input
                  {...formik.getFieldProps("username")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username*"
                />
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Password*"
                />
                <div>
                  <button
                    className="border bg-indigo-700 hover:bg-red-500  py-2 px-5 rounded-lg text-gray-50 text-xl shadow-sm text-center"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </div>
              <div className="text-center py-4">
                <span className="text-grey-500">
                  Already Registered?{" "}
                  <Link to="/login" className="text-red-500">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
