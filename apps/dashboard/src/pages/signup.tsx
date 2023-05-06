import React from 'react';
import Divider from 'ui/components/divider';
import Link from 'ui/components/link';
import Text from 'ui/components/text';
import EmailLogin from '../components/login/email-login';
import GoogleLogin from '../components/login/google-login';
import AuthLayout from '../layouts/auth-layout';

const Signup = function Signup() {
  return (
    <div>
      <Text size="3xl" weight="semibold" color="dark">
        Create your account
      </Text>
      <div className="mt-8 max-w-xs">
        <GoogleLogin />
        <Divider className="my-5" text="or" />
        <EmailLogin />
        <div className="mt-5">
          <Text as="p" size="sm" align="center">
            Already have an account?{' '}
            <Link href="/login" underline color>
              Log in
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

Signup.getLayout = function getLayout(page) {
  return <AuthLayout title="Sign up | Zippin">{page}</AuthLayout>;
};

export default Signup;
