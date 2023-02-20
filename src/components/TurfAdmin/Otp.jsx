import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { resent, verifyOtp } from "../../helper/helperTurf";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const Otp = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  let { value, type } = useParams();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validateOnBlur: false,
    onSubmit: async (values) => {
      values = Object.assign(values);
      const { otp } = values;
      let otpPromise = verifyOtp(value, otp);
      toast.promise(otpPromise, {
        loading: "Verifying..",
        success: <b>your otp verified</b>,
        error: <b>Couldn't verify</b>,
      });

      otpPromise.then(function () {
        if (type == "register") {
          navigate("/turfAdmin/login");
        } else {
          navigate(`/turfAdmin/changePassword/${value}`);
        }
      });
    },
  });

  const resentOtp = () => {
    const otp = resent(value);
    toast.promise(otp, {
      loading: "Sending...",
      success: "Otp sent",
      error: <b>Couldn't sent</b>,
    });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="bg-green-300 w-full h-[715px] pt-40 relative">
        <div className="h-[150px] w-[70%] mx-auto  bg-red-500 pl-10 pt-5">
          {/* <p className="text-slate-400 text-2xl font-medium">Have an </p> */}
          {/* <p className="text-slate-400 text-2xl font-medium">account?</p> */}
          <p className="text-slate-400 mt-3 text-sm">didn't get otp yet?</p>

          <button
            onClick={resentOtp}
            class="mt-3 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-400 border-none "
          >
            <span class="relative px-7 py-2 transition-all ease-in duration-75 bg-red-500 dark:bg-gray-900 text-gray-400 rounded-md group-hover:bg-opacity-0">
              Resent
            </span>
          </button>
        </div>
      </div>
      <div className=" absolute top-28 left-[60%] bg-white w-[300px] h-[250px] shadow-2xl">
        <p className="text-2xl text-gray-700 font-medium font-sans m-3 mt-5">
          OTP
        </p>

        <form onSubmit={formik.handleSubmit}>
          <input
            {...formik.getFieldProps("otp")}
            name="otp"
            type="text"
            className="focus:outline-none w-[200px] text-center rounded h-[30px] border-black border-r-4 bg-slate-100 mt-4 mx-[42px]"
            placeholder="Enter valid Otp"
          />

          <div className="countdown-text p-5">
            {seconds > 0 || minutes > 0 ? (
              <p>
                Expire within: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
               </p>
            ) : (
              <p>Didn't recieve code?</p>
            )}

            {/* <button style={{ color: "#FF5630" }}>Resend OTP</button> */}
          </div>

          <div className="absolute bottom-3 ">
            <button
              type="submit"
              className=" py-2 bg-slate-400 px-2 rounded-md ml-[200px]  text-white text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
