import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import Sidebar from "../../components/admin/Sidebar";
import DataTable from "../../components/admin/DataTable";
import { getAllUsers, updateUserStatus } from "../../helper/helperAdmin";
import convertToBase64 from "../../helper/convert";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pagination  from "../../components/admin/Pagination";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [file, setFile] = useState([]);
  const [id, setId] = useState();
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalHeader, setModalHeader] = useState("");

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  const handleUpdate = (id) => {
    const updatePromise = updateUserStatus(id);
    toast.promise(updatePromise, {
      loading: "updating..",
      success: <b>User status updated</b>,
      error: <b>Couldn't update</b>,
    });
    updatePromise.then(() => {
      setModal(!modal);
      const usersData = getAllUsers();
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
    setModalHeader("Block / Unblock User");
  };
  const fetchData = async () => {
    const users = await getAllUsers();
    setUser(users);
    const base64 = await convertToBase64(users.profile);
    setFile(base64);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = users.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="bg-white flex">
      <Sidebar />
      <div style={{ flex: "6" }} className="p-5">
        <p className="font-bold text-2xl text-gray-700 ml-4">User Management</p>
        <DataTable
          message={message}
          modal={modal}
          setModal={setModal}
          handleUpdate={handleUpdate}
          id={id}
          Header={modalHeader}
          users={currentPost}
          showModal={showModal}
          file={file}
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          totalPosts={users.length}
          postsPerpage={postPerPage}
        />
      </div>
    </div>
  );
};

export default UserList;
