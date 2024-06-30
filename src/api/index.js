// Auth
export const loginApi = () => `/auth/login`;
export const registerApi = () => `/auth/register`;
export const resetPasswordApi = () => `/auth/reset-password`;
export const forgotPasswordApi = () => `/auth/forgot-password`;

// User
export const authInfoApi = () => '/user/auth';
export const userInfoApi = (userId) => `/user/${userId}`;

// Comic
export const comicInfoApi = (comicId) => `/comic/${comicId}`;
export const comicRatingApi = (comicId) => `/comic/rating/${comicId}`;

// Chapter
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
