import clsx from "clsx";
import { useState } from "react";

import axiosRequest from "@/api/axiosRequest";
import { comicsIdBookmarkApi } from "@/api";
import { FiBookmark } from "@/utils";

function BookMarkBtn({ comicInfo }) {
  const [isBookmark, setIsBookmark] = useState(comicInfo.authBookmark);

  const handleBookmark = async () => {
    // const comicBookmarkApiUrl = comicBookmarkApi(comicInfo.id);

    setIsBookmark(!isBookmark);
    if (isBookmark) {
      await axiosRequest(comicsIdBookmarkApi(comicInfo.id), {
        method: "DELETE",
      });
    } else {
      await axiosRequest(comicsIdBookmarkApi(comicInfo.id), { method: "POST" });
    }
  };

  return (
    <span
      className={clsx(
        {
          "theme-primary-bg text-white": isBookmark,
          "bg-gray-200 text-black hover:bg-gray-300": !isBookmark,
        },
        "flex h-12 min-w-12 cursor-pointer items-center justify-center rounded-md px-3"
      )}
      onClick={handleBookmark}>
      <FiBookmark className={"text-2xl"} />
    </span>
  );
}

export default BookMarkBtn;
