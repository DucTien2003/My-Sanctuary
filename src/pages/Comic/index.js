import clsx from 'clsx';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import Rating from './Rating';
import BookMarkBtn from './BookmarkBtn';
import styles from './comic.module.scss';
import axiosCustom from '@/api/axiosCustom';
import Cover from '@/components/common/Cover';
import Swiper from '@/components/specific/Swiper';
import Comment from '@/components/specific/Comment';
import { useGetData } from '@/hooks';
import { latestUpdates } from '@/api/home';
import { formatPath, timeAgo } from '@/utils';
import { comicInfoApi, comicChaptersApi, updateChapterViewsApi } from '@/api';
import {
  FaRegStar,
  FiBookmark,
  FaRegComment,
  MdOutlineRemoveRedEye,
} from '@/utils';

const comic = {
  id: 1,
  name: 'Okamigun × Heisotsu',
  subName: 'Female Commander × Soldier',
  author: 'Itsuki Keiichi',
  status: 'Ongoing',
  rating: 9.5,
  bookmarks: 99,
  views: 9999,
  translator: 'MangaDex',
  genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance'],
  descriptions: [
    'At age 13, the genius wizard Rin embarked on a journey with Lista and the hero party to defeat the great evil known as “the Abyss,” which sought to plunge the world into chaos. But as the battle grew more intense, Rin’s body succumbed to the dark poison of the Abyss, putting his life in grave danger.',
    'With the words “I’ll come back,” Rin’s soul entered a forced dormancy, only to reawaken 300 years later as a noble boy. Starting his second life in a peaceful world, Rin discovers that on one side of the world, the destined forces of darkness are beginning to stir once more.',
  ],
  comments: [
    {
      id: 1,
      idUser: 2,
      content: 'This is a great comic!',
      likes: 10,
      dislikes: 2,
      chapter: 3,
      isLike: false,
      isDislike: false,
      date: '2021-10-10T10:00:00',
    },
    {
      id: 2,
      idUser: 3,
      content: 'I love this comic so much!',
      likes: 1203,
      dislikes: 20,
      chapter: 0,
      isLike: false,
      isDislike: false,
      date: '2021-10-10T10:00:00',
    },
    {
      id: 3,
      idUser: 21,
      content: 'Wowwwww',
      likes: 12,
      dislikes: 0,
      chapter: 10,
      isLike: false,
      isDislike: false,
      date: '2021-10-10T10:00:00',
    },
  ],
  chapters: [
    {
      id: 3,
      name: 'Chapter 3',
      views: 1249,
      comments: 3,
      date: '2021-10-10',
    },
    {
      id: 2,
      name: 'Chapter 2',
      views: 1349,
      comments: 5,
      date: '2021-10-10',
    },
    {
      id: 1,
      name: 'Chapter 1',
      views: 2524,
      comments: 12,
      date: '2021-10-10',
    },
  ],
};

