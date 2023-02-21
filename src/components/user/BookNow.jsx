import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkout } from "../../helper/helperUser";
import useFetch from "../../hook/fetch.hook";
import CalenderComp from "../CalenderComp";
import RowRadioButtonsGroup from "../RowRadioButtonsGroup";
import { getSlot } from "../../helper/helperTurf";


const BookNow = ({ user }) => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [slot, setSlot] = useState();
  const { id } = useParams();
  const [data, setData] = useState();
  const [game, setGame] = useState("");
  const [{ isLoading, apiData, serverError }] = useFetch(`getOneTurf/${id}`);
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

  const handleCheckout = async () => {
    const registerCheckout = checkout(apiData?.price, slot, game, id);
    const order = await registerCheckout;
    console.log(order)
    const options = {
      key: import.meta.env.VITE_API_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "turf Play",
      description: "Turf booking Payment",
      image: 'https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697349/turfplay_logo_nojsk3.png',
      order_id: order.id,
      callback_url: `${
        import.meta.env.VITE_API_SERVER_DOMAIN
      }/api/paymentVerification/${order.amount}`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
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
  return (
    <div className="bg-white mt-7 w-full h-[900px] pt-9">
      <div className="bg-white w-[93%] pt-8 h-[600px] mx-auto grid md:grid-cols-3">
        <div className="border-solid border-r-slate-700">
          <div className="flex justify-center">
            <CalenderComp date={date} setDate={setDate} />
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
                <RowRadioButtonsGroup game={game} setGame={setGame} />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleShow}
                type="button"
                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                {!show ? "show Available Time" : "hide Available Time"}
              </button>
            </div>
            {show && (
              <div
                style={{ boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}
                className="w-[95%]  mt-10 bg-white p-3 grid grid-cols-3 md:grid-cols-6  sm:grid-col-5 gap-4"
              >
                {data &&
                  data.slots.map((s) => (
                    <div className="flex">
                      <input
                        onCanPlay={(e) => setSlot(e.target.value)}
                        value={s.slot}
                        type="checkbox"
                        className="w-5 h-5 m-2"
                      />
                      <div
                        onClick={handleClick}
                        className="cursor-pointer   border-solid border-2 border-green-500 w-[100px] h-[35px] bg-white "
                      >
                        <div className="text-center my-1">
                          <p className="text-green-500">{s.slot}:00</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {/* {show && (
              <div
                style={{ boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}
                className="w-[95%]   mt-10 bg-white p-3 grid grid-cols-3 md:grid-cols-6  sm:grid-col-5 gap-4"
              >
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                  <RadioGroup
                    
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      onChange={(e) => setGame(e.target.value)}
                      value="fives"
                      control={<Radio />}
                      label="Full Payment"
                    />
                    <FormControlLabel
                      onChange={(e) => setGame(e.target.value)}
                      value="sevens"
                      control={<Radio />}
                      label="Advance-300(pay balance on the ground)"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            )} */}

            {show && (
              <div className="flex justify-center mt-5">
                <button
                  id="checkout"
                  onClick={handleCheckout}
                  type="button"
                  class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Order Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
