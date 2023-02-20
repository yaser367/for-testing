import React from "react";
import Nav from "../../components/TurfAdmin/Nav";
import UploadImages from "../../components/TurfAdmin/UploadImages";

const UploadDoc = () => {
  const url = "docUpload";
  const endpoint = "addlocation";
  const heading = "Upload your turf related Documents";
  const button = "Upload Docs";
  const bg='#ff3d3d'
  return (
    <div className="bg-white">
      <Nav />
      <UploadImages url={url} endpoint={endpoint} heading={heading} button={button} bg={bg}/>
    </div>
  );
};

export default UploadDoc;
