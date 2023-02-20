import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import "../../style/Carousal.module.css";

const Carousal = ({ slides }) => {
  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };
  //    removeAnimation()

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    // slideRef.current.addEventListener('mouseenter', pauseSlider)
    // slideRef.current.addEventListener('mouseleave', startSlider)
    // startSlider()
  }, []);

  let slideInterval;
  const startSlider = () => {
    setInterval(() => {
      handleNext();
    }, 3000);
  };
  const [curentind, setCurrentInd] = useState(0);

  let count = 0;
  const handleNext = () => {
    if (curentind === slides.length - 1) {
      setCurrentInd(0);
    } else {
      setCurrentInd(curentind + 1);
    }
    slideRef.current.classList.add("fade-anim");
  };

  const handlePrev = () => {
    if (curentind === 0) {
      setCurrentInd(slides.length - 1);
    } else {
      setCurrentInd(curentind - 1);
    }
    slideRef.current.classList.add("fade-anim");
  };

  return (
    <div className="w-full">
      <div className="flex justify-center  bg-slate-300 mt-6">
        <div
          ref={slideRef}
          className="carousal max-w-[1000px] select-none pt-8 "
        >
          <div className="aspect-w-16 aspect-h-9 ">
            <img
              className=" md:h-[300px] sm:h-[250px]  w-full "
              src={slides[curentind]}
              alt=""
            />
          </div>
          <div
            className="  transform -translate-y-1/2 py-2 w-full
        flex justify-center  px-3"
          >
            <button
              onClick={handlePrev}
              className="hover:bg-slate-200 rounded-full p-2 mt-10 bg-opacity-5 transition"
            >
              <GrCaretPrevious size={20} />
            </button>
            <button
              onClick={handleNext}
              className="hover:bg-slate-200 rounded-full p-2 mt-10 bg-opacity-5 transition"
            >
              {" "}
              <GrCaretNext size={20} />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
