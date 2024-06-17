import { useReducer } from 'react';

import SideBarContext from './sideBar';
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

  return (
    <SideBarContext.Provider value={[sideBarState, sideBarDispatch]}>
      {children}
    </SideBarContext.Provider>
  );
}

export default Provider;
