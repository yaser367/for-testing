import React, { useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiOutlineDown } from "react-icons/ai";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Featured = () => {
  const printRef = useRef();
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfwidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfwidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfwidth, pdfHeight);
    pdf.save("print.pdf");
  };
  return (
    <div ref={printRef} className=" flex-initial w-[350px]  shadow-2xl p-2">
      <div className="flex justify-between items-center ">
        <h1 className="m-2 text-lg font-bold">Total Revenue</h1>
        {/* <CgMoreVertical size={20} /> */}
        <button
          onClick={handleDownloadPdf}
          type="button"
          class=" rounded-full bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="download"
            class="w-3 mx-auto"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex p-5 flex-col items-center justify-center gap-3">
        <div className="w-[100px] h-[100px]">
          <CircularProgressbar value={70} text="70%" strokeWidth={5} />
        </div>
        <p className="font-bold text-lg text-gray-400">
          Total Sales made today
        </p>
        <p className="text-md">&#8377;23345</p>
        <p className="text-sm text-gray-400 text-center">
          Previous transactions processing.
          <br /> Last payment may not be included.
        </p>
        <div className="flex p-1 w-full justify-between ">
          <div className="">
            <p className="text-gray-400 text-center">Target</p>
            <div className="flex items-center mt-3 text-green-500">
              <KeyboardArrowUpIcon className="" />
              <div className="">&#8377;21.2k</div>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-center">Last Week</p>
            <div className="flex items-center mt-3  text-green-500">
              <KeyboardArrowUpIcon className="" />
              <div className="">&#8377;21.2k</div>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-center">Last Month</p>
            <div className="flex items-center mt-3 text-red-500">
              <AiOutlineDown className="" />
              <div className="">&#8377;21.2k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
