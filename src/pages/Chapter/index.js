import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import ChapterSelector from '@/components/specific/ChapterSelector';
import { chapterUrl, comicUrl } from '@/routes';
import { formatPath } from '@/utils';
import { useGetData } from '@/hooks';
import {
  comicInfoApi,
  chapterInfoApi,
  comicChaptersApi,
  chapterImagesApi,
} from '@/api';

function Chapter() {
  const { comicId, chapterId, comicName } = useParams();

  const comicInfoApiUrl = comicInfoApi(comicId);
  const chapterInfoApiUrl = chapterInfoApi(chapterId);
  const comicChaptersApiUrl = comicChaptersApi(comicId);
  const chapterImagesApiUrl = chapterImagesApi(chapterId);

  const staticApis = useMemo(
    () => [comicInfoApiUrl, comicChaptersApiUrl],
    [comicInfoApiUrl, comicChaptersApiUrl]
  );
  const dynamicApis = useMemo(
    () => [chapterInfoApiUrl, chapterImagesApiUrl],
    [chapterImagesApiUrl, chapterInfoApiUrl]
  );

  const staticResponse = useGetData(staticApis);
  const dynamicResponse = useGetData(dynamicApis);

  if (staticResponse.loading || dynamicResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }
  if (staticResponse.error || dynamicResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        {staticResponse.error || dynamicResponse.error}
      </h2>
    );
  }

  const [comicInfo, listChapters] = staticResponse.initialData;
  const [chapterInfo, listImages] = dynamicResponse.initialData;

  const isFirstChapter = chapterInfo.id === listChapters[0].id;
  const isLastChapter =
    chapterInfo.id === listChapters[listChapters.length - 1].id;

  const prevChapterUrl = isFirstChapter
    ? '/'
    : chapterUrl(
        comicName,
        comicId,
        listChapters[chapterInfo.index - 2].name,
        Number(chapterId) - 1
      );
  const nextChapterUrl = isLastChapter
    ? '/'
    : chapterUrl(
        comicName,
        comicId,
        listChapters[chapterInfo.index].name,
        Number(chapterId) + 1
      );

  return (
    <div>
      {/* Header */}
      <div className="container mt-20 pb-8">
        {/* Title */}
        <div className="flex items-center text-xl">
          <Link
            to={comicUrl(comicInfo.name, comicInfo.id)}
            className="hover-theme-primary-text theme-primary-text">
            {comicInfo.name}
          </Link>
          <span className="mx-1">-</span>
          <span>{chapterInfo.name}</span>
        </div>

        {/* Control */}
        <div className="mt-6 flex">
          {isFirstChapter ? (
            <div className="theme-border-border flex cursor-default items-center justify-center rounded px-10 font-medium">
              Previous chapter
            </div>
          ) : (
            <Link
              to={prevChapterUrl}
              className="theme-primary-border hover-theme-primary-text flex items-center justify-center rounded border px-10 font-medium">
              Previous chapter
            </Link>
          )}
          <div className="mx-3 flex-1">
            <ChapterSelector
              listChapters={listChapters}
              comicId={comicId}
              initialChapter={chapterInfo.index}
            />
          </div>
          {isLastChapter ? (
            <div className="theme-border-border flex cursor-default items-center justify-center rounded px-10 font-medium">
              Next chapter
            </div>
          ) : (
            <Link
              to={nextChapterUrl}
              className="theme-primary-border hover-theme-primary-text flex items-center justify-center rounded border px-10 font-medium">
              Next chapter
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-[1000px]">
        {listImages.map((image, index) => {
          return (
            <div key={index}>
              <img src={image.url} alt="img" className="w-full object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chapter;
