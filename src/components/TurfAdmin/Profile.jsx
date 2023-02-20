import React from "react";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrectAdmin } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { getTurfAdmin, updateProfile } from "../../helper/helperTurf";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const adminData = useSelector(selectCurrectAdmin);
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [AdminName, setAdmin] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [file, setFile] = useState();
  const [profile, setProfile] = useState();
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kay6oyd9");
    formData.append("cloud_name", "dxdkwzuyr");
    await axios
      .post("https://api.cloudinary.com/v1_1/dxdkwzuyr/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then((response) => {
        const data = response.data;
        const url = data.url;
        const update = updateProfile({
          AdminName,
          mobile,
          address,
          email,
          id,
          url,
        });
        toast.promise(update, {
          loading: "Updating...",
          success: <b>Profile Updated</b>,
          error: <b>Can't update</b>,
        });
        update.then(() => {
          Navigate("/turfAdmin/home");
        });
      })
      .catch((e) => {});
  };

  useEffect(() => {
    const getData = getTurfAdmin(adminData._id);
    getData.then(async () => {
      {
        const user = await getData;
        setUser(user);
        setAdmin(user.AdminName);
        setMobile(user.mobile);
        setAddress(user.address);
        setEmail(user.email);
        setId(user._id);
        setProfile(user.profile);
      }
    });
  }, []);

  return (
    <div className="flex justify-center bg-white min-h-[700px]">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="w-full h-full pb-20 pt-1">
        <div>
          <p className="text-center text-2xl font-bold pb-2">Profile</p>
          <div className="mx-auto md:w-[40%] w-[80%] pb-10 pt-5 shadow-lg bg-gray-500 rounded-md ">
            <form className="py-1" onSubmit={handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <Tooltip title="Upload Turf Images">
                  <label htmlFor="profile">
                    <div class=" mt-4 font-bold text-gray-700 rounded-full h-[80px] w-[80px] bg-white flex items-center justify-center font-mono cursor-pointer">
                      <img
                        className="rounded-full"
                        src={
                          profile ||
                          "https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png"
                        }
                        alt=""
                      />
                    </div>
                  </label>
                </Tooltip>
                <input
                  className="focus:outline-none w-[200px] text-center rounded h-[30px]"
                  name="adminName"
                  type="text"
                  placeholder=" Name"
                  value={AdminName}
                  onChange={(e) => setAdmin(e.target.value)}
                />
                <input
                  id="profile"
                  hidden
                  name="profil"
                  type="file"
                  placeholder="profile"
                  // onChange={onUpload}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <input
                  className="focus:outline-none w-[200px] text-center rounded h-[30px]"
                  name="mobile"
                  type="text"
                  placeholder=" Mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <input
                  className="focus:outline-none w-[200px] text-center rounded h-[30px]"
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="focus:outline-none w-[200px] rounded h-[70px] "
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  type="submit"
                  class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
