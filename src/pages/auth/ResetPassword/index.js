import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, Fragment } from 'react';

import axiosCustom from '@/api/axiosCustom';
import Input from '@/components/common/Input';

import { resetPasswordApi } from '@/api';
import { useAlertStore, alertActions } from '@/store';
import { FaAnglesLeft, required, confirmPassword } from '@/utils';

function ResetPassword() {
  const codeRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isMounted, setIsMounted] = useState(false);
  const [confirmPasswordValidators, setConfirmPasswordValidators] = useState([
    required,
  ]);

  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  const handleSubmit = async () => {
    const isCodeError = codeRef.current.checkError();
    const isPasswordError = passwordRef.current.checkError();
    const isConfirmPasswordError = confirmPasswordRef.current.checkError();

    if (!isCodeError && !isPasswordError && !isConfirmPasswordError) {
      await axiosCustom()
        .post(resetPasswordApi(), {
          verificationCode: codeRef.current.getValue(),
          password: passwordRef.current.getValue(),
        })
        .then((res) => {
          console.log('res: ', res);

          if (res.status === 200) {
            navigate('/login');

            alertDispatch(
              alertActions.showAlert('Reset password successfully!', 'success')
            );
          }
        })
        .catch((error) => {
          if (error.response.data.unauthenticated === 'code') {
            codeRef.current.setError(error.response.data.message);
          }
        });
    }
  };

  useEffect(() => {
    isMounted ? handleSubmit() : setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPasswordValidators]);

  const handleClickSubmit = (e) => {
    e.preventDefault();
    setConfirmPasswordValidators([
      required,
      confirmPassword(passwordRef.current.getValue()),
    ]);
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">Reset password</h4>

        <form>
          <div className="mt-1">
            <Input
              label="Verification code"
              type="text"
              placeholder="Enter your verification code"
              id="username"
              name="Verification code"
              validator={[required]}
              ref={codeRef}
            />
          </div>

          <div className="mt-1">
            <Input
              label="New password"
              type="password"
              placeholder="Enter new password"
              id="password"
              name="Password"
              validator={[required]}
              ref={passwordRef}
            />
          </div>

          <div className="mt-1">
            <Input
              label="Confirm password"
              type="password"
              placeholder="Enter confirm password"
              id="confirm-password"
              name="Confirm password"
              validator={confirmPasswordValidators}
              ref={confirmPasswordRef}
            />
          </div>

          <button
            className="md-primary-bg mt-5 w-full rounded-lg py-2 font-semibold"
            onClick={handleClickSubmit}>
            Confirm
          </button>
        </form>
      </div>

      <div className="flex justify-center py-4">
        <Link
          to="/login"
          className="!md-primary-color flex items-center justify-center hover:underline">
          <FaAnglesLeft />
          <span className="ml-1 mt-1">Back to Login</span>
        </Link>
      </div>
    </Fragment>
  );
}

export default ResetPassword;
