import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetData } from '@/hooks';
import { FaAngleLeft } from '@/utils';
import { comicInfoApi, comicChaptersApi } from '@/api';

import ComicInfo from './ComicInfo';
import ChaptersInfo from './ChaptersInfo';

function UploadComic() {
  const navigate = useNavigate();
  const { comicId } = useParams();

  const comicInfoApiUrl = comicInfoApi(comicId);
  const comicChaptersApiUrl = comicChaptersApi(comicId);
  const staticApis = useMemo(
    () => (comicId ? [comicInfoApiUrl, comicChaptersApiUrl] : []),
    [comicId, comicInfoApiUrl, comicChaptersApiUrl]
  );
  const staticResponse = useGetData(staticApis);

  const handleBack = () => {
    navigate(-1);
  };

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  const [comicInfo, listChapters] = comicId
    ? staticResponse.initialData
    : [{}, []];

  return (
    <div className="container mb-96 mt-20">
      <div className="flex items-center">
        <button
          className="hover-theme-white-10-bg hover-theme-primary-text mr-1 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full"
          onClick={handleBack}>
          <span>
            <FaAngleLeft className="text-xl" />
          </span>
        </button>
        <h2 className="font-medium">Comic detail</h2>
      </div>

      <ComicInfo comicId={comicId} comicInfo={comicInfo} />

      {comicId && (
        <ChaptersInfo comicInfo={comicInfo} listChapters={listChapters} />
      )}
    </div>
  );
}

export default UploadComic;