import { WINDOWS_RESIZE, WINDOWS_SCROLL } from './constants';

const deviceInitialState = {
  isMobile: window.innerWidth <= 1023,
  isTop: window.scrollY === 0,
};

function deviceReducer(state, action) {
  switch (action.type) {
    case WINDOWS_RESIZE:
      return {
        isMobile: window.innerWidth <= 1023,
      };
    case WINDOWS_SCROLL:
      return {
        isTop: window.scrollY === 0,
      };
    default:
      return state;
  }
}

export { deviceReducer, deviceInitialState };
