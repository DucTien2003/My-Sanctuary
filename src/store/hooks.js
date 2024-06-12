import { useContext } from 'react';

import DeviceContext from './device';
import SideBarContext from './sideBar';

export const useSideBarStore = () => {
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);

  return [sideBarState, sideBarDispatch];
};

export const useDeviceStore = () => {
  const [deviceState, deviceDispatch] = useContext(DeviceContext);

  return [deviceState, deviceDispatch];
};
