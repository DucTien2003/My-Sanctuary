import clsx from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect, useRef, useMemo } from 'react';

import CommentItem from './CommentItem';
import styles from './comment.module.scss';
import axiosCustom from '@/api/axiosCustom';
import DefaultButton from '@/components/common/buttons/DefaultButton';
import PaginationComponent from '@/components/specific/PaginationComponent';
import { isEmpty } from '@/utils';
import { useGetData } from '@/hooks';
import { commentApi, comicCommentsApi } from '@/api';

const NUMBER_OF_COMMENTS_PER_PAGE = 5;

function Comment({ comicId }) {
  const commentInputRef = useRef(null);

  const [dataRender, setDataRender] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listComments, setListComments] = useState([]);

  const comicCommentsApiUrl = comicCommentsApi(comicId);

  const staticApis = useMemo(
    () => [comicCommentsApiUrl],
    [comicCommentsApiUrl]
  );

  const staticResponse = useGetData(staticApis);

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
    if (!staticResponse.loading) {
      setListComments(staticResponse.initialData[0]);
    }
  }, [staticResponse.loading, staticResponse.initialData]);

  if (staticResponse.loading) {
    return;
  }

  const authInfo = localStorage.getItem('token')
    ? jwtDecode(localStorage.getItem('token'))
    : {};
  const isLogin = !isEmpty(authInfo);

  return (
    <div className="max-h-full py-3">
      {dataRender.length > 0 ? (
        <div>
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
      ) : (
        <div className="theme-white-10-bg theme-gray-text mx-3 mb-2 flex items-center justify-center rounded py-4 font-medium">
          Be the first one to comment?
        </div>
      )}

      {/* Comment pagination */}
      {dataRender.length > 0 ? (
        <div className="my-4 flex w-full justify-center">
          <PaginationComponent
            size="large"
            itemPerPage={NUMBER_OF_COMMENTS_PER_PAGE}
            list={listComments}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}

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
            <DefaultButton
              variant="contained"
              className="!px-8"
              onClick={handleComment}>
              Send
            </DefaultButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
