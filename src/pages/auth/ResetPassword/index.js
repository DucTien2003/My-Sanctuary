import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import axiosCustom from '@/api/axiosCustom';
import AppInput from '@/components/common/AppInput';

import DefaultButton from '@/components/common/buttons/DefaultButton';
import { loginUrl } from '@/routes';
import { resetPasswordApi } from '@/api';
import { useAlertStore, alertActions } from '@/store';
import { FaAnglesLeft, required, minLength } from '@/utils';

function ResetPassword() {
  // For form
  const methods = useForm();
  const { setError } = methods;

  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  const onSubmit = async (data) => {
    await axiosCustom()
      .post(resetPasswordApi(), {
        verificationCode: data.verificationCode,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate('/login');

          alertDispatch(
            alertActions.showAlert('Reset password successfully!', 'success')
          );
        }
      })
      .catch((error) => {
        if (error.response.data.unauthenticated === 'code') {
          setError('verificationCode', {
            type: 'manual',
            message:
              error.response.data.message || 'Verification code is incorrect',
          });
        }
      });
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">Reset password</h4>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Verification code */}
            <div className="mt-1">
              <AppInput
                label="Verification code"
                type="text"
                placeholder="Enter your verification code"
                id="verificationCode"
                name="Verification code"
                validator={[required]}
              />
            </div>

            {/* Password */}
            <div className="mt-1">
              <AppInput
                label="New password"
                type="password"
                placeholder="Enter new password"
                id="password"
                name="Password"
                validator={[required, minLength(6)]}
              />
            </div>

            {/* Confirm password */}
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

            {/* Submit button */}
            <DefaultButton
              type="submit"
              className="w-full !rounded-lg font-semibold"
              hoverColor="primary.contrastText">
              Confirm
            </DefaultButton>
          </form>
        </FormProvider>
      </div>

      <div className="flex justify-center py-4">
        <Link
          to={loginUrl()}
          className="!theme-primary-text flex items-center justify-center hover:underline">
          <FaAnglesLeft />
          <span className="ml-1 mt-1">Back to Login</span>
        </Link>
      </div>
    </Fragment>
  );
}

export default ResetPassword;
