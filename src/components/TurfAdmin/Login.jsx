import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { toast, Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate("/turfAdmin/home");
    } catch (error) {
      if (!error?.originalStatus) {
        setErrMsg("No server Response");
      } else if (error.originalStatus?.status === 400) {
        setErrMsg("Missing UserName or Password");
      } else if (error.originalStatus?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Enter valid email and password");
      }
      console.log("first", error);
      // errRef.current.focus();
      toast.error("Enter valid email and password");
    }
  };

  const handlEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="bg-green-300 w-full h-[715px] pt-40 relative">
        <div className=" absolute top-28 left-[20%] bg-white w-[320px] h-[380px] shadow-2xl">
          <p className="text-2xl text-gray-700 font-medium font-sans m-3 mt-5">
            LOGIN
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              value={email}
              onChange={handlEmailInput}
              required
              autoComplete="off"
              className=" focus:outline-none w-[220px] text-center rounded h-[35px] border-black border-r-4 bg-slate-300 m-4 mt-9 mx-[42px]"
              placeholder="Enter Email address"
            />
            <input
              type="password"
              value={password}
              onChange={handlePasswordInput}
              required
              className=" focus:outline-none w-[220px] text-center rounded h-[35px] border-black border-r-4 bg-slate-300 m-4 mx-[42px] "
              placeholder="Enter Your Password"
            />
            <button
              type="submit"
              className="py-2 bg-slate-400 px-4 rounded-md ml-[200px] mt-8 text-white text-sm"
            >
              Login
            </button>
          </form>
          <Link to="/turfAdmin/forgot">
            <p className="text-red-500 ml-2 mt-14 cursor-pointer">
              Forgot password?
            </p>
          </Link>
        </div>
        <div className="h-[250px] w-[70%]  mx-auto  bg-red-500 pl-[50%] pt-12">
          <p className="text-slate-100 text-2xl font-medium">Don't have </p>
          <p className="text-slate-100 text-2xl font-medium">an account?</p>
          <p className="text-slate-100 mt-3 text-sm">then you can register</p>

          <Link to="/turfAdmin/register">
            <button class="mt-3 relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-400 border-none ">
              <span class="relative px-7 py-2 transition-all ease-in duration-75 bg-red-500 dark:bg-gray-900 text-gray-100 rounded-md group-hover:bg-opacity-0">
                Register
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
