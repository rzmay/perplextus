import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import React from 'react';
import Logo from '../components/common/logo';
import Redirect from '../components/common/redirect';
import useUser from '../hooks/use-user';

interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  const router = useRouter();
  const user = useUser();

  if (user.data) return <Redirect to={(router.query.redirect as string) || '/dashboard'} />;

  return (
    <>
      <Script
        id="authScript"
        dangerouslySetInnerHTML={{
          __html: `
            if (document.cookie && document.cookie.indexOf('authorization=') !== -1) {
              location.replace('/dashboard');
            }
         `,
        }}
      />
      <NextSeo title={title} noindex />
      <div className="min-h-screen flex flex-col justify-center items-center px-5 py-20">
        <Logo width={30} height={30} className="absolute top-10 hidden sm:block" />
        {children}
      </div>
    </>
  );
}
