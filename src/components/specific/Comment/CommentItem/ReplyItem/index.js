import clsx from 'clsx';
import { Fragment, useState } from 'react';

import axiosCustom from '@/api/axiosCustom';
import {
  likeDislikeCommentApi,
  updateLikeDislikeCommentApi,
  deleteLikeDislikeCommentApi,
} from '@/api';
import {
  timeAgo,
  FaRegComment,
  AiOutlineLike,
  AiOutlineDislike,
} from '@/utils';

function ReplyItem({ reply, isLogin, handleShowReplyInput }) {
  // Like - dislike
  const [likes, setLikes] = useState(reply.likes);
  const [isLike, setIsLike] = useState(reply.authLiked);
  const [dislikes, setDislikes] = useState(reply.dislikes);
  const [isDislike, setIsDislike] = useState(reply.authDisliked);

  const handleLike = async () => {
    if (isLogin) {
      setIsLike(!isLike);
      setLikes(isLike ? likes - 1 : likes + 1);
      if (isDislike) {
        setIsDislike(false);
        setDislikes(dislikes - 1);

        await axiosCustom().put(updateLikeDislikeCommentApi(reply.id, 1));
      } else if (isLike) {
        await axiosCustom().delete(deleteLikeDislikeCommentApi(reply.id));
      } else {
        await axiosCustom().post(likeDislikeCommentApi(reply.id, 1));
      }
    }
  };

  const handleDislike = async () => {
    if (isLogin) {
      setIsDislike(!isDislike);
      setDislikes(isDislike ? dislikes - 1 : dislikes + 1);
      if (isLike) {
        setIsLike(false);
        setLikes(likes - 1);

        axiosCustom().put(updateLikeDislikeCommentApi(reply.id, 0));
      } else if (isDislike) {
        axiosCustom().delete(deleteLikeDislikeCommentApi(reply.id));
      } else {
        axiosCustom().post(likeDislikeCommentApi(reply.id, 0));
      }
    }
  };

  return (
    <Fragment>
      <div className="mr-2">
        <img
          src={reply.user.avatar}
          alt="avatar"
          className="h-8 w-8 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className={clsx('flex flex-col')}>
          <div className="flex flex-col rounded-lg bg-slate-100 p-2">
            {/* Name user reply */}
            <div className="flex items-center">
              <span className="font-medium">{reply.user.name}</span>
            </div>

            {/* Content reply */}
            <p className="mt-1">{reply.content}</p>
          </div>

          {/* Like - Dislike - Reply */}
          <div className="mt-1 flex items-center">
            <span
              className={clsx(
                { 'theme-primary-text': isLike },
                'flex cursor-pointer items-center'
              )}
              onClick={handleLike}>
              <AiOutlineLike className="mr-1" />
              <span className="text-xs">{likes}</span>
            </span>
            <span
              className={clsx(
                { 'theme-primary-text': isDislike },
                'ml-3 flex cursor-pointer items-center'
              )}
              onClick={handleDislike}>
              <AiOutlineDislike className="mr-1" />
              <span className="text-xs">{dislikes}</span>
            </span>
            <span
              className={clsx(
                'hover-theme-primary-text ml-3 flex cursor-pointer items-center'
              )}
              onClick={() => handleShowReplyInput(reply.id)}>
              <FaRegComment className="mr-1" />
              <span className="text-xs">Reply</span>
            </span>
            <div className="ml-3 text-xs">{timeAgo(reply.publishAt)}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ReplyItem;
