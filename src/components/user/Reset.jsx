import React, { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store";
import { generateOtp, verifyOtp } from "../../helper/helperUser";
import { useNavigate } from "react-router-dom";

import styles from "../../style/Username.module.css";

const Reset = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOtp] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOtp({ username, code: OTP });
      if (status === 201) {
        toast.success("verify Succesfully");
        return navigate("/resend");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again");
    }
  }

  function resendOtphandler() {
    let sendPromise = generateOtp(username);

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
            <div className="text-center py-4">
              <span className="text-grey-500">
                Can't get OTP?{" "}
                <button onClick={resendOtphandler} className="text-red-500">
                  Resent
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
