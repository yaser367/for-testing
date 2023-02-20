import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { addSlot } from "../../helper/helperTurf";
import "../../style/modal.css";

const TimeSlot = ({ secondModal, setSecondModal, data, date, play,  }) => {
  const toggleModal = () => {
    setSecondModal(!secondModal);
  };
  const [time, setTime] = useState([]);
  const [slot, setSlot] = useState("");
  const [ID, setId] = useState("");
  const {id} = useParams()
  const times = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];
  useEffect(() => {
    setTime(times);
    id && setId(id);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault()
  console.log("kjd"+ id)
    const addSlotPromise = addSlot(id);
    toast.promise(addSlotPromise, {
      loading: "updating..",
      success: <b>Slot added</b>,
      error: <b>can't update</b>,
    });
    // addSlotPromise.then(() => {});
  };
  return (
    <>
      {secondModal && (
        <div className="modal z-50">
          <Toaster position="top-center" reverseOrder={false}></Toaster>

          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content p-10">
            <h2 className="font-bold text-lg text-red-500 ">
              Select Time slot
            </h2>
            <div class="grid grid-cols-8 gap-3 mt-8">
              {time.map((time) => (
                <>
                  <input
                    onChange={(e) => {
                      setSlot(e.target.value);
                    }}
                    id="red-radio"
                    type="radio"
                    value={time}
                    name="colored-radio"
                    class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="red-radio"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {time}:00
                  </label>
                </>
              ))}
            </div>

            <div className="flex mt-10 justify-end gap-3">
              <button
                onClick={(e)=>handleSubmit(e)}
                type="button"
                class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TimeSlot;
