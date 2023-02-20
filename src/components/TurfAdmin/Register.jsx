import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast, { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styled from "styled-components";
import * as yup from "yup";
import { RegisterAdmin } from "../../helper/helperTurf";
const validationSchema = yup.object({
  AdminName: yup
    .string()
    .min(3, "Enter more 3 Character")
    .required("name required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email required"),
  password: yup.string().required("Password required"),
});

const FieldContainer = styled.div`
  width: 100%;
`;
const FieldError = styled.span`
  color: red;
  font-size: 11px;
  min-height: 18px;
`;

const AdminRegistration = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      AdminName: "",
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values = await Object.assign(values);
      let registerPromise = RegisterAdmin(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Registred Successfully...! Please verify OTP</b>,
        error: <b>Couldn't Register</b>,
      });
      registerPromise.then(function () {
        navigate(`/turfAdmin/otp/register/${values.email}`);
      });
      registerPromise.catch(function (error) {});
    },
  });
  const [val, setVal] = useState("");
  return (
    <div>
      {/* <Otp hidden={hidden} /> */}
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="bg-green-300 w-full h-[715px] pt-40 relative">
        <div className="h-[250px] w-[70%] mx-auto  bg-red-500 pl-10 pt-12">
          <p className="text-slate-400 text-2xl font-medium">Have an </p>
          <p className="text-slate-400 text-2xl font-medium">account?</p>
          <p className="text-slate-400 mt-3 text-sm">then you can login</p>
          <Link to="/turfAdmin/login">
            <button class="mt-3 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-400 border-none ">
              <span class="relative px-7 py-2 transition-all ease-in duration-75 bg-red-500 dark:bg-gray-900 text-gray-400 rounded-md group-hover:bg-opacity-0">
                Login
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className=" absolute top-28 left-[60%] bg-white w-[350px] h-[380px] shadow-2xl">
        <p className="text-2xl text-gray-700 font-medium font-sans m-3 mt-5">
          REGISTER
        </p>

        <form onSubmit={formik.handleSubmit}>
          <FieldContainer className="text-center">
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              type="email"
              className=" focus:outline-none w-[240px] text-center rounded h-[35px] border-black border-r-4 bg-slate-300 mt-4 mx-[42px]"
              placeholder="Enter Email address"
            />
            <FieldError>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FieldError>
          </FieldContainer>
          <FieldContainer className="text-center">
            <input
              value={formik.values.AdminName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="AdminName"
              type="text"
              className="focus:outline-none w-[240px] text-center rounded h-[35px] border-black border-r-4 bg-slate-300 mt-4 mx-[42px]"
              placeholder="Enter Your Name"
            />
            <FieldError>
              {formik.touched.AdminName && formik.errors.AdminName
                ? formik.errors.AdminName
                : ""}
            </FieldError>
          </FieldContainer>
          <FieldContainer className="text-center">
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              className="focus:outline-none w-[240px] text-center rounded h-[35px] border-black border-r-4 bg-slate-300 mt-4 mx-[42px]"
              placeholder="Enter Your Password"
            />
            <FieldError>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </FieldError>
          </FieldContainer>
          <div className=" flex justify-end absolute right-10 bottom-5 ">
            <button
              type="submit"
              className=" py-2 bg-slate-400 px-2 rounded-md  text-white text-sm"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
