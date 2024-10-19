import { Fragment, useState, useRef } from 'react';

import axiosCustom from '@/api/axiosCustom';
import { chapterInfoApi } from '@/api';
import ModalComponent from '@/components/common/ModalComponent';
import {
  reverseArray,
  timeStandard,
  MdFolderDelete,
  RiImageEditFill,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
} from '@/utils';

function ListChapter({ listChapters, handleGetImagesChapter, comicInfo = {} }) {
  const deleteModalRef = useRef();

  const [selectedDeleteChapter, setSelectedDeleteChapter] = useState(null);
  const [chapters, setChapters] = useState(listChapters);
  const [isAscending, setIsAscending] = useState(true);

  const handleChangeOrder = () => {
    setIsAscending(!isAscending);
    setChapters(reverseArray(chapters));
  };

  const handleClickDelete = (chapter) => {
    setSelectedDeleteChapter(chapter);
    deleteModalRef.current.openModal();
  };

  const handleDelete = async (chapterId) => {
    const chapterInfoApiUrl = chapterInfoApi(chapterId);
    const response = await axiosCustom().delete(chapterInfoApiUrl, {
      params: {
        comicNameMinio: comicInfo.nameMinio,
      },
    });
    if (response.data.success) {
      const newChapters = chapters.filter(
        (chapter) => chapter.id !== chapterId
      );
      setChapters(newChapters);
      console.log('Delete chapter success');
    }
  };

  return (
    <Fragment>
      <div className="mt-10 flex flex-1 flex-col border-y border-gray-200">
        <div className="flex bg-gray-50 px-5 py-3 font-medium">
          <div className="flex flex-1 items-center">
            <h5
              className="inline-flex w-[100px] cursor-pointer items-center bg-gray-50 font-medium"
              onClick={handleChangeOrder}>
              <span>Index</span>
              <span>
                {isAscending ? (
                  <FaLongArrowAltUp className="text-xs" />
                ) : (
                  <FaLongArrowAltDown className="text-xs" />
                )}
              </span>
            </h5>
            <h5 className="w-1/2">Name chapter</h5>
            <h5 className="flex-1">Publish at</h5>
          </div>
          <h5 className="w-[12%]">action</h5>
        </div>

        <div>
          {chapters.map((chapter, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center border-t border-gray-200 px-5 py-3 hover:bg-gray-100">
              <div
                className="flex flex-1 items-center"
                onClick={() => handleGetImagesChapter(chapter)}>
                <p className="w-[100px]">{chapter.index}</p>
                <p className="limit-line-1 w-1/2 break-all">{chapter.name}</p>
                <p className="flex-1">{timeStandard(chapter.createAt)}</p>
              </div>
              <div className="flex w-[12%] items-center">
                <span
                  className="flex cursor-pointer items-center rounded-full hover:underline"
                  onClick={() => handleGetImagesChapter(chapter)}>
                  <RiImageEditFill />
                  <span className="ml-1">Edit</span>
                </span>
                <span
                  className="ml-4 flex cursor-pointer items-center rounded-full hover:underline"
                  onClick={() => handleClickDelete(chapter)}>
                  <MdFolderDelete />
                  <span className="ml-1">Delete</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalComponent
        title="Delete chapter"
        submitTitle="Confirm"
        handleSubmit={() => handleDelete(selectedDeleteChapter.id)}
        ref={deleteModalRef}>
        {selectedDeleteChapter && selectedDeleteChapter.name && (
          <p>
            Are you sure you want to delete{' '}
            <span className="font-semibold">{selectedDeleteChapter.name}</span>?
          </p>
        )}
        <p className="mt-1">Your data will be lost.</p>
      </ModalComponent>
    </Fragment>
  );
}

export default ListChapter;
