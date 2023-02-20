import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Modal from "../TurfAdmin/Modal";

const DataTable = ({
  message,
  modal,
  setModal,
  handleUpdate,
  id,
  modalHeader,
  users,
  showModal,
  file,
  turfAdmin,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = users.slice(firstPostIndex, lastPostIndex);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Modal
        message={message}
        modal={modal}
        setModal={setModal}
        handle={handleUpdate}
        id={id}
        Header={modalHeader}
      />
      <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <div>
          <div
            id="dropdownAction"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Reward
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Promote
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Activate account
                </a>
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
        <label for="table-search" class="sr-only">
          Search
        </label>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, idx) => (
              <tr
                key={idx}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    class="w-10 h-10 rounded-full"
                    src='https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png'
                    alt="Jese image"
                  />
                  <div class="pl-3">
                    <div class="text-base font-semibold">
                      {user.username || user.AdminName}
                    </div>
                    <div class="font-normal text-gray-500">{user.email}</div>
                  </div>
                </th>
                <td class="px-6 py-4">{user.mobile}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div
                      class={`h-2.5 w-2.5 rounded-full ${
                        !turfAdmin
                          ? user.isActive
                            ? `bg-green-500`
                            : `bg-red-500`
                          : user.isVerified
                          ? `bg-green-500`
                          : `bg-red-500`
                      } mr-2`}
                    ></div>{" "}
                    {!turfAdmin
                      ? user.isActive
                        ? "Active"
                        : "Blocked"
                      : user.isVerified
                      ? "Active"
                      : "Blocked"}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <a
                    onClick={(id) => {
                      showModal(user._id);
                    }}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {!turfAdmin
                      ? user.isActive
                        ? "Block"
                        : "Un block"
                      : user.isVerified
                      ? "Block"
                      : "Un block"}
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
