import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

import { FaRegStar } from '@/utils';

const rateList = [
  { value: 10, title: 'Masterpiece' },
  { value: 9, title: 'Great' },
  { value: 8, title: 'Very Good' },
  { value: 7, title: 'Good' },
  { value: 6, title: 'Fine' },
  { value: 5, title: 'Average' },
  { value: 4, title: 'Bad' },
  { value: 3, title: 'Very bad' },
  { value: 2, title: 'Horrible' },
  { value: 1, title: 'Appalling' },
];

function Rating() {
  const ratingRef = useRef(null);
  const [rateValue, setRateValue] = useState(0);
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ratingRef.current && !ratingRef.current.contains(event.target)) {
        setIsRating(false);
      }
    }
    if (isRating) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ratingRef, isRating]);

  return (
    <div
      ref={ratingRef}
      className="black-color relative flex justify-center font-semibold"
      onClick={() => setIsRating(!isRating)}>
      <span
        className={clsx(
          {
            'md-primary-bg white-color': rateValue,
            'bg-gray-200 hover:bg-gray-300': !rateValue,
          },
          'flex h-12 min-w-12 cursor-pointer items-center justify-center rounded-md px-3'
        )}>
        <FaRegStar className={'text-2xl'} />
        {!!rateValue && <span className="ml-1 mt-1 text-lg ">{rateValue}</span>}
      </span>

      <div
        className={clsx(
          { flex: isRating, hidden: !isRating },
          'absolute top-full pt-2'
        )}>
        <div className="flex-col overflow-hidden rounded-md bg-gray-200">
          {rateList.map((rate) => (
            <div
              key={rate.value}
              className="cursor-pointer rounded-md px-4 py-3 hover:bg-gray-300"
              onClick={() => setRateValue(rate.value)}>
              <span>({rate.value})</span>
              <span className="ml-1">{rate.title}</span>
            </div>
          ))}
          {!!rateValue && (
            <div
              className="cursor-pointer px-4 py-3 hover:bg-gray-300"
              onClick={() => setRateValue(0)}>
              <span>Remove Rating</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rating;
