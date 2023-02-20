import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import styled from "styled-components";
import { changePassword, forgotpsw } from "../../helper/helperTurf";
import { toast, Toaster } from "react-hot-toast";

const FieldContainer = styled.div`
  width: 100%;
`;
const FieldError = styled.span`
  color: red;
  font-size: 11px;
  min-height: 18px;
`;
const validationSchema = yup.object({
  password: yup.string().required("Password required"),
  cfmPassword: yup
    .string()
    .required("conform password required")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),
});

const ChangePasswordTurf = () => {

  let {email} = useParams();
  const Navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      password: "",
      cfmPassword:""
    },
    validateOnBlur: false,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values = await Object.assign(values);
      const {password} = values
      let changePasswordPromise = changePassword(email,password)
      toast.promise(changePasswordPromise,{
        loading:'Creating..',
        success:<b>your password changed</b>,
        error:<b>Can't change Password</b>
      })
      changePasswordPromise.then(function(){Navigate('/turfAdmin/login')})

    },
  });
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="bg-green-300 w-full h-[715px] pt-40 relative">
        <div className=" absolute top-28 left-[20%] bg-white w-[300px] h-[350px] shadow-2xl">
          <p className="text-2xl text-gray-700 font-medium font-sans m-3 mt-5">
            Change Password
          </p>

          <form onSubmit={formik.handleSubmit}>
            <FieldContainer className="text-center">
              <input
                {...formik.getFieldProps("password")}
                type="text"
                name="password"
                onBlur={formik.handleBlur}
                autoComplete="off"
                className="focus:outline-none w-[200px] text-center rounded h-[30px] border-black border-r-4 bg-slate-100 m-4 mx-[42px]"
                placeholder="Enter new Password"
              />
              <FieldError>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </FieldError>
            </FieldContainer>
            <FieldContainer className="text-center">
              <input
                {...formik.getFieldProps("cfmPassword")}
                type="password"
                name="cfmPassword"
                onBlur={formik.handleBlur}
                autoComplete="off"
                className="focus:outline-none w-[200px] text-center rounded h-[30px] border-black border-r-4 bg-slate-100 m-4 mx-[42px]"
                placeholder="Enter Confirm password"
              />
              <FieldError>
                {formik.touched.cfmPassword && formik.errors.cfmPassword
                  ? formik.errors.cfmPassword
                  : ""}
              </FieldError>
            </FieldContainer>

            <button
              type="submit"
              className="py-2 bg-slate-400 px-4 rounded-md ml-[200px] mt-8 text-white text-sm"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="h-[250px] w-[70%]  mx-auto  bg-red-500 pl-[50%] pt-12">
          <p className="text-slate-400 text-2xl font-medium">Don't have </p>
          <p className="text-slate-400 text-2xl font-medium">an account?</p>
          <p className="text-slate-400 mt-3 text-sm">then you can register</p>
          <Link to="/turfAdmin/register">
            <button class="mt-3 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-400 border-none ">
              <span class="relative px-7 py-2 transition-all ease-in duration-75 bg-red-500 dark:bg-gray-900 text-gray-400 rounded-md group-hover:bg-opacity-0">
                Register
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordTurf;
