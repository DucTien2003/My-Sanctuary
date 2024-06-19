import { Fragment, useRef, useState, useEffect } from 'react';

import Input from '@/components/common/Input';
import { required, confirmPassword } from '@/utils';

function ResetPassword() {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isMounted, setIsMounted] = useState(false);
  const [confirmPasswordValidators, setConfirmPasswordValidators] = useState([
    required,
  ]);

  // console.log('ResetPassword.js');

  const handleSubmit = () => {
    let isPasswordError = passwordRef.current.checkError();
    let isConfirmPasswordError = confirmPasswordRef.current.checkError();

    if (!isPasswordError && !isConfirmPasswordError) {
      console.log('ResetPassword');
    }
  };

  useEffect(() => {
    isMounted ? handleSubmit() : setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPasswordValidators]);

  const handleClickSubmit = () => {
    setConfirmPasswordValidators([
      required,
      confirmPassword(passwordRef.current.getValue()),
    ]);
  };

  return (
    <Fragment>
      <div className="px-8">
        <h4 className="mb-4 text-center font-semibold">Update password</h4>

        {/* <form action="" method="get"> */}
        <div>
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
            // type="submit"
            className="md-primary-bg my-5 w-full rounded-lg py-2 font-semibold"
            onClick={handleClickSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ResetPassword;
