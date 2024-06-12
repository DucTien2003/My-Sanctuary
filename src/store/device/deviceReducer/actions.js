import { WINDOWS_RESIZE, WINDOWS_SCROLL } from './constants';

export const windowsResize = () => {
  return {
    type: WINDOWS_RESIZE,
  };
};

export const windowsScroll = () => {
  return {
    type: WINDOWS_SCROLL,
  };
};
