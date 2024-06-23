import { useReducer } from 'react';

import SideBarContext from './sideBar';
import AlertContext from './alert';

import {
  sideBarReducer,
  sideBarInitialState,
} from './sideBar/sideBarReducer/reducer';

import { alertReducer, alertInitialState } from './alert/alertReducer/reducer';

function Provider({ children }) {
  // SideBar State
  const [sideBarState, sideBarDispatch] = useReducer(
    sideBarReducer,
    sideBarInitialState
  );

  // Alert State
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );

  return (
    <SideBarContext.Provider value={[sideBarState, sideBarDispatch]}>
      <AlertContext.Provider value={[alertState, alertDispatch]}>
        {children}
      </AlertContext.Provider>
    </SideBarContext.Provider>
  );
}

export default Provider;
