import { useState, useRef, useMemo, useEffect, Fragment } from 'react';

import axiosCustom from '@/api/axiosCustom';
import UploadBox from '@/components/specific/UploadBox';
import TextFieldInput from '@/components/common/TextFieldInput';
import ModalComponent from '@/components/specific/ModalComponent';
import { useGetData } from '@/hooks/useGetData';
import { requiredAcceptSpace, convertImageToFile } from '@/utils';
import { createChapterApi, chapterInfoApi, chapterImagesApi } from '@/api';

function UploadChapter({ chapter = {}, comicInfo = {} }) {
  const indexRef = useRef();
  const imagesRef = useRef();
  const chapterNameRef = useRef();
  const resetModalRef = useRef();
  const createModalRef = useRef();

  const [imageFiles, setImageFiles] = useState([]);

  const chapterImagesApiUrl = chapterImagesApi(chapter.id);
  const staticApis = useMemo(
    () => (chapter.id ? [chapterImagesApiUrl] : []),
    [chapter.id, chapterImagesApiUrl]
  );

  const staticResponse = useGetData(staticApis);
  const [imagesChapter] = chapter.id ? staticResponse.initialData : [[]];

  useEffect(() => {
    const fetchImageFile = async () => {
      if (imagesChapter && imagesChapter.length > 0) {
        const imageFilePromises = imagesChapter.map(async (image) => {
          return await convertImageToFile(image.url);
        });

        const imageFilesResult = await Promise.all(imageFilePromises);

        setImageFiles(imageFilesResult);
      }
    };

    fetchImageFile();
  }, [imagesChapter]);

  const handleReset = () => {
    indexRef.current.resetValue();
    imagesRef.current.resetFiles();
    chapterNameRef.current.resetValue();
  };

  const handleClickCreate = () => {
    createModalRef.current.openModal();
  };

  const handleConfirm = async () => {
    const isErrorIndex = indexRef.current.checkError();
    const isEmptyImages = imagesRef.current.checkEmpty();
    const isErrorChapterName = chapterNameRef.current.checkError();

    if (isErrorIndex || isEmptyImages || isErrorChapterName) {
      return null;
    }

    const index = indexRef.current.getValue();
    const images = imagesRef.current.getFiles();
    const chapterName = chapterNameRef.current.getValue();

    const formData = new FormData();
    formData.append('index', Number(index));
    formData.append('name', chapterName);
    formData.append('comicInfo', JSON.stringify(comicInfo));
    formData.append('oldIndex', chapter.id ? chapter.index : null);
    images.map((image) => formData.append('images', image));

    const createChapterApiUrl = createChapterApi();
    const updateChapterApiUrl = chapterInfoApi(chapter.id);
    const response = chapter.id
      ? await axiosCustom().put(updateChapterApiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      : await axiosCustom().post(createChapterApiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

    if (response.data.success) {
      console.log('Success');
    } else {
      console.log('Failed');
    }
  };

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  return (
    <Fragment>
      <div className="container my-20">
        <h2 className="mb-8 mt-14 font-medium">Chapter info</h2>

        <div className="mb-6 flex items-center justify-end">
          <button
            className="theme-primary-border mr-3 h-12 rounded-md border border-solid px-10 text-lg font-medium"
            onClick={() => resetModalRef.current.openModal()}>
            Reset
          </button>

          <button
            className="theme-primary-bg h-12 rounded-md px-10 text-lg font-medium text-white"
            onClick={handleClickCreate}>
            {chapter.id ? 'Update' : 'Create'}
          </button>
        </div>

        <div className="flex gap-2">
          <div className="w-[200px]">
            <TextFieldInput
              id="index"
              name="Index"
              label="Index"
              type="number"
              min={1}
              required={true}
              initialData={chapter.index || ''}
              validate={[requiredAcceptSpace]}
              ref={indexRef}
            />
          </div>

          <TextFieldInput
            id="chapter-name"
            name="Chapter name"
            label="Chapter name"
            required={true}
            initialData={chapter.name || ''}
            validate={[requiredAcceptSpace]}
            ref={chapterNameRef}
          />
        </div>

        <h2 className="mb-8 mt-14 font-medium">Images of chapter</h2>
        <UploadBox initialData={imageFiles} ref={imagesRef} />
      </div>

      <ModalComponent
        title="Reset chapter info"
        submitTitle="Reset"
        handleSubmit={handleReset}
        ref={resetModalRef}>
        <p>Are you sure you want to reset the chapter info?</p>
        <p className="mt-1">Your data will be lost.</p>
      </ModalComponent>
      <ModalComponent
        title="Create chapter"
        submitTitle="Confirm"
        handleSubmit={handleConfirm}
        ref={createModalRef}>
        <p>
          {chapter.id ? (
            <span>Are you sure you want to update info of {chapter.name}?</span>
          ) : (
            <span>Are you sure you want to create the new chapter?</span>
          )}
        </p>
        <p className="mt-1">
          {chapter.id
            ? 'Your changes will be saved.'
            : 'The info will be saved.'}
        </p>
      </ModalComponent>
    </Fragment>
  );
}

export default UploadChapter;