function Comic() {
  const { comicName, comicId } = useParams();
  const isLogin = !!localStorage.getItem('token');

  const handleUpdateChapterViews = async (chapterId) => {
    const updateChapterViewsApiUrl = updateChapterViewsApi(chapterId);
    await axiosCustom().put(updateChapterViewsApiUrl);
  };

  const comicInfoApiUrl = comicInfoApi(comicId);
  const comicChaptersApiUrl = comicChaptersApi(comicId);

  const staticApis = useMemo(
    () => [comicInfoApiUrl, comicChaptersApiUrl],
    [comicInfoApiUrl, comicChaptersApiUrl]
  );
  const staticResponse = useGetData(staticApis);

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

  const [comicInfo, listChapters] = staticResponse.initialData;

  const firstChapter = listChapters[0];
  const lastChapter = listChapters[listChapters.length - 1];

  return (
    <div className="relative mb-10">
      {/* Banner */}
      <div className="absolute left-0 top-0 -z-20 h-[300px] w-full overflow-hidden">
        <img
          src={comicInfo.cover}
          alt="cover"
          className={clsx(
            styles['banner-bg'],
            'w-full select-none object-cover'
          )}
        />
      </div>
      {/* Overlay */}
      <div
        className={clsx(
          styles['banner-overlay'],
          'absolute left-0 right-0 -z-10 h-[300px] w-full'
        )}></div>

      {/* Detail */}
      <div className="container flex flex-col pt-20">
        <div className="flex w-full">
          <div className="mr-5 w-[200px] shadow-lg">
            <Cover comic={comicInfo} />
          </div>

          <div className="white-color flex flex-1 flex-col">
            <div className="inline-flex flex-1 flex-col">
              {/* Name */}
              <h1 className="min-w-fit !text-6xl font-bold">
                {comicInfo.name}
              </h1>
              {/* Sub-name */}
              <span className="mt-3 text-xl">{comicInfo.subName}</span>
            </div>

            <div className="flex flex-col">
              {/* Author - Artist */}
              <span className="font-medium">{comicInfo.author}</span>
              {/* Actions */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center">
                  {/* Read */}
                  <Link
                    to={`/${formatPath(comicName)}/${comicId}/${formatPath(firstChapter.name)}/${firstChapter.id}`}>
                    <button className="md-primary-bg h-12 rounded-md px-10">
                      Start reading
                    </button>
                  </Link>
                  <Link
                    to={`/${formatPath(comicName)}/${comicId}/${formatPath(lastChapter.name)}/${lastChapter.id}`}>
                    <button className="md-primary-bg ml-2 h-12 rounded-md px-10">
                      Latest chapter
                    </button>
                  </Link>
                  {isLogin && (
                    <div className="flex items-center">
                      {/* Rating */}
                      <div className="ml-2">
                        <Rating
                          comicId={comicId}
                          authRating={comicInfo.authRating}
                        />
                      </div>
                      {/* Bookmark */}
                      <div className="ml-2">
                        <BookMarkBtn comicInfo={comicInfo} />
                      </div>
                    </div>
                  )}
                </div>
                {/* Status */}
                <span
                  className={clsx(
                    {
                      'border-green-400': comicInfo.status === 'Completed',
                      'border-red-400': comicInfo.status === 'Dropped',
                      'border-yellow-400': comicInfo.status === 'Ongoing',
                    },
                    'black-color ml-2 flex h-12 min-w-12 items-center justify-center rounded-md border  px-3 font-medium'
                  )}>
                  <span className="mr-3">Status: </span>
                  <span
                    className={clsx(
                      {
                        'bg-green-400': comicInfo.status === 'Completed',
                        'bg-red-400': comicInfo.status === 'Dropped',
                        'bg-yellow-400': comicInfo.status === 'Ongoing',
                      },
                      'mr-1 h-2 w-2 rounded-full'
                    )}></span>
                  <span>{comicInfo.status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[220px] mt-8">
          {/* Translator */}
          {comicInfo.translator && (
            <div className="flex items-center font-medium">
              <span className="mr-1">Translator:</span>
              <span>{comicInfo.translator}</span>
            </div>
          )}

          {/* Info index */}
          <div className="mt-2 flex items-center">
            <div className="md-primary-color flex cursor-pointer items-center">
              <FaRegStar className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">{comicInfo.rating}</span>
            </div>
            <div className="ml-5 flex cursor-pointer items-center">
              <FiBookmark className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">{comicInfo.bookmarks}</span>
            </div>
            <div className="ml-5 flex cursor-pointer items-center">
              <FaRegComment className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">{comicInfo.comments}</span>
            </div>
            <div className="ml-5 flex cursor-pointer items-center">
              <MdOutlineRemoveRedEye className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">{comicInfo.views}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="mt-2 flex flex-wrap">
            {comicInfo.genres.map((genre, index) => (
              <span
                key={index}
                className="md-primary-border md-primary-color mr-2 mt-2 cursor-pointer rounded-md px-3 py-1">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Description - Chapter - Comment */}
        <div className="flex">
          <div className="w-7/12">
            {/* Description */}
            <div className="my-10">
              {comic.descriptions.map((description, index) => {
                return (
                  <p key={index} className="mt-4">
                    {description}
                  </p>
                );
              })}
            </div>

            {/* Chapter */}
            <div>
              <h3
                className={clsx(
                  styles['header-box'],
                  'px-4 py-2 text-2xl font-semibold'
                )}>
                Chapters
              </h3>
              <div
                className={clsx(
                  styles['body-box'],
                  'md-primary-border max-h-[500px] overflow-y-auto border-opacity-10'
                )}>
                {listChapters.map((chapter, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/${formatPath(comicName)}/${comicId}/${formatPath(chapter.name)}/${chapter.id}`}
                      onClick={() => {
                        handleUpdateChapterViews(chapter.id);
                      }}
                      className={clsx(
                        styles['item-chapter'],
                        styles['item-box'],
                        'flex cursor-pointer items-center justify-between px-4 py-2'
                      )}>
                      <span className="text-lg">{chapter.name}</span>

                      {/* Comment - View - Release date */}
                      <div className="flex flex-col items-center">
                        <div className="flex">
                          <span className="ml-3 flex items-center">
                            <FaRegComment className="mr-1" />
                            {chapter.comments}
                          </span>
                          <span className="ml-3 flex items-center">
                            <MdOutlineRemoveRedEye className="mr-1" />
                            {chapter.views}
                          </span>
                        </div>
                        <span className="mt-1 w-full text-end text-sm">
                          {timeAgo(chapter.updateAt)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="ml-5 mt-10 max-h-full flex-1">
            <h3
              className={clsx(
                styles['header-box'],
                'px-4 py-2 text-2xl font-semibold'
              )}>
              Comments
            </h3>
            <Comment comicId={comicInfo.id} />
          </div>
        </div>
      </div>

      {/* Suggest */}
      <div className="container mt-20">
        <h3 className="mb-3 text-2xl font-semibold">You may also like</h3>
        <div>
          <Swiper
            comicList={latestUpdates}
            numberOfSlides={5}
            gap={20}
            cardType="description"
          />
        </div>
      </div>
    </div>
  );
}

export default Comic;
