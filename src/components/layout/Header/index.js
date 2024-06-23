import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import SearchInput from './SearchInput';
import UserMenu from './UserMenu';
import styles from './header.module.scss';
import { userInfoApi } from '@/api';
import { MenuIcon } from '@/utils/icon';
import { useWindowScroll, useGetData } from '@/hooks';
import { useSideBarStore, sideBarActions } from '@/store';

function Header({ isAbsolute = false }) {
  const apiUrl = userInfoApi();
  const { loading, responseData } = useGetData(apiUrl);

  const isTop = useWindowScroll();
  const [sideBarState, sideBarDispatch] = useSideBarStore();

  if (loading) {
    return <h1 className="mt-16 w-full text-center">Loading...</h1>;
  }

  return (
    <div
      className={clsx(
        { 'md-primary-border-b !bg-white': !isTop },
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

            {/* User menu */}
            {!loading && <UserMenu userInfo={responseData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
