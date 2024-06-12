import { Link } from 'react-router-dom';
import { Fragment, useRef, useState, useEffect } from 'react';

import Input from '@/components/common/Input';
import { required, minLength, confirmPassword, requiredEmail } from '@/utils';

function Register() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();

  const [isMounted, setIsMounted] = useState(false);
  const [confirmPasswordValidators, setConfirmPasswordValidators] = useState([
    required,
  ]);

  // console.log('Register.js');

  const handleSubmit = () => {
    let isUsernameError = usernameRef.current.checkError();
    let isPasswordError = passwordRef.current.checkError();
    let isConfirmPasswordError = confirmPasswordRef.current.checkError();
    let isEmailError = emailRef.current.checkError();

    if (
      !isUsernameError &&
      !isPasswordError &&
      !isConfirmPasswordError &&
      !isEmailError
    ) {
      console.log('Register');
    }
  };

  useEffect(() => {
    isMounted ? handleSubmit() : setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPasswordValidators]);

  const handleClickRegister = () => {
    setConfirmPasswordValidators([
      required,
      confirmPassword(passwordRef.current.getValue()),
    ]);
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">Create your account</h4>

        {/* <form action="" method="get"> */}
        <div>
          <div className="mt-1">
            <Input
              label="Username"
              type="text"
              placeholder="Enter username"
              id="username"
              name="Username"
              validator={[required, minLength(6)]}
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
            // type="submit"
            className="md-primary-bg mt-4 w-full rounded-lg py-1 font-semibold"
            onClick={handleClickRegister}>
            Register
          </button>

          <div className="my-4 text-center">
            <span>Already have an account?</span>
            <Link
              to="/login"
              className="!md-primary-color ml-2 inline-block hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
