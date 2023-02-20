import React from "react";

const Pagination = ({ totalPosts, postsPerpage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++) {
    pages.push(i);
  }
  return (
    <div className="m-10 flex justify-end">
      {/* <button onClick={() => setCurrentPage(page)} key={i}>
        {page}
      </button> */}
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
          <li>
            <a
              href="#"
              class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            ></a>
          </li>
          {pages.map((page, i) => {
            return (
              <li>
                <a
                  onClick={() => setCurrentPage(page)}
                  key={i}
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {page}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
