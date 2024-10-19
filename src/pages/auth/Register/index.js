import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import axiosCustom from '@/api/axiosCustom';
import AppInput from '@/components/common/AppInput';
import DefaultButton from '@/components/common/buttons/DefaultButton';

import { loginUrl } from '@/routes';
import { registerApi } from '@/api';
import { useAlertStore, alertActions } from '@/store';
import { required, minLength, requiredEmail } from '@/utils';

function Register() {
  // Provider
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  // For form
  const methods = useForm();
  const { setError } = methods;

  const onSubmit = async (data) => {
    await axiosCustom()
      .post(registerApi(), {
        username: data.username,
        password: data.password,
        email: data.email,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate('/login');

          alertDispatch(
            alertActions.showAlert('Register successfully!', 'success')
          );
        }
      })
      .catch((error) => {
        if (error.response.data.conflict === 'username') {
          setError('username', {
            type: 'manual',
            message: error.response.data.message,
          });
        } else if (error.response.data.conflict === 'email') {
          setError('email', {
            type: 'manual',
            message: error.response.data.message,
          });
        }
      });
  };

  return (
    <div className="px-8">
      <h4 className="mb-4 text-center font-semibold">Create your account</h4>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mt-1">
            <AppInput
              label="Username"
              type="text"
              placeholder="Enter username"
              id="username"
              name="Username"
              validator={[required, minLength(6)]}
            />
          </div>

          <div className="mt-1">
            <AppInput
              label="Password"
              type="password"
              placeholder="Enter password"
              id="password"
              name="Password"
              validator={[required, minLength(6)]}
            />
          </div>

          <div className="mt-1">
            <AppInput
              label="Confirm password"
              type="password"
              placeholder="Enter confirm password"
              id="confirmPassword"
              name="Confirm password"
              validator={[required]}
            />
          </div>

          <div className="mt-1">
            <AppInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              id="email"
              name="Email"
              validator={[required, requiredEmail]}
            />
          </div>

          <DefaultButton
            type="submit"
            className="w-full !rounded-lg font-semibold">
            Register
          </DefaultButton>

          <div className="my-4 text-center">
            <span>Already have an account?</span>
            <Link
              to={loginUrl()}
              className="!theme-primary-text ml-2 inline-block hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Register;
