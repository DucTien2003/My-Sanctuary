import clsx from 'clsx';
import { useState } from 'react';

import axiosCustom from '@/api/axiosCustom';
import { comicBookmarkApi } from '@/api';
import { FiBookmark } from '@/utils';

function BookMarkBtn({ comicInfo }) {
  const [isBookmark, setIsMark] = useState(comicInfo.authBookmark);

  const handleBookmark = async () => {
    const comicBookmarkApiUrl = comicBookmarkApi(comicInfo.id);

    setIsMark(!isBookmark);
    if (isBookmark) {
      await axiosCustom().delete(comicBookmarkApiUrl);
    } else {
      await axiosCustom().post(comicBookmarkApiUrl);
    }
  };

  return (
    <span
      className={clsx(
        {
          'md-primary-bg white-color': isBookmark,
          'black-color bg-gray-200 hover:bg-gray-300': !isBookmark,
        },
        'flex h-12 min-w-12 cursor-pointer items-center justify-center rounded-md px-3'
      )}
      onClick={handleBookmark}>
      <FiBookmark className={'text-2xl'} />
    </span>
  );
}

export default BookMarkBtn;
