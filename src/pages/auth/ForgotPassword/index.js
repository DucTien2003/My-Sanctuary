import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useRef } from 'react';

import axiosCustom from '@/api/axiosCustom';
import Input from '@/components/common/Input';
import DefaultButton from '@/components/common/buttons/DefaultButton';
import { forgotPasswordApi } from '@/api';
import { loginUrl } from '@/routes';
import { FaAnglesLeft, required, requiredEmail } from '@/utils';

function ForgotPassword() {
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailError = emailRef.current.checkError();

    if (!isEmailError) {
      try {
        await axiosCustom()
          .post(forgotPasswordApi(), {
            email: emailRef.current.getValue(),
          })
          .then((res) => {
            if (res.status === 200) {
              navigate('/reset-password');
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response.data.unauthenticated === 'email') {
              emailRef.current.setError(error.response.data.message);
            }
          });
      } catch (error) {}
    }
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">
          Forgot your password?
        </h4>

        <form>
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

          <DefaultButton
            className="w-full !rounded-lg font-semibold"
            hoverColor="primary.contrastText"
            onClick={handleSubmit}>
            Submit
          </DefaultButton>
        </form>
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

export default ForgotPassword;
