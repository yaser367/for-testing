import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { addSlot, bookSlot, getSlot } from "../../helper/helperTurf";
import "../../style/modal.css";
import CalenderComp from "../CalenderComp";
import RowRadioButtonsGroup from "../RowRadioButtonsGroup";
import Modal from "./Modal";
import TimeSlot from "./TimeSlot";
import useFetch from "../../hook/fetch.hook";

export default function BookSlot({
  modal,
  setModal,

}) {
  const [mod, setMod] = useState(false);
  const [message, setMessage] = useState("");
  const [header, setHeader] = useState("");
  const [slot, setSlot] = useState("");
  const [game, setGame] = useState("");
  const [play, setPlay] = useState("");
  const [data, setData] = useState();
  const { id } = useParams();
  const [date, setDate] = useState(new Date());
  const [{ isLoading, apiData, serverError }] = useFetch(`getOneTurf/${id}`);
  const [next, setnext] = useState(false);
  const [nextButton, setnextBotton] = useState(false);
  const [bookButton, setBookBotton] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const handleSecondModal = () => {};

  const toggleModal = () => {
    setModal(!modal);
    setnext(false)
    setnextBotton(false)
    setBookBotton(false)
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const showModal = () => {
    setMod(true);
    setHeader("update");
    setMessage("message");
  };
  const [time, setTime] = useState([]);


  const handleTime = (play) => {
    setPlay(play);
  };

  const handleNext = async () => {
    setnext(!next)
    setnextBotton(false)
    // setSecondModal(!secondModal);
    const slot = await getSlot(id, play, date);
    setData(slot);
    const now = new Date();
    const dString = date.toLocaleDateString();
    const nowString = now.toLocaleDateString();
    if (dString === nowString) {
      setCurrentTime(now.getHours() + 1);
    } else {
      setCurrentTime(0);
    }
  
  };
  const handleSubmit = () => {
    
    const addSlotPromise = bookSlot(id,play,date,slot)
    toast.promise(addSlotPromise, {
      loading: "updating..",
      success: <b>Slot Booked</b>,
      error: <b>slot already exist</b>,
    });
    addSlotPromise.then(() => {
      setModal(!modal)
    });
  };


  return (
    <>
      {!next ? (
        <>
          {modal && (
            <div className="modal z-10 p-10">
          
              {/* <TimeSlot data={data} id={id} play={play} date={date} /> */}
              <Toaster position="top-center" reverseOrder={false}></Toaster>
              <div onClick={toggleModal} className="overlay"></div>
              <div className="p-5">
                <div className="modal-content bg-white md:w-[90%] pb-10 border-4 border-solid border-blue-500 ">
                  <div className="grid md:grid-cols-2  ">
                    <div>
                      <CalenderComp date={date} setDate={setDate} />
                    </div>

                    <div>
                      Selected Date - {date.toDateString()}
                      <div className="mt-5">
                        <div class="flex flex-wrap">
                          <div onClick={()=>setnextBotton(true)} className="mt-5 ">
                            <p className="">Select the game</p>

                            {apiData?.fives != "" && "0" && (
                              <>
                                <input
                                  onChange={(e) => {
                                    setGame(e.target.value);
                                  }}
                                  onClick={() => handleTime("fives")}
                                  id="red-radio"
                                  type="radio"
                                  value="fives"
                                  name="game"
                                  class=" mt-4 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  for="red-radio"
                                  class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  football-5s
                                </label>
                              </>
                            )}
                            {apiData?.sevens != "" && "0" && (
                              <>
                                <input
                                  onClick={() => handleTime("sevens")}
                                  onChange={(e) => {
                                    setGame(e.target.value);
                                  }}
                                  id="red-radio"
                                  type="radio"
                                  value="sevens"
                                  name="game"
                                  class=" mt-4 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  for="red-radio"
                                  class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  football-7s
                                </label>
                              </>
                            )}
                            {apiData?.elevens != "" && "0" && (
                              <>
                                <input
                                  onClick={() => handleTime("elevens")}
                                  onChange={(e) => {
                                    setGame(e.target.value);
                                  }}
                                  id="red-radio"
                                  type="radio"
                                  value="elevens"
                                  name="game"
                                  class=" mt-4 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  for="red-radio"
                                  class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  football-11s
                                </label>
                              </>
                            )}
                            {apiData?.cricket != "" && "0" && (
                              <>
                                <input
                                  onClick={() => handleTime("cricket")}
                                  onChange={(e) => {
                                    setGame(e.target.value);
                                  }}
                                  id="red-radio"
                                  type="radio"
                                  value="cricket"
                                  name="game"
                                  class=" mt-4 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  for="red-radio"
                                  class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  cricket
                                </label>
                              </>
                            )}
                            {apiData?.tennis != "" && "0" && (
                              <>
                                <input
                                  onClick={() => handleTime("tennis")}
                                  onChange={(e) => {
                                    setGame(e.target.value);
                                  }}
                                  id="red-radio"
                                  type="radio"
                                  value="tennis"
                                  name="game"
                                  class=" mt-4 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  for="red-radio"
                                  class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  tennis
                                </label>
                              </>
                            )}
                            {apiData?.otherCount != "" && "0" && (
                              <>
                                <input
                                  onClick={() => handleTime("other")}
                                  onChange={(e) => {
                                    setGame(e.target.value);
                                  }}
                                  id="red-radio"
                                  type="radio"
                                  value={apiData?.other}
                                  name="game"
                                  class=" mt-4 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  for="red-radio"
                                  class="mr-5 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {apiData?.other}
                                </label>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-10 ">
                    {nextButton && <button
                      onClick={handleNext}
                      type="button"
                      class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Next
                    </button>}
                   
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {modal &&( <div className="modal z-50">
            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content p-10">
              <h2 className="font-bold text-lg text-red-500 ">
                Select Time slot
              </h2>
              <div onClick={()=>setBookBotton(true)} class="grid grid-cols-8 gap-3 mt-8">
                {
                  data?.slots.map((time)=> time.booked == false && (
                    < >
                    <input
                      onChange={(e) => {
                        setSlot(e.target.value);
                      }}
                      id="red-radio"
                      type="radio"
                      value={time.slot}
                      name="colored-radio"
                      class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="red-radio"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {time.slot+":00"}
                    </label>
                  </>
                  ))
                
                }
              </div>

              <div className="flex mt-10 justify-end gap-3">
                <button
                onClick={handleNext}
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Back
                </button>
                {bookButton &&<button
                onClick={handleSubmit}
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Book
                </button>}
              </div>
            </div>
          </div>)}
        </>
      )}
    </>
  );
}
