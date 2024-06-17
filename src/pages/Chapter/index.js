import { Link, useParams } from 'react-router-dom';

import ChapterSelector from '@/components/specific/ChapterSelector';
import { useGetData } from '@/hooks';

function Chapter() {
  const { idChapter } = useParams();

  const apiUrl = `http://localhost:8081/api/chapter/${idChapter}`;

  const { error, loading, responseData } = useGetData(apiUrl);

  if (loading) {
    return <h1 className="mt-16 w-full text-center">Loading...</h1>;
  }

  if (error) {
    return <h2 className="mt-16 w-full text-center">Error: {error.message}</h2>;
  }

  return (
    <div>
      {/* Header */}
      <div className="md-status-grey-border-b container mt-20 pb-8">
        {/* Title */}
        <div className="flex items-center text-xl">
          <Link to="/Comic" className="md-primary-color-hover md-primary-color">
            The Great Mage of the Hero’s Party Reincarnates
          </Link>
          <span className="mx-1">-</span>
          <span>Chapter 29</span>
        </div>

        {/* Control */}
        <div className="mt-6 flex">
          <Link
            to="/chapter"
            className="md-primary-border md-primary-color-hover flex items-center justify-center rounded px-10 font-medium">
            Previous chapter
          </Link>
          <div className="mx-3 flex-1">
            <ChapterSelector
              listChapters={responseData.listChapters}
              initialChapter={responseData.chapterInfo.index}
            />
          </div>
          <Link
            to="/chapter"
            className="md-primary-border md-primary-color-hover flex items-center justify-center rounded px-10 font-medium">
            Next chapter
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-[1000px]">
        {responseData.listImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} alt="img" className="w-full object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chapter;
