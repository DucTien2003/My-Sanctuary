import { Link } from 'react-router-dom';
import { Fragment, useRef } from 'react';

import Input from '@/components/common/Input';
import { FaAnglesLeft, required, minLength } from '@/utils';

function ForgotPassword() {
  const usernameRef = useRef();

  console.log('ForgotPassword.js');

  const handleSubmit = () => {
    let isUsernameError = usernameRef.current.checkError();

    if (!isUsernameError) {
      console.log('Submit');
    }
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">
          Forgot your password?
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

          <button
            // type="submit"
            className="md-primary-bg mt-4 w-full rounded-lg py-2 font-semibold"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="flex justify-center py-4">
        <Link
          to="/login"
          className="!md-primary-color flex items-center justify-center hover:underline">
          <FaAnglesLeft />
          <span className="ml-1">Back to Login</span>
        </Link>
      </div>
    </Fragment>
  );
}

export default ForgotPassword;
