import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
const Geocoder = ({ setLong, setLat }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_API_MAPBOX,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setLong(coords[0]);
    setLat(coords[1]);
  });
  return null;
};

export default Geocoder;
