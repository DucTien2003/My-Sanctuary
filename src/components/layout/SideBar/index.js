import Drawer from './drawers/Drawer';
import PersistentDrawer from './drawers/PersistentDrawer';
import { useDeviceStore } from '@/store';

function SideBar({ children }) {
  const [deviceState] = useDeviceStore();

  return (
    <div>
      {deviceState.isMobile ? (
        <div>
          <Drawer />
          {children}
        </div>
      ) : (
        <PersistentDrawer>{children}</PersistentDrawer>
      )}
    </div>
  );
}

export default SideBar;
