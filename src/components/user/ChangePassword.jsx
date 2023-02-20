// import React from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useFormik } from "formik";
// import { resetPasswordValidate } from "../../helper/validateUser";
// import { resetPassword } from "../../helper/helperUser";
// import { useAuthStore } from "../../store";
// import styles from "../style/Username.module.css";
// import { useNavigate, Navigate } from "react-router-dom";
// import useFetch from "../../hook/fetch.hook";
// const changePassword = () => {
//   const navigate = useNavigate();
//   const [{ isLoading, apiData, status, serverError }] =
//     useFetch("createResetSession");

//   const { username } = useAuthStore((state) => state.auth);
//   const formik = useFormik({
//     initialValues: {
//       password: "",
//       cfm_password: "",
//     },
//     validate: resetPasswordValidate,
//     validateOnBlur: false,
//     validateOnChange: false,
//     onSubmit: async (values) => {
//       let resetPromise = resetPassword({ username, password: values.password });
//       toast.promise(resetPromise, {
//         loading: "Updating...",
//         success: <b>Reset Succesfully</b>,
//         error: <b>Could not reset</b>,
//       });
//       resetPromise.then(() => navigate("/password"));
//     },
//   });
//   // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
//   if (serverError)
//     return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
//   if (status && status !== 201)
//     return <Navigate to={"/password"} replace={true}></Navigate>;
//   return (
//     <div className={styles.background_img}>
//       <div className="container mx-auto">
//         <Toaster position="top-center" reverseOrder={false}></Toaster>
//         <div className="flex justify-center items-center h-screen">
//           <div className={styles.glass}>
//             <div className="title flex flex-col items-center">
//               <h4 className="text-2xl font-bold">Reset</h4>
//               <span className="py-4 text-sm w-2/3 text-center text-gray-500">
//                 Enter New Password
//               </span>
//             </div>
//             <form className="pt-20" onSubmit={formik.handleSubmit}>
//               <div className="textbox flex flex-col items-center gap-6">
//                 <input
//                   {...formik.getFieldProps("password")}
//                   className={styles.textbox}
//                   type="password"
//                   placeholder="New Password"
//                 />
//                 <input
//                   {...formik.getFieldProps("cfm_password")}
//                   className={styles.textbox}
//                   type="password"
//                   placeholder="Repeat Password"
//                 />
//                 <div>
//                   <button
//                     className="border bg-indigo-700 hover:bg-red-500  py-2 px-5 rounded-lg text-gray-50 text-xl shadow-sm text-center"
//                     type="submit"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default changePassword;
