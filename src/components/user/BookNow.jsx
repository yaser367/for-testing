import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkout } from "../../helper/helperUser";
import useFetch from "../../hook/fetch.hook";
import CalenderComp from "../CalenderComp";
import RowRadioButtonsGroup from "../RowRadioButtonsGroup";
import { getSlot } from "../../helper/helperTurf";
import { toast, Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/index";

const BookNow = ({ user }) => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(true);
  const [slot, setSlot] = useState("");
  const { id } = useParams();
  const [data, setData] = useState();
  const [game, setGame] = useState("");
  const [AvailableTime, setAvailableTime] = useState(false);
  const [{ isLoading, apiData, serverError }] = useFetch(`getOneTurf/${id}`);
  const [currentTime, setCurrentTime] = useState(0);
  const [orderView, setOrderView] = useState(false);
  const { username } = useAuthStore((state) => state.auth);
  const handleClick = () => {
    if (click === true) {
      setClick(false);
    } else {
      setClick(true);
    }
  };
  const handleShow = async () => {
    const slot = await getSlot(id, game, date);
    setData(slot);
    setShow(!show);
  };

  const handleAvailable = () => {
    setAvailableTime(true);
    const now = new Date();
    const dString = date.toLocaleDateString();
    const nowString = now.toLocaleDateString();
    if (dString === nowString) {
      setCurrentTime(now.getHours() + 1);
    } else {
      setCurrentTime(0);
    }
  };
  const handleOrderView = () => {
    setOrderView(true);
  };

  const handleCheckout = async () => {
    const registerCheckout = checkout(apiData?.price, slot, game, id , username,date);
    const {order,booking} = await registerCheckout;
    console.log(booking)
    const options = {
      key: import.meta.env.VITE_API_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "turf Play",
      description: "Turf booking Payment",
      image:
        "https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697349/turfplay_logo_nojsk3.png",
      order_id: order.id,
      callback_url: `${
        import.meta.env.VITE_API_SERVER_DOMAIN
      }/api/paymentVerification/${booking._id}/${id}`,
      prefill: {
        name: "Muhammed Yaser",
        email: "yasermuhammed367@gmail.com",
        contact: "7034943897",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    handleAvailable();
    handleShow()
    
  }, [date]);

  return (
    <div className="bg-white mt-7 w-full h-[900px] pt-9">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="bg-white w-[93%] pt-8 h-[600px] mx-auto grid md:grid-cols-3">
        <div className="border-solid border-r-slate-700">
          <div className="flex justify-center">
            <CalenderComp
              date={date}
              handleAvailable={handleAvailable}
              setDate={setDate}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col">
            <div className="">
              <p className="font-bold ml-4 md:mt-0 mt-5">
                Availability on - {date.toDateString()}
              </p>
            </div>
            <div
              style={{ boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}
              className="w-[95%]  mt-10 bg-white p-3 "
            >
              <p className="text-sm font-bold">Choose a game</p>
              <div className="mt-5">
                <RowRadioButtonsGroup
                  apiData={apiData}
                  handleAvailable={handleAvailable}
                  game={game}
                  setGame={setGame}
                />
              </div>
            </div>
            {AvailableTime && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleShow}
                  type="button"
                  class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  {!show ? "show Available Time" : "hide Available Time"}
                </button>
              </div>
            )}
            {show && (
              <div
                style={{ boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}
                className="w-[95%]  mt-10 bg-white p-3 grid grid-cols-3 md:grid-cols-6  sm:grid-col-5 gap-4"
              >
                {data &&
                  data.slots.map(
                    (s) =>
                      parseInt(s.slot) > currentTime && s.booked == false && (
                        <div className="flex">
                          <div class="inline-flex items-center">
                            <label
                              class="relative flex cursor-pointer items-center rounded-full p-3"
                              for="html"
                              data-ripple-dark="true"
                            >
                              <input
                                onChange={(e) => setSlot(e.target.value)}
                                onClick={handleOrderView}
                                value={s.slot}
                                id="html"
                                name="type"
                                type="radio"
                                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-500 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                              />
                              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-3.5 w-3.5"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                >
                                  <circle
                                    data-name="ellipse"
                                    cx="8"
                                    cy="8"
                                    r="8"
                                  ></circle>
                                </svg>
                              </div>
                            </label>
                            <label
                              class="mt-px cursor-pointer select-none font-light text-gray-700"
                              for="html"
                            >
                              {parseInt(s.slot) > currentTime && s.slot + ":00"}
                            </label>
                          </div>
                        </div>
                      )
                  )}
              </div>
            )}

            {show && (
              <div className="flex justify-center mt-5">
                {orderView && (
                  <button
                    id="checkout"
                    onClick={handleCheckout}
                    type="button"
                    class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Order Now
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
