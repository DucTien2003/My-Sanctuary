import { useReducer, useEffect } from 'react';

import DeviceContext from './device';
import SideBarContext from './sideBar';
import { windowsResize, windowsScroll } from './device/deviceReducer/actions';
import {
  deviceReducer,
  deviceInitialState,
} from './device/deviceReducer/reducer';
import {
  sideBarReducer,
  sideBarInitialState,
} from './sideBar/sideBarReducer/reducer';

function Provider({ children }) {
  // SideBar State
  const [sideBarState, sideBarDispatch] = useReducer(
    sideBarReducer,
    sideBarInitialState
  );

  // Check Device
  const [deviceState, deviceDispatch] = useReducer(
    deviceReducer,
    deviceInitialState
  );

  useEffect(() => {
    const handleResize = () => {
      deviceDispatch(windowsResize());
    };

    const handleScroll = () => {
      deviceDispatch(windowsScroll());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <DeviceContext.Provider value={[deviceState, deviceDispatch]}>
      <SideBarContext.Provider value={[sideBarState, sideBarDispatch]}>
        {children}
      </SideBarContext.Provider>
    </DeviceContext.Provider>
  );
}

export default Provider;
