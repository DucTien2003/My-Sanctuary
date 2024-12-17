import clsx from "clsx";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import Rating from "./Rating";
import { chapterUrl } from "@/routes";
import BookMarkBtn from "./BookmarkBtn";
import styles from "./comic.module.scss";
import axiosRequest from "@/api/axiosRequest";
import Cover from "@/components/common/Cover";
import Swiper from "@/components/specific/Swiper";
import Comment from "@/components/specific/Comment";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { useGetData } from "@/hooks";
import { latestUpdates } from "@/api/home";
import { breakLine, timeAgo } from "@/utils";
import { comicsIdApi, comicsIdChaptersApi, chaptersIdViewsApi } from "@/api";
import {
  FaRegStar,
  FiBookmark,
  FaRegComment,
  MdOutlineRemoveRedEye,
} from "@/utils";

function Comic() {
  const { comicName, comicId } = useParams();
  const isLogin = !!localStorage.getItem("token");

  const handleUpdateChapterViews = async (chapterId) => {
    // const updateChapterViewsApiUrl = updateChapterViewsApi(chapterId);
    // await axiosCustom().put(updateChapterViewsApiUrl);

    await axiosRequest(chaptersIdViewsApi(chapterId), { method: "PUT" });
  };

  // const comicInfoApiUrl = comicInfoApi(comicId);
  // const comicChaptersApiUrl = comicChaptersApi(comicId);

  // const staticApis = useMemo(
  //   () => [comicInfoApiUrl, comicChaptersApiUrl],
  //   [comicInfoApiUrl, comicChaptersApiUrl]
  // );

  const staticApis = useMemo(
    () => [
      { url: comicsIdApi(comicId) },
      { url: comicsIdChaptersApi(comicId) },
    ],
    [comicId]
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

  const [comicInfo, listChapters] = staticResponse.responseData;

  const firstChapter = listChapters.chapters[0];
  const lastChapter = listChapters.chapters[listChapters.chapters.length - 1];

  return (
    <div className="relative mb-10">
      {/* Banner */}
      <div className="absolute left-0 top-0 -z-20 h-[300px] w-full overflow-hidden">
        <img
          src={comicInfo.comic.cover}
          alt="cover"
          className={clsx(
            styles["banner-bg"],
            "w-full select-none object-cover"
          )}
        />
      </div>
      {/* Overlay */}
      <div
        className={clsx(
          styles["banner-overlay"],
          "absolute left-0 right-0 -z-10 h-[300px] w-full"
        )}></div>

      {/* Detail */}
      <div className="container flex flex-col pt-20">
        <div className="flex w-full">
          <div className="mr-5 w-[200px] shadow-lg">
            <Cover comic={comicInfo.comic} />
          </div>

          <div className="flex flex-1 flex-col text-white">
            <div className="inline-flex flex-1 flex-col">
              {/* Name */}
              <h1 className="min-w-fit !text-6xl font-bold">
                {comicInfo.comic.name}
              </h1>
              {/* Sub-name */}
              <span className="mt-3 text-xl">{comicInfo.comic.subName}</span>
            </div>

            <div className="flex flex-col">
              {/* Author - Artist */}
              <span className="font-medium">{comicInfo.comic.author}</span>
              {/* Actions */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center">
                  {/* Read */}
                  <Link
                    to={chapterUrl(
                      comicName,
                      comicId,
                      firstChapter.name,
                      firstChapter.id
                    )}>
                    <DefaultButton
                      hoverColor="primary.contrastText"
                      className="h-12 !rounded-md !px-10">
                      Start reading
                    </DefaultButton>
                  </Link>
                  <Link
                    to={chapterUrl(
                      comicName,
                      comicId,
                      lastChapter.name,
                      lastChapter.id
                    )}>
                    <DefaultButton
                      hoverColor="primary.contrastText"
                      className="!ml-2 h-12 !rounded-md !px-10">
                      Latest chapter
                    </DefaultButton>
                  </Link>
                  {isLogin && (
                    <div className="flex items-center">
                      {/* Rating */}
                      <div className="ml-2">
                        <Rating
                          comicId={comicId}
                          authRating={comicInfo.comic.authRating}
                        />
                      </div>
                      {/* Bookmark */}
                      <div className="ml-2">
                        <BookMarkBtn comicInfo={comicInfo.comic} />
                      </div>
                    </div>
                  )}
                </div>
                {/* Status */}
                <span
                  className={clsx(
                    {
                      "theme-success-border":
                        comicInfo.comic.status === "completed",
                      "theme-error-border":
                        comicInfo.comic.status === "dropped",
                      "theme-warning-border":
                        comicInfo.comic.status === "ongoing",
                    },
                    "ml-2 flex h-12 min-w-12 items-center justify-center rounded-md border px-3 font-medium text-black"
                  )}>
                  <span className="mr-3">Status: </span>
                  <span
                    className={clsx(
                      {
                        "theme-success-bg":
                          comicInfo.comic.status === "completed",
                        "theme-error-bg": comicInfo.comic.status === "dropped",
                        "theme-warning-bg":
                          comicInfo.comic.status === "ongoing",
                      },
                      "mr-1 h-2 w-2 rounded-full"
                    )}></span>
                  <span>{comicInfo.comic.status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-[220px] mt-8">
          {/* Translator */}
          {comicInfo.comic.translator && (
            <div className="flex items-center font-medium">
              <span className="mr-1">Translator:</span>
              <span>{comicInfo.comic.translator}</span>
            </div>
          )}

          {/* Info */}
          <div className="mt-2 flex items-center">
            <div className="theme-primary-text flex cursor-pointer items-center">
              <FaRegStar className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">
                {comicInfo.comic.rating}
              </span>
            </div>
            <div className="ml-5 flex cursor-pointer items-center">
              <MdOutlineRemoveRedEye className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">{comicInfo.comic.views}</span>
            </div>
            <div className="ml-5 flex cursor-pointer items-center">
              <FaRegComment className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">
                {comicInfo.comic.comments}
              </span>
            </div>
            <div className="ml-5 flex cursor-pointer items-center">
              <FiBookmark className="text-2xl" />
              <span className="ml-1 mt-1 text-lg">
                {comicInfo.comic.bookmarks}
              </span>
            </div>
          </div>

          {/* Genres */}
          <div className="mt-2 flex flex-wrap">
            {comicInfo.comic.genres.map((genre, index) => (
              <span
                key={index}
                className="theme-primary-border theme-primary-text mr-2 mt-2 cursor-pointer rounded-md border px-3 py-1">
                {genre.title}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="my-10 flex flex-col">
            <h4 className="theme-border-border mb-3 border-b pb-1 font-medium">
              Summary
            </h4>
            <p className="">{breakLine(comicInfo.comic.description)}</p>
          </div>
        </div>

        {/* Chapter - Comment */}
        <div className="flex">
          <div className="w-7/12">
            {/* Chapter */}
            <h3 className="px-4 py-2 text-2xl font-semibold">Chapters</h3>
            <div className="theme-border-border max-h-[500px] overflow-y-auto border">
              {listChapters.chapters.map((chapter, index) => {
                return (
                  <Link
                    key={index}
                    to={chapterUrl(
                      comicName,
                      comicId,
                      chapter.name,
                      chapter.id
                    )}
                    onClick={() => {
                      handleUpdateChapterViews(chapter.id);
                    }}
                    className="flex cursor-pointer items-center justify-between px-4 py-2">
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
                        {timeAgo(chapter.createdAt)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Comments */}
          <div className="ml-5 max-h-full flex-1">
            <h3
              className={clsx(
                styles["header-box"],
                "px-4 py-2 text-2xl font-semibold"
              )}>
              Comments
            </h3>
            <Comment comicId={comicInfo.comic.id} />
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
