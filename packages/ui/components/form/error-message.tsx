import {
  ErrorMessage as FormikErrorMessage,
  ErrorMessageProps as FormikErrorMessageProps,
} from 'formik';

type ErrorMessageProps = FormikErrorMessageProps;

const ErrorMessage: React.FC<ErrorMessageProps> = function ErrorMessage({ className, ...props }) {
  return (
    <FormikErrorMessage {...props}>
      {(msg) => (
        <div className="mt-1 text-xs text-red-500 first-letter:uppercase">
          {msg}
        </div>
      )}
    </FormikErrorMessage>
  );
};

export type { ErrorMessageProps };

export default ErrorMessage;
