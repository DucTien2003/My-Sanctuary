import { Link, useParams } from 'react-router-dom';

import ChapterSelector from '@/components/specific/ChapterSelector';
import { formatPath } from '@/utils';
import { useGetData } from '@/hooks';
import { chapterPageApi } from '@/api';

function Chapter() {
  const { idChapter, nameComic } = useParams();

  const apiUrl = chapterPageApi(idChapter);
  const { error, loading, responseData } = useGetData(apiUrl);

  if (loading) {
    return <h1 className="mt-16 w-full text-center">Loading...</h1>;
  }
  if (error) {
    return <h2 className="mt-16 w-full text-center">{error}</h2>;
  }

  const chapterInfo = responseData.chapterInfo;
  const listChapters = responseData.listChapters;

  const isFirstChapter = chapterInfo.id === listChapters[0].id;
  const isLastChapter =
    chapterInfo.id === listChapters[listChapters.length - 1].id;

  const prevChapterUrl = isFirstChapter
    ? '/'
    : `/${nameComic}/${formatPath(listChapters[chapterInfo.index - 2].name)}/${Number(idChapter) - 1}`;
  const nextChapterUrl = isLastChapter
    ? '/'
    : `/${nameComic}/${formatPath(listChapters[chapterInfo.index].name)}/${Number(idChapter) + 1}`;

  return (
    <div>
      {/* Header */}
      <div className="md-status-grey-border-b container mt-20 pb-8">
        {/* Title */}
        <div className="flex items-center text-xl">
          <Link
            to={`/${formatPath(responseData.comicInfo.name)}/${responseData.comicInfo.id}`}
            className="hover-md-primary-color md-primary-color">
            {responseData.comicInfo.name}
          </Link>
          <span className="mx-1">-</span>
          <span>{responseData.chapterInfo.name}</span>
        </div>

        {/* Control */}
        <div className="mt-6 flex">
          {isFirstChapter ? (
            <div className="border-color-border flex cursor-default items-center justify-center rounded px-10 font-medium">
              Previous chapter
            </div>
          ) : (
            <Link
              to={prevChapterUrl}
              className="md-primary-border hover-md-primary-color flex items-center justify-center rounded px-10 font-medium">
              Previous chapter
            </Link>
          )}
          <div className="mx-3 flex-1">
            <ChapterSelector
              listChapters={responseData.listChapters}
              initialChapter={responseData.chapterInfo.index}
            />
          </div>
          {isLastChapter ? (
            <div className="border-color-border flex cursor-default items-center justify-center rounded px-10 font-medium">
              Next chapter
            </div>
          ) : (
            <Link
              to={nextChapterUrl}
              className="md-primary-border hover-md-primary-color flex items-center justify-center rounded px-10 font-medium">
              Next chapter
            </Link>
          )}
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
