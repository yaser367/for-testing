import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AddTr, editTurf } from "../../helper/helperTurf";
import * as yup from "yup";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrectAdmin } from "../../features/auth/authSlice";
import useFetch from "../../hook/fetch.hook";
const FieldError = styled.span`
  color: red;
  font-size: 11px;
`;

const Add = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const admin = useSelector(selectCurrectAdmin);
  const [turf, setTurf] = useState("");
  const [football, setFootball] = useState(false);
  const [cricket, setCricket] = useState(false);
  const [tennis, setTennis] = useState(false);
  const [other, setOther] = useState(false);
  const [{ isLoading, apiData, serverError }] = useFetch(
    `turfAdmin/getoneTurf/${id}`
  );
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const valid = yup.object({
    mobile: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Mobile Number required"),
    // gameTypes: yup
    //   .array()
    //   .min(1, "Choose any game")
    //   .of(yup.string().required("required"))
    //   .required("required"),
    Description: yup.string().required("description required"),
    price: yup.number().required("price required"),
    TurfName: yup.string().required("Name required"),
    // image: yup
    //   .mixed()
    //   .required("Image required")
    //   .test("FILE_SIZE", "Too big!", ( value ) => value && value.size < 1024 * 1024)
    //   .test(
    //     "FILE_TYPE",
    //     "Invalid!",
    //     (value) => value && ["image/png", "image/jpeg"].includes(value.type)
    //   ),
  });

  const formik = useFormik({
    initialValues: {
      TurfName: apiData?.TurfName || "",
      mobile: apiData?.mobile || "",
      gameTypes:[],
      fives: apiData?.fives || "",
      sevens: apiData?.sevens || "",
      elevens: apiData?.elevens || "",
      cricket: apiData?.cricket || "",
      tennis: apiData?.tennis || "",
      other: apiData?.other || "",
      otherCount: "",
      price: apiData?.price || "",
      Description: apiData?.Description || "",
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validationSchema: valid,
    onSubmit: async (values) => {
      values = Object.assign(values);
      const { _id } = admin;
      if (id) {
        const registerPromise = editTurf(values, id);
        toast.promise(registerPromise, {
          loading: "Updating..",
          success: <b>details added</b>,
          error: <b>can't upload</b>,
        });
        registerPromise.then(async (data) => {
          if (id) {
            Navigate(`/turfAdmin/uploadImg/${id}`);
          } else {
            const result = await registerPromise;
            const id = data._id;
            Navigate(`/turfAdmin/uploadImg/${id}`);
          }
        });
      } else {
        const registerPromise = AddTr(values, _id);
        toast.promise(registerPromise, {
          loading: "Updating..",
          success: <b>details added</b>,
          error: <b>can't upload</b>,
        });
        registerPromise.then(async (data) => {
          if (id) {
            Navigate(`/turfAdmin/uploadImg/${id}`);
          } else {
            const result = await registerPromise;
            const id = data._id;
            Navigate(`/turfAdmin/uploadImg/${id}`);
          }
        });
      }
    },
  });

  useEffect(() => {
   if(id){
    apiData?.fives !== "" && "0"
    ? setFootball(true)
    : setFootball(false) || (apiData?.elevens !== "" && "0")
    ? setFootball(true)
    : setFootball(false) || (apiData?.elevens !== "" && "0")
    ? setFootball(true)
    : setFootball(false);
  apiData?.cricket !== "" && "0" ? setCricket(true) : setCricket(false);
  apiData?.tennis !== "" && "0" ? setTennis(true) : setTennis(false);
  apiData?.otherCount !== "" && "0" ? setOther(true) : setOther(false);
   }
  }, [apiData]);

  return (
    <div className="flex justify-center bg-red-100 w-full">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="w-full h-full pb-20 pt-1">
        <div>
          <p className="text-center text-2xl font-bold pb-2">
            {id ? "Edit Turf" : "Add Turf"}
          </p>
          <div className="mx-auto md:w-[35%] w-8/12 pb-10 pt-5 shadow-lg bg-white  z-10 rounded-md ">
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <p className="text-xl font-bold ">
                  {id ? "Edit your Turf details" : "Add your turf details"}
                </p>
                <div className="flex">
                  <div className="flex gap-3">
                    <input
                      {...formik.getFieldProps("TurfName")}
                      className="focus:outline-none w-[200px] text-center rounded h-[30px] border border-solid border-gray-500 placeholder:text-gray-500 text-sm"
                      name="TurfName"
                      //   onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter Turf Name"
                    />
                  </div>
                </div>
                <div className="">
                  <FieldError>
                    {formik.touched.TurfName && formik.errors.TurfName
                      ? formik.errors.TurfName
                      : ""}
                  </FieldError>
                </div>
                <div className="md:flex gap-3">
                  <div>
                    <input
                      {...formik.getFieldProps("mobile")}
                      className="focus:outline-none w-[200px] text-center rounded h-[30px] border border-solid border-gray-500 placeholder:text-gray-500 text-sm"
                      name="mobile"
                      type="text"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div className="flex justify-center md:mt-0 mt-4">
                    <input
                      {...formik.getFieldProps("price")}
                      className="focus:outline-none w-20   text-center rounded h-[30px] border border-solid border-gray-500 placeholder:text-gray-500 text-sm"
                      name="price"
                      type="number"
                      placeholder="Price for 1 hour"
                    />
                  </div>
                </div>
                <div className="flex gap-5">
                  <FieldError>
                    {formik.touched.mobile && formik.errors.mobile
                      ? formik.errors.mobile
                      : ""}
                  </FieldError>
                  <FieldError>
                    {formik.touched.price && formik.errors.price
                      ? formik.errors.price
                      : ""}
                  </FieldError>
                </div>
                <div className=" w-[81%] h-[80px] rounded-lg p-2 ">
                  {id ? (
                    <p className="font-bold mb-2 text-red-500"></p>
                  ) : (
                    <p className="font-bold mb-2 text-black">
                      Select available games
                    </p>
                  )}
                  <div className="flex mt-5">
                    {id?<input
                      onClick={() => setFootball(!football)}
                      type="checkbox"
                      //   onChange={formik.handleChange}
                      value="football"
                      name="gameTypes"
                      className="w-4 h-4 onoffswitch-checkbox"
                      id="inline"
                      defaultChecked={apiData?.fives == undefined && "" && "0"  ? false : true}
                    />:<input
                    onClick={() => setFootball(!football)}
                    type="checkbox"
                      onChange={formik.handleChange}
                    value="football"
                    name="gameTypes"
                    className="w-4 h-4 onoffswitch-checkbox"
                    id="inline"
                  />}
                    <p className="text-sm">Football</p>
                    {football && (
                      <div className="flex">
                        <p className="ml-4">5s</p>
                        <input
                          {...formik.getFieldProps("fives")}
                          name="fives"
                          type="number"
                          min={0}
                          className="border  ml-2 border-solid border-gray-500 w-10"
                        />
                        <p className="ml-4">7s</p>
                        <input
                          {...formik.getFieldProps("sevens")}
                          name="sevens"
                          type="number"
                          min={0}
                          className="border  ml-2 border-solid border-gray-500 w-10"
                        />
                        <p className="ml-4">11s</p>
                        <input
                          {...formik.getFieldProps("elevens")}
                          name="elevens"
                          type="number"
                          min={0}
                          className="border ml-2  border-solid border-gray-500 w-10"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex mt-4">
                    <input
                      // defaultChecked={
                      //   apiData?.cricket == undefined && "" && "0" ? false : true
                      // }
                      onClick={() => setCricket(!cricket)}
                      type="checkbox"
                        onChange={formik.handleChange}
                      value="cricket"
                      name="gameTypes"
                      className="w-4 h-4"
                    />
                    <p className="text-sm">Cricket</p>
                    {cricket && (
                      <div className="flex">
                        <p className="ml-4 text-sm">Number of grounds</p>
                        <input
                          {...formik.getFieldProps("cricket")}
                          type="number"
                          min={0}
                          className="border  ml-2 border-solid border-gray-500 w-10"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex mt-4">
                    <input
                      onClick={() => setTennis(!tennis)}
                        onChange={formik.handleChange}
                      type="checkbox"
                      name="gameTypes"
                      value="tennis"
                      className="w-4 h-4 "
                    />
                    <p className="text-sm">Tennis</p>
                    {tennis && (
                      <div className="flex">
                        <p className="ml-4  text-sm">Number of grounds</p>
                        <input
                          {...formik.getFieldProps("tennis")}
                          type="number"
                          min={0}
                          className="border  ml-2 border-solid border-gray-500 w-10"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex mt-4">
                    <input
                      onClick={() => setOther(!other)}
                        onChange={formik.handleChange}
                      type="checkbox"
                      name="gameTypes"
                      value="other"
                      className="w-4 h-4 "
                    />
                    <p className="text-sm">Other</p>
                    {/* {other && (
                      <div className="flex">
                        <p className="ml-4 text-sm">No of grounds</p>
                        <input
                          {...formik.getFieldProps("otherCount")}
                          type="number"
                          min={0}
                          className="border  ml-2 border-solid border-gray-500 w-10"
                        />
                      </div>
                    )} */}
                  </div>
                  {other && (
                    <div className="md:flex mt-4 ">
                      <p className=" text-sm">Game</p>
                      <input
                        {...formik.getFieldProps("other")}
                        type="text"
                        className="border  ml-2 border-solid border-gray-500 w-40"
                      />
                      <div className="flex mt-4">
                        <p className="ml-4 text-sm">No of grounds</p>
                        <input
                          {...formik.getFieldProps("otherCount")}
                          type="number"
                          min={0}
                          className="border  ml-2 border-solid border-gray-500 w-10 "
                        />
                      </div>
                    </div>
                  )}
                </div>
                <FieldError>
                  {formik.touched.gameTypes && formik.errors.gameTypes
                    ? formik.errors.gameTypes
                    : ""}
                </FieldError>
                <div className={other ? "mt-16" : ""}>
                  <input
                    {...formik.getFieldProps("Description")}
                    name="Description"
                    placeholder="Description..."
                    className="focus:outline-none md:w-[40vh] h-[50px] rounded border border-solid border-gray-500 placeholder:text-gray-500 text-sm mt-28"
                  />
                </div>

                <FieldError>
                  {formik.touched.Description && formik.errors.Description
                    ? formik.errors.Description
                    : ""}
                </FieldError>

                <button
                  type="submit"
                  class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
