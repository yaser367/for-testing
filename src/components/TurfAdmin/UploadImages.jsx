import React, { useEffect } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import DropzoneComponent from "./DropzoneComponent";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import { deleteImg, getOneTurf } from "../../helper/helperTurf";
const UploadImages = ({ url, endpoint, button, heading, bg }) => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [load, setLoad] = useState(false);
  // const [{ isLoading, apiData, serverError }] = useFetch(
  //   `turfAdmin/getoneTurf/${id}`
  // );
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    const turfs = await getOneTurf(id);
    setApiData(turfs);
  };
  useEffect(() => {
    fetchData();
  }, []);
  let urls = [];
  useEffect(() => {
    urls = [];
    setImage("");
  }, []);
  let files = [];
  const imageHandler = (e) => {
    e.preventDefault();
    const uploaders = image.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kay6oyd9");
      formData.append("cloud_name", "dxdkwzuyr");
      files = file;
      return axios
        .post("https://api.cloudinary.com/v1_1/dxdkwzuyr/upload", formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((response) => {
          const data = response.data;
          const url = data.url;
          urls.push(url);
        })
        .catch((e) => {
          toast.error("Please select");
        });
    });
    axios.all(uploaders).then(async () => {
      const upload = await axios.post(
        `http://localhost:8080/api/turfAdmin/${url}`,
        { urls, id }
      );
      // toast.promise(upload, {
      //   loading: "Uploading...",
      //   success: <b>Successfully Uploaded</b>,
      //   error: <b>Can't upload</b>,
      // });
      toast.success("Uploaded");
    });
    !apiData?.DocUrl[0]
      ? Navigate(`/turfAdmin/${endpoint}/${id}`)
      : Navigate("/turfAdmin/home");
  };
  const deleteTurfImg = (item) => {
    const deleteTurfImg = deleteImg(id, item);
    fetchData();
   
  };

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <p className="text-center text-xl font-bold">{heading}</p>
      <p className="text-center mt-10 ">Click here to Upload</p>
      <div className="flex justify-center">
        <AiFillCaretDown />
      </div>
      <form onSubmit={imageHandler}>
        <div className="flex justify-center">
          {/* <Tooltip title="Upload Turf Images">
          <label htmlFor="upload">
            <div class=" font-bold text-gray-700 rounded-full h-[80px] w-[80px] bg-white flex items-center justify-center font-mono cursor-pointer">
              <AiOutlineCloudUpload size={40} />
            </div>
          </label>
        </Tooltip> */}
          {/* <input className="w-40 h-10" type="file" multiple onChange={(e)=>e.target.files[0]} /> */}
          <DropzoneComponent image={image} SetImage={setImage} bg={bg} />
          {/* <input type="te" className="bg-black " placeholder="hell" /> */}
        </div>
        <div className="h-[540px] w-full mt-5 bg-white">
          {apiData?.ImageUrl && apiData?.ImageUrl[0] && (
            <div className="border border-indigo-600 h-[350px] w-[80%] mx-auto">
              <p className="text-center text-lg ">Uploaded Images</p>
              <div className="flex gap-4 p-5 justify-center">
                {apiData?.ImageUrl &&
                  apiData?.ImageUrl.map((item, index) => {
                    return (
                      <div className="" key={item}>
                        <img className="h-40 w-40" src={item} alt="" />
                        <div className="flex justify-center mt-2">
                          <button
                            onClick={() => deleteTurfImg(item)}
                            type="button"
                            class="inline-block px-4 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              class=" bg-transparent hover:bg-indigo-600 text-indigo-600  hover:text-white py-1 px-4 border border-indigo-600  hover:border-transparent rounded"
            >
              {button}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadImages;
