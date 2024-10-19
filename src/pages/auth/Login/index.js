import clsx from 'clsx';
import axiosCustom from '@/api/axiosCustom';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import styles from './login.module.scss';
import AppInput from '@/components/common/AppInput';
import DefaultButton from '@/components/common/buttons/DefaultButton';

import { loginApi } from '@/api';
import { forgotPasswordUrl, registerUrl } from '@/routes';
import { required, minLength } from '@/utils';
import { useAlertStore, alertActions } from '@/store';

function Login() {
  // Provider
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  // For form
  const methods = useForm();
  const { setError } = methods;

  const onSubmit = async (data) => {
    await axiosCustom()
      .post(loginApi(), {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
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
          setError('username', {
            type: 'manual',
            message: error.response.data.message || 'Username is incorrect',
          });
        } else if (error.response.data.unauthenticated === 'password') {
          setError('password', {
            type: 'manual',
            message: error.response.data.message || 'Password is incorrect',
          });
        }
      });
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">
          Sign in to your account
        </h4>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Username or email */}
            <div className="mt-1">
              <AppInput
                label="Username or email"
                type="text"
                placeholder="Enter your account"
                id="username"
                name="Username or Email"
                validator={[required, minLength(5)]}
              />
            </div>

            {/* Password */}
            <div className="mt-1">
              <AppInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                id="password"
                name="Password"
                validator={[required]}
              />
            </div>

            {/* Remember me / Forgot password */}
            <div className="mt-1 flex justify-between">
              {/* Remember me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className={clsx(styles['remember-me'], 'cursor-pointer')}
                />
                <label
                  htmlFor="remember-me"
                  className="mt-1 cursor-pointer pl-2">
                  Remember me
                </label>
              </div>

              {/* Forgot password */}
              <span>
                <Link
                  to={forgotPasswordUrl()}
                  className="!theme-primary-text mt-1 hover:underline">
                  Forgot Password?
                </Link>
              </span>
            </div>

            {/* Submit */}
            <DefaultButton
              type="submit"
              className="!mt-4 w-full !rounded-lg font-semibold">
              Sign In
            </DefaultButton>
          </form>
        </FormProvider>
      </div>

      <div className={clsx(styles['login-footer'], 'mt-6 py-4 text-center')}>
        <span>New user?</span>
        <Link
          to={registerUrl()}
          className="!theme-primary-text ml-2 inline-block cursor-pointer hover:underline">
          Register
        </Link>
      </div>
    </Fragment>
  );
}

export default Login;
