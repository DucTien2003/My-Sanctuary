import clsx from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import UserMenu from './UserMenu';
import ThemeMode from './ThemeMode';
import SearchInput from './SearchInput';
import styles from './header.module.scss';
import AppIconButton from '@/components/common/buttons/AppIconButton';
import { homeUrl } from '@/routes';
import { MenuIcon } from '@/utils/icon';
import { useWindowScroll } from '@/hooks';
import { useSideBarStore, sideBarActions } from '@/store';

function Header({ isAbsolute = false }) {
  const isTop = useWindowScroll();
  const [sideBarState, sideBarDispatch] = useSideBarStore();

  const authInfo = localStorage.getItem('token')
    ? jwtDecode(localStorage.getItem('token'))
    : {};

  return (
    <div
      className={clsx(
        { 'theme-primary-border border-b !bg-white': !isTop },
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
              <AppIconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => sideBarDispatch(sideBarActions.showSideBar())}
                edge="start"
                className="!ml-0 !mr-2">
                <MenuIcon />
              </AppIconButton>

              {/* Logo */}
              <Link to={homeUrl()} className="flex items-center">
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

          {/* Search / User menu */}
          <div className="flex flex-1 items-center justify-end gap-4 text-end">
            {/* Search */}
            <div className="flex flex-1 justify-end">
              <SearchInput />
            </div>

            {/* Theme mode */}
            <ThemeMode />

            {/* User menu */}
            <UserMenu userInfo={authInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
