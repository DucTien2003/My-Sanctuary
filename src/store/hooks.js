import { useContext } from 'react';

import SideBarContext from './sideBar';

export const useSideBarStore = () => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);

  return [sideBarState, sideBarDispatch];
};
