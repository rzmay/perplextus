import React from 'react';
import Link from 'ui/components/link';
import Text from 'ui/components/text';
import useUser from '../../hooks/use-user';
import Logo from '../common/logo';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <div className="text-sm text-gray-700 font-medium">{children}</div>
    </Link>
  );
}

export default function Navbar() {
  const user = useUser();

  return (
    <div className="px-5 w-full">
      <div className="mx-auto max-w-5xl flex items-center justify-between">
        <div className="flex items-center h-16">
          <Logo width={18} height={18} className="mb-px mr-1.5" />
          <Text size="2xl" weight="semibold" className="select-none" color="dark">
            Zippin
          </Text>
        </div>
        <div>{user.data ? <NavLink href="/dashboard">Dashboard</NavLink> : <NavLink href="/login">Login</NavLink>}</div>
      </div>
    </div>
  );
}
