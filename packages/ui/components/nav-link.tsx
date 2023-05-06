import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import Link, { LinkProps } from './link';

interface NavLinkProps extends Omit<LinkProps, 'children'> {
  isActive?: boolean;
  activeClassName?: string;
  children: React.ReactNode | ((active: boolean) => React.ReactNode);
}

const NavLink: React.FC<NavLinkProps> = function NavLink({
  children,
  href,
  className,
  activeClassName,
  isActive,
  ...props
}) {
  const router = useRouter();

  if (isActive === undefined) {
    isActive = router.asPath === href || router.pathname === href || false;
  }

  return (
    <Link
      href={href}
      className={clsx(
        className,
        'focus:outline-none',
        isActive && activeClassName
      )}
      {...props}
    >
      {typeof children === 'function' ? children(isActive) : children}
    </Link>
  );
};

export default NavLink;
