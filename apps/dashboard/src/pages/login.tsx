import React from 'react';
import Divider from 'ui/components/divider';
import Link from 'ui/components/link';
import Text from 'ui/components/text';
import EmailLogin from '../components/login/email-login';
import GoogleLogin from '../components/login/google-login';
import AuthLayout from '../layouts/auth-layout';

const Login = function Login() {
  return (
    <div>
      <Text size="3xl" weight="semibold" color="dark">
        Welcome back
      </Text>
      <div className="mt-8 max-w-xs space-y-5">
        <GoogleLogin />
        <Divider text="or" />
        <EmailLogin />
        <div>
          <Text as="p" size="sm" align="center">
            Don't have an account?{' '}
            <Link href="/signup" underline color>
              Sign up
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page) {
  return <AuthLayout title="Login | Zippin">{page}</AuthLayout>;
};

export default Login;
