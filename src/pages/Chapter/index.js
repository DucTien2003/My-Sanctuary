import { Link } from 'react-router-dom';

import ChapterSelector from '@/components/specific/ChapterSelector';

function Chapter() {
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
            <ChapterSelector initialChapter={3} />
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
        <div>
          <img
            src={require('../../assets/images/Darwins Game Chap 125 page 56.jpg')}
            alt="img"
            className="object-cover"
          />
        </div>
        <div>
          <img
            src={require('../../assets/images/Darwins Game Chap 125 page 57.jpg')}
            alt="img"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Chapter;
