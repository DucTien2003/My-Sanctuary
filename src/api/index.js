// Auth
export const loginApi = () => `/auth/login`;
export const registerApi = () => `/auth/register`;
export const resetPasswordApi = () => `auth/reset-password`;
export const forgotPasswordApi = () => `/auth/forgot-password`;

// User
export const userInfoApi = () => '/user';

// Pages
export const homePageApi = () => '/home';
export const comicPageApi = (idComic) => `/comic/${idComic}`;
export const chapterPageApi = (idChapter) => `/chapter/${idChapter}`;
