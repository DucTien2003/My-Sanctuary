import { useState } from 'react';

import ListChapter from './ListChapter';
import UploadChapter from './UploadChapter';

function ChaptersInfo({ listChapters, comicInfo = {} }) {
  const [isUploading, setIsUploading] = useState(false);
  const [chapterUploading, setChapterUploading] = useState({});

  const handleGetImagesChapter = (chapter) => {
    setIsUploading(true);
    setChapterUploading(chapter);
  };

  const handleBackOrUploadNewChapter = () => {
    setChapterUploading({});
    setIsUploading(!isUploading);
  };

  return (
    <div>
      <h2 className="mb-8 mt-14 font-medium">Chapters</h2>

      <button
        className="theme-primary-bg h-12 rounded-md px-10 text-lg font-medium text-white"
        onClick={handleBackOrUploadNewChapter}>
        {isUploading ? 'Back' : 'Upload a new chapter'}
      </button>

      {isUploading ? (
        <UploadChapter chapter={chapterUploading} comicInfo={comicInfo} />
      ) : (
        <ListChapter
          comicInfo={comicInfo}
          listChapters={listChapters}
          handleGetImagesChapter={handleGetImagesChapter}
        />
      )}
    </div>
  );
}

export default ChaptersInfo;
