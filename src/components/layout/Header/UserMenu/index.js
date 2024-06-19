import clsx from 'clsx';

import { useDropdown } from '@/hooks';
import {
  FiUser,
  FiLogOut,
  LuHistory,
  FaRegBell,
  FiBookmark,
  CiSettings,
} from '@/utils';
import { Link } from 'react-router-dom';

const userMenuList = [
  { title: 'My profile', icon: FiUser, to: '/' },
  { title: 'My Bookmarks', icon: FiBookmark, to: '/' },
  { title: 'My History', icon: LuHistory, to: '/' },
  { title: 'My Settings', icon: CiSettings, to: '/' },
  { title: 'Announcements', icon: FaRegBell, to: '/' },
  { title: 'Sign out', icon: FiLogOut, to: '/login' },
];

function UserMenu() {
  const { isShowDropdown, dropdownRef, setIsShowDropdown } = useDropdown();

  return (
    <div
      ref={dropdownRef}
      className="black-color relative flex justify-center"
      onClick={() => setIsShowDropdown(!isShowDropdown)}>
      <span>
        <img
          src={require('@/assets/images/user-avatar-1.png')}
          alt="user avatar"
          className="md-accent-bg ml-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
        />
      </span>

      <div
        className={clsx(
          { flex: isShowDropdown, hidden: !isShowDropdown },
          'md-accent-bg absolute right-0 top-full rounded px-2 py-3 shadow-lg'
        )}>
        <div className="flex min-w-60 flex-col">
          {userMenuList.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.to}
                className="hover-md-accent-hover-bg hover-md-primary-color flex w-full items-center rounded px-4 py-3">
                <Icon className="mr-2" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
