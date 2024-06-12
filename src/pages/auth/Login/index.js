import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Fragment, useRef } from 'react';

import styles from './login.module.scss';
import Input from '@/components/common/Input';
import { required, minLength } from '@/utils';

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  console.log('Login.js');

  const handleSubmit = () => {
    let isUsernameError = usernameRef.current.checkError();
    let isPasswordError = passwordRef.current.checkError();

    if (!isUsernameError && !isPasswordError) {
      console.log('Sign in');
    }
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">
          Sign in to your account
        </h4>

        {/* <form action="" method="get"> */}
        <div>
          <div className="mt-1">
            <Input
              label="Username or email"
              type="text"
              placeholder="Enter your account"
              id="username"
              name="Username or Email"
              validator={[required, minLength(6)]}
              ref={usernameRef}
            />
          </div>

          <div className="mt-1">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              id="password"
              name="Password"
              validator={[required]}
              ref={passwordRef}
            />
          </div>

          <div className="mt-1 flex justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className={clsx(styles['remember-me'], 'cursor-pointer')}
              />
              <label htmlFor="remember-me" className="cursor-pointer  pl-2">
                Remember me
              </label>
            </div>
            <span>
              <Link
                to="/forgot-password"
                className="!md-primary-color hover:underline">
                Forgot Password?
              </Link>
            </span>
          </div>

          <button
            // type="submit"
            className="md-primary-bg mt-4 w-full rounded-lg py-1 font-semibold"
            onClick={handleSubmit}>
            Sign In
          </button>
        </div>
      </div>
      <div className={clsx(styles['login-footer'], 'mt-6 py-4 text-center')}>
        <span>New user?</span>
        <Link
          to="/register"
          className="!md-primary-color ml-2 inline-block cursor-pointer hover:underline">
          Register
        </Link>
      </div>
    </Fragment>
  );
}

export default Login;
