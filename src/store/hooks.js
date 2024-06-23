import { useContext } from 'react';

import SideBarContext from './sideBar';
import AlertContext from './alert';

export const useSideBarStore = () => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);

  return [sideBarState, sideBarDispatch];
};

export const useAlertStore = () => {
  const [alertState, alertDispatch] = useContext(AlertContext);

  return [alertState, alertDispatch];
};
