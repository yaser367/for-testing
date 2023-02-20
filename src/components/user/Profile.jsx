import React from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profilevalidation } from "../../helper/validateUser";
import convertToBase64 from "../../helper/convert";
import useFetch from "../../hook/fetch.hook";
import { useAuthStore } from "../../store";
import { updateUser } from "../../helper/helperUser";

import styles from "../../style/Username.module.css";
import extend from "../../style/Profile.module.css";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || "",
      lastname: apiData?.lastname || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
      // confirmPassword:'',
    },
    enableReinitialize: true,
    validate: profilevalidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!..</b>,
      });
    },
  });
  /**fromik doesn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="bg-slate-300">
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div
            className={`${styles.glass} ${extend.glass}`}
            style={{ width: "45%" }}
          >
            <div className="title flex flex-col items-center">
              <h4 className="text-2xl font-bold">Profile</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                You can update your profile details.
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    className={`${styles.profile_img} ${extend.profile_img}`}
                    src={
                      apiData?.profile ||
                      file ||
                      "https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png"
                    }
                    alt="avatar"
                    name="profile"
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
                <div className="name flex w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("firstname")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="First Name"
                  />
                  <input
                    {...formik.getFieldProps("lastname")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Last Name"
                  />
                </div>

                <div className="name flex w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("mobile")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="Mobile Number"
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <input
                  {...formik.getFieldProps("address")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Address"
                />
                <button
                  className="border bg-indigo-700 hover:bg-red-500  py-2 px-5 rounded-lg text-gray-50 text-xl shadow-sm text-center"
                  type="submit"
                >
                  Update
                </button>

                <div></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
