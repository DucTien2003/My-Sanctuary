import clsx from 'clsx';
import { useState } from 'react';

import { FiBookmark } from '@/utils';

function BookMarkBtn() {
  const [isBookmark, setIsMark] = useState(false);

  return (
    <span
      className={clsx(
        {
          'md-primary-bg white-color': isBookmark,
          'black-color bg-gray-200 hover:bg-gray-300': !isBookmark,
        },
        'flex h-12 min-w-12 cursor-pointer items-center justify-center rounded-md px-3'
      )}
      onClick={() => setIsMark(!isBookmark)}>
      <FiBookmark className={'text-2xl'} />
    </span>
  );
}

export default BookMarkBtn;
