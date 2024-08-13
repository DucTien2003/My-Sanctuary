import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useState, Fragment } from 'react';

import { uploadUrl, loginUrl, registerUrl } from '@/routes';
import { isEmpty } from '@/utils';
import { useDropdown } from '@/hooks';
import {
  FiUser,
  FiLogIn,
  FiLogOut,
  FiUpload,
  LuHistory,
  FaRegBell,
  FiUserPlus,
  FiBookmark,
  CiSettings,
} from '@/utils';

function UserMenu({ userInfo }) {
  const userMenuList = [
    { title: 'My profile', icon: FiUser, to: '/' },
    { title: 'My Bookmarks', icon: FiBookmark, to: '/' },
    { title: 'My History', icon: LuHistory, to: '/' },
    { title: 'Upload Comic', icon: FiUpload, to: uploadUrl() },
    { title: 'My Settings', icon: CiSettings, to: '/' },
    { title: 'Announcements', icon: FaRegBell, to: '/' },
  ];

  const [isLogin, setIsLogin] = useState(!isEmpty(userInfo));

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
  };

  const { isShowDropdown, dropdownRef, setIsShowDropdown } = useDropdown();

  return (
    <div
      ref={dropdownRef}
      className="relative flex justify-center text-black"
      onClick={() => setIsShowDropdown(!isShowDropdown)}>
      <span>
        <img
          src={
            isLogin && userInfo.avatar
              ? userInfo.avatar
              : require('@/assets/images/user-avatar-1.png')
          }
          alt="user avatar"
          className="theme-white-10-bg ml-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
        />
      </span>

      <div
        className={clsx(
          { flex: isShowDropdown, hidden: !isShowDropdown },
          'theme-white-10-bg absolute right-0 top-full min-w-64 flex-col rounded p-2 shadow-lg'
        )}>
        {/* avatar */}
        <Link
          to="/"
          className="hover-theme-white-20-bg theme-primary-border cursor-pointer rounded border-b py-2">
          <div className="text-center">
            <img
              src={
                isLogin && userInfo.avatar
                  ? userInfo.avatar
                  : require('@/assets/images/user-avatar-1.png')
              }
              alt="avatar"
              className="mx-auto w-32 rounded-full"
            />
            <h3 className="mt-2 font-semibold">
              {isLogin && userInfo.name ? userInfo.name : 'Guest'}
            </h3>
          </div>
        </Link>

        {/* Options */}
        <div className="flex flex-col">
          {isLogin ? (
            <Fragment>
              {userMenuList.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded px-4 py-3">
                    <Icon className="mr-2" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}

              <Link
                to={loginUrl()}
                className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded px-4 py-3"
                onClick={handleLogOut}>
                <FiLogOut className="mr-2" />
                <span>Sign out</span>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                to={loginUrl()}
                className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded px-4 py-3">
                <FiLogIn className="mr-2" />
                <span>Login</span>
              </Link>
              <Link
                to={registerUrl()}
                className="hover-theme-white-20-bg hover-theme-primary-text flex w-full items-center rounded px-4 py-3">
                <FiUserPlus className="mr-2" />
                <span>Register</span>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
