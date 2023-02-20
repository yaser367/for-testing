import React from "react";
import BookNow from "../../components/user/BookNow";
import Navbar from "../../components/user/Navbar";
import useFetch from "../../hook/fetch.hook";

const BookNowPage = () => {
  const [{ isLoading, apiData, serverError }] = useFetch();

  return (
    <div>
      <Navbar />
      <BookNow user={apiData} />
    </div>
  );
};

export default BookNowPage;
