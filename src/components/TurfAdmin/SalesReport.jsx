import React, { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import useFetch from "../../hook/fetch.hook";
import { useParams } from "react-router-dom";
import { getOrders } from "../../helper/helperTurf";

const SalesReport = () => {
  const { id } = useParams();
  const [{ isLoading, apiData, serverError }] = useFetch(
    `turfAdmin/getOrder/${id}`
  );
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(0);
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
  async function fetchData() {
    const { order, totalPages } = await getOrders(id, page);
    setData(order);
    setTotalPages(totalPages);
  }
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div
      ref={printRef}
      class="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] mx-auto mt-5 pb-16"
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-end">
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
      <div class="flex items-center justify-between pb-4  dark:bg-gray-900">
        <div>
          <div
            id="dropdownAction"
            class="z-10 hidden  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
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
              Turf Name
            </th>
            <th scope="col" class="px-6 py-3">
              costumer
            </th>
            <th scope="col" class="px-6 py-3">
              payment
            </th>
            <th scope="col" class="px-6 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              slot
            </th>
          </tr>
        </thead>
        <tbody>
          {apiData?.map(() => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                  src="https://res.cloudinary.com/dxdkwzuyr/image/upload/v1676697293/avatar_d2vzjc.png"
                  alt="Jese image"
                />
                <div class="pl-3">
                  <div class="text-base font-semibold">ljdfls</div>
                  <div class="font-normal text-gray-500">dssd</div>
                </div>
              </th>
              <td class="px-6 py-4">dfskdj</td>
              <td class="px-6 py-4">
                <div class="flex items-center">sdf</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">dsfs</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">dsfs</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
