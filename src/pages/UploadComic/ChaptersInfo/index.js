import { useState } from 'react';

import ListChapter from './ListChapter';
import UploadChapter from './UploadChapter';
import DefaultButton from '@/components/common/buttons/DefaultButton';

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

      <DefaultButton
        className="h-12 !rounded-md !px-10 text-lg font-medium"
        onClick={handleBackOrUploadNewChapter}>
        {isUploading ? 'Back' : 'Upload a new chapter'}
      </DefaultButton>

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
