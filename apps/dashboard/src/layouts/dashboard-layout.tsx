import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import React from 'react';
import Redirect from '../components/common/redirect';
import useUser from '../hooks/use-user';
import Navbar from './navbar';

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const user = useUser();

  if (user.error?.response.status === 401) {
    document.cookie =
      'authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return (
      <Redirect
        to={{ pathname: '/login', query: { redirect: router.asPath } }}
      />
    );
  }

  if (!user.data) return <div />;

  return (
    <>
      <Script
        id="authScript"
        dangerouslySetInnerHTML={{
          __html: `
            if (!document.cookie || document.cookie.indexOf('authorization=') === -1) {
              location.replace('/login?redirect=' + encodeURIComponent(location.pathname + location.search));
            }
         `,
        }}
      />
      <NextSeo title={title} noindex />
      <div className="relative flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 min-h-full pt-12">
          <main className="flex-1 relative py-10 px-5 md:px-10 max-w-5xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
