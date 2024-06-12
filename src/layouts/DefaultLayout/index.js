import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';
import { StoreProvider } from '@/store';

function DefaultLayout({ headerAbsolute = false, children }) {
  return (
    <StoreProvider>
      <SideBar>
        <Header isAbsolute={headerAbsolute}></Header>
        {children}
      </SideBar>
    </StoreProvider>
  );
}

export default DefaultLayout;
