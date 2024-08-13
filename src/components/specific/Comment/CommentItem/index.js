import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

import axiosCustom from '@/api/axiosCustom';
import ReplyItem from './ReplyItem';
import {
  replyCommentApi,
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

function CommentItem({ comment, comicId, authInfo, isLogin }) {
  const replyInputRef = useRef(null);

  // Like - dislike
  const [likes, setLikes] = useState(comment.likes);
  const [isLike, setIsLike] = useState(comment.authLiked);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [isDislike, setIsDislike] = useState(comment.authDisliked);

  // Reply
  const [replyId, setReplyId] = useState(null);
  const [isReply, setIsReply] = useState(false);
  const [isShowReplied, setIsShowReplied] = useState(false);
  const [listReplies, setListReplies] = useState(comment.replies);

  const handleLike = async () => {
    if (isLogin) {
      setIsLike(!isLike);
      setLikes(isLike ? likes - 1 : likes + 1);
      if (isDislike) {
        setIsDislike(false);
        setDislikes(dislikes - 1);

        await axiosCustom().put(updateLikeDislikeCommentApi(comment.id, 1));
      } else if (isLike) {
        await axiosCustom().delete(deleteLikeDislikeCommentApi(comment.id));
      } else {
        await axiosCustom().post(likeDislikeCommentApi(comment.id, 1));
      }
    }
  };

  const handleDislike = () => {
    if (isLogin) {
      setIsDislike(!isDislike);
      setDislikes(isDislike ? dislikes - 1 : dislikes + 1);
      if (isLike) {
        setIsLike(false);
        setLikes(likes - 1);

        axiosCustom().put(updateLikeDislikeCommentApi(comment.id, 0));
      } else if (isDislike) {
        axiosCustom().delete(deleteLikeDislikeCommentApi(comment.id));
      } else {
        axiosCustom().post(likeDislikeCommentApi(comment.id, 0));
      }
    }
  };

  const handleShowReplyInput = (commentId) => {
    setReplyId(commentId);
    setIsReply(!isReply);
  };

  const handleReplyComment = async () => {
    const commentContent = replyInputRef.current.value;
    if (commentContent.trim() === '') {
      return;
    }

    const respond = await axiosCustom().post(replyCommentApi(replyId), {
      comicId: comicId,
      content: commentContent,
    });

    setListReplies([...listReplies, respond.data]);

    replyInputRef.current.value = '';
    setIsReply(false);
    setIsShowReplied(true);
  };

  useEffect(() => {
    if (isReply && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [isReply]);

  return (
    <div className="flex">
      {/* Avatar */}
      <div>
        <img
          src={comment.user.avatar}
          alt="avatar"
          className="mr-2 h-11 w-11 rounded-full"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex flex-col rounded-lg bg-slate-100 p-2 shadow">
            {/* Name user comment */}
            <div className="flex items-center">
              <span className="font-medium">{comment.user.name}</span>
              {!!comment.chapter && (
                <span className="ml-3 text-xs text-gray-600">
                  {comment.chapter.name}
                </span>
              )}
            </div>

            {/* Content comment */}
            <p className="mt-1">{comment.content}</p>
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
              onClick={() => handleShowReplyInput(comment.id)}>
              <FaRegComment className="mr-1" />
              <span className="text-xs">Reply</span>
            </span>
            <div className="ml-3 text-xs">{timeAgo(comment.publishAt)}</div>
          </div>
        </div>

        {/* Replied comment */}
        {!!listReplies && listReplies.length > 0 && (
          <div>
            {isShowReplied ? (
              listReplies.map((reply, index) => (
                <div className="mt-4 flex" key={reply.id}>
                  <ReplyItem
                    reply={reply}
                    handleShowReplyInput={handleShowReplyInput}
                    isLogin={isLogin}
                  />
                </div>
              ))
            ) : (
              <p
                className="hover-theme-primary-text mt-3 cursor-pointer text-sm hover:underline"
                onClick={() => setIsShowReplied(true)}>
                {`View all ${listReplies.length} replies`}
              </p>
            )}
          </div>
        )}

        {/* Reply input */}
        {isLogin && isReply && (
          <div className="mt-4">
            <div className="flex">
              <div className="mr-2">
                <img
                  src={authInfo.avatar}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <textarea
                ref={replyInputRef}
                rows={2}
                type="text"
                placeholder="Write your reply..."
                className={clsx('flex-1 rounded-lg bg-slate-100 p-2')}
              />
            </div>
            <div className="mt-1 w-full text-end">
              <button
                className={clsx(
                  'theme-primary-bg rounded px-4 py-1 text-sm font-medium text-white'
                )}
                onClick={handleReplyComment}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
