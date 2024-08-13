import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import Input from '@/components/common/Input';
import axiosCustom from '@/api/axiosCustom';

import { loginUrl } from '@/routes';
import { registerApi } from '@/api';
import { useAlertStore, alertActions } from '@/store';
import { required, minLength, confirmPassword, requiredEmail } from '@/utils';

function Register() {
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isMounted, setIsMounted] = useState(false);
  const [confirmPasswordValidators, setConfirmPasswordValidators] = useState([
    required,
  ]);

  const handleSubmit = async () => {
    const isUsernameError = usernameRef.current.checkError();
    const isPasswordError = passwordRef.current.checkError();
    const isConfirmPasswordError = confirmPasswordRef.current.checkError();
    const isEmailError = emailRef.current.checkError();

    if (
      !isUsernameError &&
      !isPasswordError &&
      !isConfirmPasswordError &&
      !isEmailError
    ) {
      await axiosCustom()
        .post(registerApi(), {
          username: usernameRef.current.getValue(),
          password: passwordRef.current.getValue(),
          email: emailRef.current.getValue(),
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
            usernameRef.current.setError(error.response.data.message);
          } else if (error.response.data.conflict === 'email') {
            emailRef.current.setError(error.response.data.message);
          }
        });
    }
  };

  useEffect(() => {
    isMounted ? handleSubmit() : setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPasswordValidators]);

  const handleClickRegister = (e) => {
    e.preventDefault();
    setConfirmPasswordValidators([
      required,
      confirmPassword(passwordRef.current.getValue()),
    ]);
  };

  return (
    <div className="px-8">
      <h4 className="mb-4 text-center font-semibold">Create your account</h4>

      <form>
        <div className="mt-1">
          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            id="username"
            name="Username"
            validator={[required, minLength(5)]}
            ref={usernameRef}
          />
        </div>

        <div className="mt-1">
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
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

        <div className="mt-1">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            id="email"
            name="Email"
            validator={[required, requiredEmail]}
            ref={emailRef}
          />
        </div>

        <button
          className="theme-primary-bg mt-4 w-full rounded-lg py-2 font-semibold"
          onClick={handleClickRegister}>
          Register
        </button>

        <div className="my-4 text-center">
          <span>Already have an account?</span>
          <Link
            to={loginUrl()}
            className="!theme-primary-text ml-2 inline-block hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
