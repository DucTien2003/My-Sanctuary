import { useRef, useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosCustom from '@/api/axiosCustom';
import UploadBox from '@/components/specific/UploadBox';
import SelectInput from '@/components/common/SelectInput';
import TextFieldInput from '@/components/common/TextFieldInput';
import ModalComponent from '@/components/specific/ModalComponent';
import GenresSelector from '@/components/specific/GenresSelector';
import { createComicApi, comicInfoApi } from '@/api';
import { useAlertStore, alertActions } from '@/store';
import { requiredAcceptSpace, convertImageToFile } from '@/utils';

const statusList = [
  { value: 'Ongoing', title: 'Ongoing' },
  { value: 'Dropped', title: 'Dropped' },
  { value: 'Completed', title: 'Completed' },
];

function ComicInfo({ comicId, comicInfo = {} }) {
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  const resetModalRef = useRef();
  const updateModalRef = useRef();

  const nameRef = useRef();
  const coverRef = useRef();
  const authorRef = useRef();
  const subNameRef = useRef();
  const translatorRef = useRef();
  const descriptionRef = useRef();
  const statusSelectorRef = useRef();
  const genresSelectorRef = useRef();

  const [initialFiles, setCoverFile] = useState([]);
  useEffect(() => {
    const fetchCoverFile = async () => {
      if (comicInfo.cover) {
        const coverFile = await convertImageToFile(comicInfo.cover);
        setCoverFile([coverFile]);
      }
    };

    fetchCoverFile();
  }, [comicInfo]);

  const handleReset = () => {
    nameRef.current.resetValue();
    coverRef.current.resetFiles();
    authorRef.current.resetValue();
    subNameRef.current.resetValue();
    translatorRef.current.resetValue();
    descriptionRef.current.resetValue();
    statusSelectorRef.current.resetValue();
    genresSelectorRef.current.resetValue();
  };

  const handleUpdate = async () => {
    const isErrorName = nameRef.current.checkError();
    const isEmptyCover = coverRef.current.checkEmpty();
    const isErrorAuthor = authorRef.current.checkError();

    if (isErrorName || isEmptyCover || isErrorAuthor) {
      return null;
    }

    const name = nameRef.current.getValue();
    const cover = coverRef.current.getFiles();
    const author = authorRef.current.getValue();
    const subName = subNameRef.current.getValue();
    const status = statusSelectorRef.current.getValue();
    const genres = genresSelectorRef.current.getValue();
    const translator = translatorRef.current.getValue();
    const description = descriptionRef.current.getValue();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('author', author);
    formData.append('status', status);
    formData.append('cover', cover[0]);
    formData.append('subName', subName);
    formData.append('translator', translator);
    formData.append('description', description);
    formData.append('genres', JSON.stringify(genres));
    formData.append('oldComicInfo', JSON.stringify(comicInfo));

    const createComicApiUrl = createComicApi();
    const updateComicApiUrl = comicInfoApi(comicId);
    const response = comicId
      ? await axiosCustom().put(updateComicApiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      : await axiosCustom().post(createComicApiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

    if (response.status === 200) {
      alertDispatch(
        alertActions.showAlert('Update comic info successfully!', 'success')
      );
      navigate(-1);
    } else {
      alertDispatch(
        alertActions.showAlert('Update comic info failed!', 'error')
      );
      navigate(-1);
    }
  };

  return (
    <Fragment>
      <div className="">
        <div className="mb-6 flex items-center justify-end">
          <button
            className="theme-primary-border mr-3 h-12 rounded-md border border-solid px-10 text-lg font-medium"
            onClick={() => resetModalRef.current.openModal()}>
            Reset
          </button>

          <button
            className="theme-primary-bg h-12 rounded-md px-10 text-lg font-medium text-white"
            onClick={() => updateModalRef.current.openModal()}>
            {comicId ? 'Update' : 'Create'}
          </button>
        </div>

        <div className="flex">
          {/* Cover + Name */}
          <div className="flex w-1/4 flex-col items-center">
            <div>
              <UploadBox
                isSingle={true}
                label="Cover*"
                showName={false}
                ref={coverRef}
                initialData={comicInfo.cover ? initialFiles : []}
              />
            </div>

            <div className="mt-3 w-full">
              <TextFieldInput
                id="name"
                name="Name"
                label="Name"
                required={true}
                variant="standard"
                initialData={comicInfo.name || ''}
                validate={[requiredAcceptSpace]}
                ref={nameRef}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-wrap pl-6">
            <div className="w-1/3">
              <div className="flex flex-col gap-7">
                {/* Author */}
                <div>
                  <TextFieldInput
                    id="author"
                    name="Author"
                    label="Author"
                    size="small"
                    required={true}
                    initialData={comicInfo.author || ''}
                    validate={[requiredAcceptSpace]}
                    ref={authorRef}
                  />
                </div>
                {/* Translator */}
                <div>
                  <TextFieldInput
                    id="translator"
                    name="Translator"
                    label="Translator"
                    size="small"
                    initialData={comicInfo.translator || ''}
                    ref={translatorRef}
                  />
                </div>
                {/* Sub name */}
                <div>
                  <TextFieldInput
                    id="sub-name"
                    name="Sub-name"
                    label="Sub Name"
                    size="small"
                    initialData={comicInfo.subName || ''}
                    ref={subNameRef}
                  />
                </div>
                {/* Status */}
                <div>
                  <SelectInput
                    id="status-selector"
                    label="Status"
                    list={statusList}
                    initialValue={
                      comicInfo.status
                        ? { value: comicInfo.status, title: comicInfo.status }
                        : statusList[0]
                    }
                    size="small"
                    ref={statusSelectorRef}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col pl-2">
              {/* Description */}
              <div>
                <TextFieldInput
                  id="description"
                  name="Description"
                  label="Description"
                  initialData={comicInfo.description || ''}
                  size="small"
                  multiline={true}
                  rows={7}
                  ref={descriptionRef}
                />
              </div>
              {/* Genres */}
              <div className="mt-2">
                <GenresSelector
                  id="genres"
                  label="Genres"
                  initialData={
                    comicInfo.genres
                      ? comicInfo.genres.map((genre) => genre.id)
                      : []
                  }
                  ref={genresSelectorRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalComponent
        title="Reset comic info"
        submitTitle="Reset"
        handleSubmit={handleReset}
        ref={resetModalRef}>
        <p>Are you sure you want to reset the comic info?</p>
        <p className="mt-1">Your changes will be lost.</p>
      </ModalComponent>
      <ModalComponent
        title={comicId ? 'Update comic info' : 'Create comic info'}
        submitTitle="Confirm"
        handleSubmit={handleUpdate}
        ref={updateModalRef}>
        <p>
          {comicId
            ? 'Are you sure you want to update the comic info?'
            : 'Are you sure you want to create the comic?'}
        </p>
        <p className="mt-1">
          {comicId ? 'Your changes will be saved.' : 'The info will be saved'}
        </p>
      </ModalComponent>
    </Fragment>
  );
}

export default ComicInfo;
