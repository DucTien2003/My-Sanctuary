import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

function DefaultButton(props) {
  const { loading, children, ...otherProps } = props;

  const ButtonComponent = loading ? LoadingButton : Button;

  return (
    <ButtonComponent loading={loading} loadingposition="start" {...otherProps}>
      {children}
    </ButtonComponent>
  );
}

export default DefaultButton;
