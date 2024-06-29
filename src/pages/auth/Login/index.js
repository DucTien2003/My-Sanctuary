import clsx from 'clsx';
import axiosCustom from '@/api/axiosCustom';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useRef } from 'react';

import styles from './login.module.scss';
import Input from '@/components/common/Input';
import { loginApi } from '@/api';
import { required, minLength } from '@/utils';
import { useAlertStore, alertActions } from '@/store';

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [, alertDispatch] = useAlertStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUsernameError = usernameRef.current.checkError();
    const isPasswordError = passwordRef.current.checkError();

    if (!isUsernameError && !isPasswordError) {
      await axiosCustom()
        .post(loginApi(), {
          username: usernameRef.current.getValue(),
          password: passwordRef.current.getValue(),
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            navigate('/');

            alertDispatch(
              alertActions.showAlert('Login successfully!', 'success')
            );
          }
        })
        .catch((error) => {
          if (error.response.data.unauthenticated === 'username') {
            usernameRef.current.setError(error.response.data.message);
          } else if (error.response.data.unauthenticated === 'password') {
            passwordRef.current.setError(error.response.data.message);
          }
        });
    }
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">
          Sign in to your account
        </h4>

        <form>
          <div className="mt-1">
            <Input
              label="Username or email"
              type="text"
              placeholder="Enter your account"
              id="username"
              name="Username or Email"
              validator={[required, minLength(5)]}
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
              <label htmlFor="remember-me" className="mt-1 cursor-pointer pl-2">
                Remember me
              </label>
            </div>
            <span>
              <Link
                to="/forgot-password"
                className="!md-primary-color mt-1 hover:underline">
                Forgot Password?
              </Link>
            </span>
          </div>

          <button
            className="md-primary-bg mt-4 w-full rounded-lg py-2 font-semibold"
            onClick={handleSubmit}>
            Sign In
          </button>
        </form>
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
