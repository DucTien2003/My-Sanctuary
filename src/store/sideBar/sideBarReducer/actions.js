import { SHOW_SIDE_BAR, HIDDEN_SIDE_BAR } from './constants';

export const showSideBar = () => {
  return {
    type: SHOW_SIDE_BAR,
  };
};

export const hiddenSideBar = () => {
  return {
    type: HIDDEN_SIDE_BAR,
  };
};
