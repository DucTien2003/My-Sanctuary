import { Link } from 'react-router-dom';

import Filter from '@/components/specific/Filter';
import DetailCard from '@/components/common/cards/DetailCard';
import PaginationComponent from '@/components/specific/PaginationComponent';
import { FaArrowLeft } from '@/utils';
import { genres } from '@/api/filter';
import { latestUpdates } from '@/api/comicList';
import { useEffect, useState } from 'react';

const NUMBER_OF_COMICS_PER_PAGE = 18;

function ComicList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRender, setDataRender] = useState([]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setDataRender(
      latestUpdates.slice(
        (currentPage - 1) * NUMBER_OF_COMICS_PER_PAGE,
        currentPage * NUMBER_OF_COMICS_PER_PAGE
      )
    );
  }, [currentPage]);

  return (
    <div className="my-20">
      <div className="container">
        {/* Direction */}
        <Link
          to="/"
          className="md-primary-border hover-md-primary-color inline-flex items-center rounded-lg px-4 py-2 font-semibold">
          <FaArrowLeft />
          <h5 className="ml-2">Back to Home</h5>
        </Link>

        {/* Filter */}
        <div className="mt-10 flex items-center justify-between">
          <h1 className="md-primary-color">Comic list</h1>
          <Filter genres={genres} />
        </div>

        {/* Display */}
        <div className="mt-10 grid grid-cols-6 gap-5 pb-12">
          {dataRender.map((comic, index) => {
            return (
              <div key={index}>
                <DetailCard comic={comic} />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex w-full justify-center">
          <PaginationComponent
            size="large"
            comicPerPage={NUMBER_OF_COMICS_PER_PAGE}
            comicList={latestUpdates}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ComicList;
