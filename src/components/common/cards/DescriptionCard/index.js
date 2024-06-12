import clsx from 'clsx';

import Cover from '@/components/common/Cover';
import styles from './descriptionCard.module.scss';

function DescriptionCard({ comic }) {
  return (
    <div className="overflow-hidden rounded shadow-2xl">
      {/* Cover */}
      <div className="relative overflow-hidden rounded">
        <Cover comic={comic} />

        {/* Cover info */}
        <div
          className={clsx(
            styles['card-overlay'],
            'absolute inset-0 flex cursor-pointer flex-col justify-between text-white'
          )}>
          {/* Description */}
          <div className="mt-2 overflow-y-auto">
            <div className={clsx(styles['description'], 'hidden gap-y-2 px-2')}>
              {comic.descriptions[0]
                ? comic.descriptions.map((desc, index) => (
                    <p key={index}>{desc}</p>
                  ))
                : 'No description'}
            </div>
          </div>

          {/* Info */}
          <div className={clsx(styles['card-info'], 'p-2')}>
            <div className="flex flex-col">
              <span className={clsx(styles['card-name'], 'font-semibold')}>
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
      </div>
    </div>
  );
}

export default DescriptionCard;
