import clsx from 'clsx';

import styles from './detailCard.module.scss';
import Cover from '@/components/common/Cover';
import { FaEye, FaRegStar } from '@/utils';
import { Link } from 'react-router-dom';

function DetailCard({ comic }) {
  return (
    <div className="w-full overflow-hidden rounded shadow-2xl">
      {/* Cover */}
      <Link to="/comic" className="relative overflow-hidden rounded">
        <Cover comic={comic} />

        {/* Cover info */}
        <div
          className={clsx(
            styles['card-overlay'],
            'absolute inset-0 flex flex-col justify-end'
          )}>
          <div
            className={clsx(styles['card-info'], 'px-2 pb-2 pt-8 text-white')}>
            <div className="flex flex-col">
              <span
                className={clsx(styles['card-name'], 'text-sm font-semibold')}>
                name
              </span>
              <span
                className={clsx(
                  styles['card-author'],
                  'text-xs text-gray-300'
                )}>
                author
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Chapter */}
      <div className="flex flex-col px-2 py-1">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center">
            <FaRegStar />
            <span className="ml-1 text-xs">9999</span>
          </div>
          <div className="flex items-center">
            <FaEye className="text-sm" />
            <span className="ml-1 text-xs">9999</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-1">
          <Link
            to="/comic"
            className={clsx(
              'md-primary-color-hover inline-block text-xs font-medium'
            )}>
            Last chapter
          </Link>
          <span className="ml-1 text-xs">time</span>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
