import React, { useRef } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import useFetch from "../../hook/fetch.hook";

const ViewLocaion = ({ lat, long, setLat, setLong, id }) => {
  const myRef = useRef();
  const [{ isLoading, apiData, serverError }] = useFetch(`getOneTurf/${id}`);

  if (apiData)
    return (
      <div>
        <ReactMapGL
          ref={myRef}
          style={{ height: 400, width: "85%" }}
          initialViewState={{
            longitude: apiData?.lat || lat || 1.46546,
            latitude: apiData?.long || long || 1.654654,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={import.meta.env.VITE_API_MAPBOX}
        >
          <Marker latitude={apiData?.lat} longitude={apiData?.long} />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) => {
              setLat(apiData?.long);
              setLong(apiData?.lat);
            }}
          />
        </ReactMapGL>
      </div>
    );
};

export default ViewLocaion;
