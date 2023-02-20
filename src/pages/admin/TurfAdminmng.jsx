import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import Sidebar from "../../components/admin/Sidebar";
import DataTable from "../../components/admin/DataTable";
import { getAllTurfAdmin, updateAdminStatus } from "../../helper/helperAdmin";
import convertToBase64 from "../../helper/convert";
import { toast } from "react-hot-toast";
import Pagination from "../../components/admin/Pagination";

const TurfAdminmng = () => {
  const [users, setUser] = useState([]);
  const [file, setFile] = useState([]);
  const [id, setId] = useState();
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);

  const handleUpdate = (id) => {
    const updatePromise = updateAdminStatus(id);
    toast.promise(updatePromise, {
      loading: "updating..",
      success: <b>TurfAdmin status updated</b>,
      error: <b>Couldn't update</b>,
    });
    updatePromise.then(() => {
      setModal(!modal);
      const usersData = getAllTurfAdmin();
      usersData.then(async () => {
        const users = await usersData;
        setUser(users);
      });
    });
  };

  const showModal = (Id) => {
    setId(Id);
    setModal(!modal);
    setMessage("Are you sure ?");
    setModalHeader("Block / Unblock TurfAdmin");
  };
  const fetchData = async () => {
    const turfAdmin = await getAllTurfAdmin();
    setUser(turfAdmin);
    const base64 = await convertToBase64(users.profile);
    setFile(base64);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const turfAdmin = true;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = users.slice(firstPostIndex,lastPostIndex)
  return (
    <div className="bg-white flex">
      <Sidebar />
      <div style={{ flex: "6" }} className="p-5">
        <p className="font-bold text-2xl text-gray-700 ml-4">
          Turf Admin Management
        </p>

        <DataTable
          message={message}
          modal={modal}
          setModal={setModal}
          turfAdmin={turfAdmin}
          handleUpdate={handleUpdate}
          id={id}
          Header={modalHeader}
          users={currentPost}
          showModal={showModal}
          file={file}
        />
        <Pagination setCurrentPage={setCurrentPage} totalPosts={users.length} postsPerpage={postPerPage} />
      </div>
    </div>
  );
};

export default TurfAdminmng;
