import React, { useCallback, useEffect, useRef, useState } from "react";
import { getOrder } from "../../helper/helperUser";
import useFetch from "../../hook/fetch.hook";
import usepagination from "../../hook/pagination.hook";
import { useAuthStore } from "../../store/index";

const ShowOrders = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const [{ isLoading, apiData, serverError }] = useFetch();
  console.log(apiData);
  const [pageIndex, setPageIndex] = useState(1);
  const { loading, error, lists, hasMore } = usepagination(
    "getOrders?page=",
    pageIndex
  );
  const observer = useRef();

  const lastVendorRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entires) => {
        if (entires[0].isIntersecting && hasMore) {
          setPageIndex((prevIndx) => prevIndx + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  return (
    <div className="bg-white min-h-[720px] mt-5">
      <div>
        <p className="text-center pt-5 text-xl">Your Orders</p>
      </div>
      <div>
        <div class="flex flex-col mt-5 pb-10 overflow-scroll max-h-[600px]">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-center text-sm font-light">
                  <thead class="border-b bg-slate-300 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <tr>
                      <th scope="col" class=" px-6 py-4">
                        ORDER ID
                      </th>
                      <th scope="col" class=" px-6 py-4">
                        TURF NAME
                      </th>
                      <th scope="col" class=" px-6 py-4">
                        DATE
                      </th>
                      <th scope="col" class=" px-6 py-4">
                        TIME
                      </th>
                      <th scope="col" class=" px-6 py-4">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lists &&
                      lists.map((order, i) =>
                        lists.length === i + 1 ? (
                          <tr
                            key={i}
                            ref={lastVendorRef}
                            class="border-b dark:border-neutral-500"
                          >
                            <td class="whitespace-nowrap  px-6 py-4 font-medium">
                              {order._id}
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4">
                              {order.turfId.TurfName}
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4">
                              {order.date}
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4">{`${order.slot}:00`}</td>
                            <td class="whitespace-nowrap  px-6 py-4">
                              &#8377;{` ${order.amount}`}
                            </td>
                          </tr>
                        ) : (
                          <tr class="border-b dark:border-neutral-500">
                            <td class="whitespace-nowrap  px-6 py-4 font-medium">
                              {order._id}
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4">
                              {order.turfId.TurfName}
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4">
                              {order.date}
                            </td>
                            <td class="whitespace-nowrap  px-6 py-4">{`${order.slot}:00`}</td>
                            <td class="whitespace-nowrap  px-6 py-4">
                              &#8377;{` ${order.amount}`}
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrders;
