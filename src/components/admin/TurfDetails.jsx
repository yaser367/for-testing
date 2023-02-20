import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hook/fetch.hook";
import ViewLocaion from "../Location/ViewLocation";

const TurfDetails = () => {
  const { id } = useParams();
  const [{ isLoading, apiData, serverError }] = useFetch(
    `turfAdmin/getoneTurf/${id}`
  );

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    setLat(apiData?.lat);
    setLong(apiData?.long);
  }, [apiData]);

  return (
    <div className="w-full bg-white mt-5">
      <div className="w-[700px] mx-auto  border-solid border-2 border-green-500 p-10">
        <div className="flex  justify-center font-bold text-2xl">
          <p>{apiData?.TurfName}</p>
        </div>
        <div className="flex mt-5 justify-center font-bold text-2xl">
          <img className="w-[90%]" src={apiData?.ImageUrl[0]} alt="" />
        </div>
        <div className="flex justify-center mt-5">
          <a
            href={apiData?.DocUrl[0]}
            type="button"
            class="text-blue-700  hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Get Turf Document
          </a>
        </div>
        <div className="border-solid border-2 border-red-500 mt-5 p-3">
          <p className="font-bold text-sm">Availble Games :</p>
          <p className="font-bold text-sm mt-3">Number Grounds :</p>
          <p className="font-bold text-sm mt-3">Price for One hour :</p>
        </div>
        <div className=" mx-auto pl-36  w-[600px] mt-6">
          <p className="text-green-500 font-bold ml-36 mb-3">Turf Location</p>
          {apiData && (
            <ViewLocaion
              lat={lat}
              long={long}
              setLat={setLat}
              setLong={setLong}
              id={id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
