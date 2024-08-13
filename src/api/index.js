// Auth
export const loginApi = () => `/auth/login`;
export const registerApi = () => `/auth/register`;
export const resetPasswordApi = () => `/auth/reset-password`;
export const forgotPasswordApi = () => `/auth/forgot-password`;

// User
export const authInfoApi = () => '/user/auth';
export const userInfoApi = (userId) => `/user/${userId}`;

// Comic
export const createComicApi = () => `/comic`;
export const allAuthComicsApi = () => `/comic/auth`;
export const allGenresApi = () => `/comic/all-genres`;
export const comicInfoApi = (comicId) => `/comic/${comicId}`;
export const comicRatingApi = (comicId) => `/comic/rating/${comicId}`;
export const comicBookmarkApi = (comicId) => `/comic/bookmark/${comicId}`;
export const listComicsApi = ({
  limit = 0,
  orderBy = 'publish_at',
  ascending = false,
  page = 0,
}) =>
  `/comic/list-comics?page=${page}&limit=${limit}&orderBy=${orderBy}&ascending=${ascending}`;

// Chapter
export const createChapterApi = () => `/chapter`;
export const chapterInfoApi = (chapterId) => `/chapter/${chapterId}`;
export const chapterImagesApi = (chapterId) =>
  `/chapter/all-images/${chapterId}`;
export const updateChapterViewsApi = (chapterId) =>
  `/chapter/update-views/${chapterId}`;
export const comicChaptersApi = (comicId) =>
  `/chapter/comic-chapters/${comicId}`;

// Comment
export const commentApi = () => `/comment`;
export const comicCommentsApi = (comicId) =>
  `/comment/comic-comments/${comicId}`;
export const replyCommentApi = (parentId) =>
  `/comment/reply-comment/${parentId}`;
export const likeDislikeCommentApi = (commentId, likeDislike) =>
  `/comment/like-dislike/${commentId}/${likeDislike}`;
export const updateLikeDislikeCommentApi = (commentId, likeDislike) =>
  `/comment/like-dislike/${commentId}/${likeDislike}`;
export const deleteLikeDislikeCommentApi = (commentId) =>
  `/comment/like-dislike/${commentId}`;
