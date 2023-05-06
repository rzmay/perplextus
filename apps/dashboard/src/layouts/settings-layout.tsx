import { faGear } from '@fortawesome/pro-regular-svg-icons/faGear';
import { NextSeo } from 'next-seo';
import React from 'react';
import Icon from 'ui/components/icon';
import NavLink from 'ui/components/nav-link';
import Text from 'ui/components/text';

const settingsPages = [
  {
    title: 'General',
    href: '/settings',
    icon: faGear,
  },
];

interface SettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export default function SettingsLayout({
  title,
  children,
}: SettingsLayoutProps) {
  return (
    <>
      <NextSeo title={title} noindex />
      <Text as="h1" size="3xl" weight="semibold">
        Settings
      </Text>
      <div className="mt-5 grid grid-cols-12 gap-4">
        <div className="col-span-3 space-y-2">
          {settingsPages.map(({ title, href, icon }) => (
            <NavLink
              key={href}
              href={href}
              className="block hover:bg-gray-100 px-2 py-0.5 rounded-md"
              activeClassName="bg-gray-100"
              scroll={false}
            >
              <Icon className="text-sm" icon={icon} fixedWidth />
              <span className="text-sm ml-2 font-medium">{title}</span>
            </NavLink>
          ))}
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </>
  );
}
