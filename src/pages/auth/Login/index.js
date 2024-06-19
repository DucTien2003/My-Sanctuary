import clsx from 'clsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useRef } from 'react';

import styles from './login.module.scss';
import Input from '@/components/common/Input';
import { required, minLength } from '@/utils';

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    let isUsernameError = usernameRef.current.checkError();
    let isPasswordError = passwordRef.current.checkError();

    if (!isUsernameError && !isPasswordError) {
      e.preventDefault();

      // Gửi thông tin đăng nhập đến server
      try {
        const response = await axios.post('/api/login', {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        });

        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        alert('Login failed');
      }
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
            type="submit"
            className="md-primary-bg mt-4 w-full rounded-lg py-1 font-semibold"
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
