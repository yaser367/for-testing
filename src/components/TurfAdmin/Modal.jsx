import React, { useState } from "react";
import "../../style/modal.css";

export default function Modal({
  modal,
  setModal,
  handle,
  id,
  message,
  Header,
}) {
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      {modal && (
        <div className="modal z-50">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="font-bold text-lg text-red-500 ">{Header}</h2>
            <p className="mt-5">{message}</p>
            <button
              className="close-modal border border-solid border-black text-xs"
              onClick={toggleModal}
            >
              CLOSE
            </button>
            <div className="flex mt-4 justify-end gap-3">
              <button
                onClick={toggleModal}
                type="button"
                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1  text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                No
              </button>
              <button
                onClick={() => handle(id)}
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
