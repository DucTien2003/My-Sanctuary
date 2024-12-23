import clsx from "clsx";
import { useState } from "react";

import axiosRequest from "@/api/axiosRequest";
import { comicsIdRatingApi } from "@/api";
import { FaRegStar } from "@/utils";
import { useDropdown } from "@/hooks";

const rateList = [
  { value: 10, title: "Masterpiece" },
  { value: 9, title: "Great" },
  { value: 8, title: "Very Good" },
  { value: 7, title: "Good" },
  { value: 6, title: "Fine" },
  { value: 5, title: "Average" },
  { value: 4, title: "Bad" },
  { value: 3, title: "Very bad" },
  { value: 2, title: "Horrible" },
  { value: 1, title: "Appalling" },
];

function Rating({ comicId, authRating }) {
  const { isShowDropdown, dropdownRef, setIsShowDropdown } = useDropdown();

  const [rateValue, setRateValue] = useState(authRating);

  const handleRating = async (ratingValue) => {
    // const comicRatingApiUrl = comicRatingApi(comicId);
    try {
      if (rateValue !== 0) {
        // await axiosRequest().put(comicRatingApiUrl, {
        //   rating: ratingValue,
        // });
        await axiosRequest(comicsIdRatingApi(comicId), {
          method: "PUT",
          body: { rating: ratingValue },
        });

        setRateValue(ratingValue);
      } else {
        // await axiosCustom().post(comicRatingApiUrl, {
        //   rating: ratingValue,
        // });
        await axiosRequest(comicsIdRatingApi(comicId), {
          method: "POST",
          body: { rating: ratingValue },
        });

        setRateValue(ratingValue);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleRemoveRating = async () => {
    // const comicRatingApiUrl = comicRatingApi(comicId);
    try {
      // const response = await axiosCustom().delete(comicRatingApiUrl);
      const response = await axiosRequest(comicsIdRatingApi(comicId), {
        method: "DELETE",
      });

      setRateValue(0);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex justify-center font-semibold text-black"
      onClick={() => setIsShowDropdown(!isShowDropdown)}>
      <span
        className={clsx(
          {
            "theme-primary-bg text-white": rateValue,
            "bg-gray-200 hover:bg-gray-300": !rateValue,
          },
          "flex h-12 min-w-12 cursor-pointer items-center justify-center rounded-md px-3"
        )}>
        <FaRegStar className={"text-2xl"} />
        {!!rateValue && <span className="ml-1 mt-1 text-lg ">{rateValue}</span>}
      </span>

      <div
        className={clsx(
          { flex: isShowDropdown, hidden: !isShowDropdown },
          "absolute top-full pt-2"
        )}>
        <div className="flex-col overflow-hidden rounded-md bg-gray-200">
          {rateList.map((rate) => (
            <div
              key={rate.value}
              className={clsx(
                { "theme-primary-text": rate.value === rateValue },
                "cursor-pointer rounded-md px-4 py-3 hover:bg-gray-300"
              )}
              onClick={() => handleRating(rate.value)}>
              <span>({rate.value})</span>
              <span className="ml-1">{rate.title}</span>
            </div>
          ))}
          {!!rateValue && (
            <div
              className="cursor-pointer px-4 py-3 hover:bg-gray-300"
              onClick={() => handleRemoveRating()}>
              <span>Remove Rating</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rating;
