import clsx from 'clsx';
import { useState, useEffect, useRef, useMemo } from 'react';

import CommentItem from './CommentItem';
import styles from './comment.module.scss';
import axiosCustom from '@/api/axiosCustom';
import PaginationComponent from '@/components/specific/PaginationComponent';
import { isEmpty } from '@/utils';
import { useGetData } from '@/hooks';
import { commentApi, authInfoApi, comicCommentsApi } from '@/api';

const NUMBER_OF_COMMENTS_PER_PAGE = 5;

function Comment({ comicId }) {
  const commentInputRef = useRef(null);

  const [dataRender, setDataRender] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listComments, setListComments] = useState([]);

  const authInfoApiUrl = authInfoApi();
  const comicCommentsApiUrl = comicCommentsApi(comicId);

  const apis = useMemo(
    () => [authInfoApiUrl, comicCommentsApiUrl],
    [authInfoApiUrl, comicCommentsApiUrl]
  );

  const { loading, initialData } = useGetData(apis);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleComment = async () => {
    const commentContent = commentInputRef.current.value;
    if (commentContent.trim() === '') {
      return;
    }

    const respond = await axiosCustom().post(commentApi(), {
      comicId: comicId,
      content: commentContent,
    });

    setListComments([respond.data, ...listComments]);

    commentInputRef.current.value = '';
  };

  useEffect(() => {
    setDataRender(
      listComments.slice(
        (currentPage - 1) * NUMBER_OF_COMMENTS_PER_PAGE,
        currentPage * NUMBER_OF_COMMENTS_PER_PAGE
      )
    );
  }, [currentPage, listComments]);

  useEffect(() => {
    if (!loading) {
      setListComments(initialData[1]);
    }
  }, [loading, initialData]);

  if (loading) {
    return;
  }

  // console.log('initialData', initialData[1]);
  const authInfo = initialData[0];
  const isLogin = !isEmpty(authInfo);

  return (
    <div className="md-primary-border max-h-full border-opacity-10 py-3">
      <div className={clsx()}>
        {dataRender.map((comment, index) => {
          return (
            <div
              key={comment.id}
              className={clsx(styles['item-box'], 'mb-2 px-3 pb-4')}>
              <CommentItem
                comment={comment}
                comicId={comicId}
                authInfo={authInfo}
                isLogin={isLogin}
              />
            </div>
          );
        })}
      </div>

      {/* Comment pagination */}
      <div className="my-4 flex w-full justify-center">
        <PaginationComponent
          size="large"
          itemPerPage={NUMBER_OF_COMMENTS_PER_PAGE}
          list={listComments}
          handlePageChange={handlePageChange}
        />
      </div>

      {/* Comment input */}
      {isLogin && (
        <div className={clsx('px-2')}>
          <textarea
            ref={commentInputRef}
            rows={3}
            type="text"
            placeholder="Write your comment..."
            className={clsx('w-full rounded-lg bg-slate-100 p-4')}
          />
          <div className="w-full text-end">
            <button
              className={clsx(
                'md-primary-bg white-color rounded px-6 py-2 font-medium'
              )}
              onClick={handleComment}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
