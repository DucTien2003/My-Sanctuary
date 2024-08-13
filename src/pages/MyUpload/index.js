import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axiosCustom from '@/api/axiosCustom';
import Cover from '@/components/common/Cover';
import ModalComponent from '@/components/specific/ModalComponent';
import { useGetData } from '@/hooks';
import { uploadComicUrl, editComicUrl } from '@/routes';
import { useAlertStore, alertActions } from '@/store';
import { allAuthComicsApi, comicInfoApi } from '@/api';
import {
  timeStandard,
  FaRegStar,
  FiBookmark,
  FaAngleLeft,
  FaRegComment,
  MdOutlineRemoveRedEye,
} from '@/utils';

function MyUpload() {
  const navigate = useNavigate();
  const [selectedDeleteComic, setSelectedDeleteComic] = useState(null);

  const deleteModalRef = useRef();
  const [, alertDispatch] = useAlertStore();

  const allAuthComicsApiUrl = allAuthComicsApi();
  const staticApis = useMemo(
    () => [allAuthComicsApiUrl],
    [allAuthComicsApiUrl]
  );
  const staticResponse = useGetData(staticApis);

  const handleBack = () => {
    navigate(-1);
  };

  const handleClickDelete = (comic) => {
    setSelectedDeleteComic(comic);
    deleteModalRef.current.openModal();
  };

  const handleDeleteComic = async (comicId) => {
    const comicInfoApiUrl = comicInfoApi(comicId);
    try {
      const response = await axiosCustom().delete(comicInfoApiUrl);
      if (response.data.success) {
        alertDispatch(
          alertActions.showAlert('Delete comic successfully!', 'success')
        );
      } else {
        alertDispatch(alertActions.showAlert('Delete comic failed!', 'error'));
      }
    } catch (error) {
      console.log('Error handleDeleteComic: ', error);
      alertDispatch(alertActions.showAlert('Delete comic failed!', 'error'));
    }
  };

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  if (staticResponse.error) {
    return (
      <h2 className="mt-16 w-full text-center">
        Error: {staticResponse.error}
      </h2>
    );
  }

  const [listComics] = staticResponse.initialData;

  return (
    <div className="relative mb-10 mt-20">
      <div className="container">
        <div className="flex items-center">
          <button
            className="hover-theme-white-10-bg hover-theme-primary-text mr-1 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full"
            onClick={handleBack}>
            <span>
              <FaAngleLeft className="text-xl" />
            </span>
          </button>
          <h2 className="font-semibold">Your Uploaded Comics</h2>
        </div>

        <div className="my-4 flex justify-end">
          <Link to={uploadComicUrl()}>
            <button className="theme-primary-bg mr-3 h-12 rounded-md px-10 text-lg font-medium text-white">
              Upload a new comic
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {listComics.map((comic) => (
            <div
              key={comic.id}
              className="flex rounded border border-gray-200 p-2">
              <div className="w-40">
                <Cover comic={comic} className="h-20 w-20 rounded-md" />
              </div>

              <div className="ml-5 flex flex-1 flex-col justify-between">
                <div className="">
                  <div className="">
                    {/* Name */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={uploadComicUrl(comic.name, comic.id)}
                        className="pr-2 font-medium">
                        <h4 className="limit-line-1 break-all">{comic.name}</h4>
                      </Link>

                      {/* Status */}
                      <span
                        className={clsx(
                          {
                            'border-green-400': comic.status === 'Completed',
                            'border-red-400': comic.status === 'Dropped',
                            'border-yellow-400': comic.status === 'Ongoing',
                          },
                          'ml-2 flex min-w-12 items-center justify-center rounded-md border px-3 py-2 font-medium'
                        )}>
                        <span
                          className={clsx(
                            {
                              'bg-green-400': comic.status === 'Completed',
                              'bg-red-400': comic.status === 'Dropped',
                              'bg-yellow-400': comic.status === 'Ongoing',
                            },
                            'mr-1 h-2 w-2 rounded-full'
                          )}></span>
                        <span>{comic.status}</span>
                      </span>
                    </div>

                    {/* SubName */}
                    <p className="text-sm">- {comic.subName} -</p>
                  </div>

                  {/* Description */}
                  <p className="limit-line-5 mt-2 text-sm">
                    {comic.description}
                  </p>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Publish at: {timeStandard(comic.publishAt)}</p>

                    {/* Info */}
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <FaRegStar className="text-base" />
                        <span className="ml-1 mt-1">{comic.rating}</span>
                      </div>
                      <div className="ml-3 flex items-center">
                        <MdOutlineRemoveRedEye className="text-base" />
                        <span className="ml-1 mt-1">{comic.views}</span>
                      </div>
                      <div className="ml-3 flex items-center">
                        <FaRegComment className="text-base" />
                        <span className="ml-1 mt-1">{comic.comments}</span>
                      </div>
                      <div className="ml-3 flex items-center">
                        <FiBookmark className="text-base" />
                        <span className="ml-1 mt-1">{comic.bookmarks}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center font-medium">
                    <div
                      className="theme-primary-border theme-primary-text cursor-pointer rounded border px-4 py-2"
                      onClick={() => handleClickDelete(comic)}>
                      Delete
                    </div>
                    <Link
                      to={editComicUrl(comic.id)}
                      className="theme-primary-bg theme-primary-border ml-1 cursor-pointer rounded border px-4 py-2 !text-white">
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalComponent
        title="Delete comic"
        submitTitle="Confirm"
        handleSubmit={() => handleDeleteComic(selectedDeleteComic.id)}
        ref={deleteModalRef}>
        {selectedDeleteComic && selectedDeleteComic.name && (
          <p>
            Are you sure you want to delete{' '}
            <span className="font-semibold">{selectedDeleteComic.name}</span>?
          </p>
        )}
        <p className="mt-1">Your data will be lost.</p>
      </ModalComponent>
    </div>
  );
}

export default MyUpload;