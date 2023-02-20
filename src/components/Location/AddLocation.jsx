import React, { useEffect, useRef } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate, useParams } from "react-router-dom";
import { addLocation } from "../../helper/helperTurf";
import Geocoder from "./Geocoder";

const AddLocation = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [zoom, setZoom] = useState(5);
  const { id } = useParams();
  const Navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const add = addLocation({ id, lat, long });
      let status = await add;

      add.then(() => {
        Navigate("/turfAdmin/home");
      });
    } catch (error) {}
  };

  const dragEndHandler = (e) => {
    setLong(e.lngLat.lng);
    setLat(e.lngLat.lat);
  };

  const myRef = useRef();

  useEffect(() => {
    if (!long && !lat) {
      fetch("https://ipapi.co/json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          myRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          setLat(data.latitude);
          setLong(data.longitude);
        });
    }
  }, []);
  return (
    <div>
      <div className="h-[400px] w-full flex flex-col justify-center items-center mt-10">
        <ReactMapGL
          ref={myRef}
          style={{ height: 400, width: "85%" }}
          initialViewState={{
            longitude: lat,
            latitude: long,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={import.meta.env.VITE_API_MAPBOX}
        >
          <Marker
            latitude={lat}
            longitude={long}
            draggable
            onDragEnd={dragEndHandler}
          />
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) => {
              setLat(e.coords.latitude);
              setLong(e.coords.longitude);
            }}
          />
          <Geocoder setLat={setLat} setLong={setLong} />
        </ReactMapGL>
        <div>
          <button
            onClick={handleClick}
            type="button"
            class="mt-10 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
