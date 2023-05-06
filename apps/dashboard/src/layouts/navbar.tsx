import { useRouter } from 'next/router';
import React from 'react';
import Avatar from 'ui/components/avatar';
import Link from 'ui/components/link';
import NavLink from 'ui/components/nav-link';
import Text from 'ui/components/text';
import Logo from '../components/common/logo';
import useUser from '../hooks/use-user';

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavbarLink({ href, children }: NavbarLinkProps) {
  const router = useRouter();

  return (
    <NavLink href={href} activeClassName="text-orange-500" isActive={router.pathname.startsWith(href)}>
      {(active) => (
        <Text weight="medium" size="sm" truncate color={active ? 'inherit' : 'default'}>
          {children}
        </Text>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const { data: user } = useUser();

  return (
    <div className="absolute top-0 inset-x-0 h-14 flex items-center border-b pl-5 pr-3">
      <div className="flex-1 flex items-center">
        <Link href="/dashboard" className="flex items-center select-none">
          <Logo width={18} height={18} />
        </Link>
        <div className="ml-5 flex space-x-5">
          <NavbarLink href="/dashboard">Home</NavbarLink>
          <NavbarLink href="/buckets">Buckets</NavbarLink>
          <NavbarLink href="/settings">Settings</NavbarLink>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar size={30} src={user.avatar} />
      </div>
    </div>
  );
}
