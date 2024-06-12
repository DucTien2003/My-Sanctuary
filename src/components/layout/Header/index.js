import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import SearchInput from './SearchInput';
import styles from './header.module.scss';
import { MenuIcon, FaRegUserCircle } from '@/utils/icon';
import { useSideBarStore, sideBarActions, useDeviceStore } from '@/store';

function Header({ isAbsolute = false }) {
  const [sideBarState, sideBarDispatch] = useSideBarStore();
  const [deviceState] = useDeviceStore();

  return (
    <div
      className={clsx(
        { 'md-primary-border-b !bg-white': !deviceState.isTop },
        { absolute: isAbsolute, fixed: !isAbsolute },
        styles['header'],
        'left-0 right-0 top-0 z-50'
      )}>
      <div className="container">
        <div className="flex min-h-14 items-center justify-between">
          <div>
            <div
              className={clsx(
                { '!hidden': sideBarState.isShow },
                'mr-2 flex items-center py-2'
              )}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => sideBarDispatch(sideBarActions.showSideBar())}
                edge="start"
                className="!ml-0 !mr-2">
                <MenuIcon />
              </IconButton>

              <Link to="/" className="flex items-center">
                <img
                  src="https://mangadex.org/img/brand/mangadex-logo.svg"
                  alt="logo img"
                  className="mr-1"
                />
                <img
                  src="https://mangadex.org/img/brand/mangadex-wordmark.svg"
                  alt="logo text"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end text-end">
            <div className="flex flex-1 justify-end">
              <SearchInput />
            </div>
            <FaRegUserCircle
              className="md-accent-bg ml-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              color="#333"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
