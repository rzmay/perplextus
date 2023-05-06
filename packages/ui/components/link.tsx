import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';
import Icon from './icon';

type LinkOwnProps = {
  href: NextLinkProps['href'];
  scroll?: NextLinkProps['scroll'];
  underline?: boolean;
  color?: boolean;
  external?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: IconProp;
};

type LinkProps = LinkOwnProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkOwnProps | 'target'
  >;

const Link = function Link({
  href,
  color,
  underline,
  className,
  external,
  children,
  icon,
  disabled,
  scroll,
  ...props
}: LinkProps) {
  return (
    <NextLink
      href={href}
      scroll={scroll}
      className={clsx(
        className,
        color && 'transition hover:underline text-blue-500',
        disabled && 'pointer-events-none',
        icon && 'inline-flex items-center',
        underline && 'hover:underline'
      )}
      target={external ? '_blank' : '_self'}
      {...props}
    >
      {children}
      {icon && <Icon icon={icon} className="ml-1.5" size="sm" />}
    </NextLink>
  );
};

export type { LinkProps };

export default Link;
