import clsx from 'clsx';
import { useState } from 'react';

import { AiOutlineLike, AiOutlineDislike } from '@/utils';

function Comment({ comment }) {
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  const handleLike = (commentId) => {
    setIsLike(!isLike);
    setLikes(isLike ? likes - 1 : likes + 1);
    if (isDislike) {
      setIsDislike(false);
      setDislikes(dislikes - 1);
    }
  };
  const handleDislike = (commentId) => {
    setIsDislike(!isDislike);
    setDislikes(isDislike ? dislikes - 1 : dislikes + 1);
    if (isLike) {
      setIsLike(false);
      setLikes(likes - 1);
    }
  };

  return (
    <div className={clsx('flex flex-col px-4 py-2')}>
      {/* Name user comment */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Name {comment.idUser}</span>
        <span className="text-sm">Chapter {comment.chapter}</span>
      </div>

      {/* Content comment */}
      <p className="my-1">{comment.content}</p>

      {/* Like - Dislike */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span
            className={clsx(
              { 'md-primary-color': isLike },
              'flex cursor-pointer items-center'
            )}
            onClick={() => handleLike(comment.id)}>
            <AiOutlineLike className="mr-1" />
            <span className="text-sm">{likes}</span>
          </span>
          <span
            className={clsx(
              { 'md-primary-color': isDislike },
              'ml-3 flex cursor-pointer items-center'
            )}
            onClick={() => handleDislike(comment.id)}>
            <AiOutlineDislike className="mr-1" />
            <span className="text-sm">{dislikes}</span>
          </span>
        </div>
        <div className="text-sm">10 minutes ago</div>
      </div>
    </div>
  );
}

export default Comment;
