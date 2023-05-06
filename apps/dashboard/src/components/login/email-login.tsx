import { Field, Form, Formik, FormikValues } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import Button from 'ui/components/button';
import Input from 'ui/components/form/input';
import Text from 'ui/components/text';
import { login } from '../../services/auth';

export default function EmailLogin() {
  const router = useRouter();
  const [sent, setSent] = React.useState(false);

  const handleSubmit = React.useCallback(
    (values: FormikValues) => {
      login({ email: values.email }, router.query).then(() => setSent(true));
    },
    [router.query]
  );

  if (sent) {
    return (
      <Text as="div" align="center" color="gray">
        We&apos;ve sent you a temporary login link. Please check your email to
        log in.
      </Text>
    );
  }

  return (
    <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="w-full max-w-xs mx-auto">
          <div className="inline-flex text-left w-full">
            <Field
              as={Input}
              size="xl"
              name="email"
              placeholder="Email address"
              autoFocus
              type="email"
              required
            />
          </div>
          <Button
            type="submit"
            size="xl"
            className="w-full mt-3"
            loading={isSubmitting}
          >
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  );
}
