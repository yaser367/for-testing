import React, { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  generateOtp,
  registerOtpVerify,
  verifyOtp,
  verifyUser,
} from "../../helper/helperUser";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../style/Username.module.css";

const Otp = () => {
  const navigate = useNavigate();
  const [OTP, setOtp] = useState();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const { userName } = useParams();
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
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const otpPromise = await registerOtpVerify({ userName, code: OTP });
      if (otpPromise) {
        toast.success("verify Succesfully");
        navigate("/login");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again");
    }
  }

  function resendOtphandler() {
    let sendPromise = generateOtp(userName);
    toast.promise(sendPromise, {
      loading: "Sending..",
      success: <b>OTP has been send to your mail</b>,
      error: <b>Could not send</b>,
    });

    sendPromise.then((OTP) => {
   
    });
  }
  return (
    <div className={styles.background_img}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div style={{ width: "30%" }} className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-2xl font-bold">OTP</h4>
              {/* <span className='py-4 text-xs w-2/3 text-center text-gray-500'>Enter OTP sent to your email address. </span> */}
            </div>
            <form className="pt-20" onSubmit={onSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <div className="input text-center flex flex-col items-center">
                  <span className="py-4 text-xs w-2/3 text-center text-gray-500">
                    Enter OTP sent to your email address.
                  </span>
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    className={styles.textbox}
                    type="text"
                    placeholder="OTP"
                  />
                </div>
                <button
                  className="border bg-indigo-700 hover:bg-red-500  py-2 px-5 rounded-lg text-gray-50 text-xl shadow-sm text-center"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="countdown-text  gap-4 text-center py-4 ">
              {seconds > 0 || minutes > 0 ? (
                <p>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p>Didn't recieve code?</p>
              )}

              <button
                disabled={seconds > 0 || minutes > 0}
                style={{
                  visibility: seconds > 0 || minutes > 0 ? "hidden" : "visible",
                  color: seconds > 0 || minutes > 0 ? "#ace973" : "#FF5630",
                }}
                onClick={resendOtphandler}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
