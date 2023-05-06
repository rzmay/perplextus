import clsx from 'clsx';
import React from 'react';

const DEFAULT_ROOT_TAG = 'div';

interface RootOwnProps<T extends React.ElementType> {
  as?: T;
  hoverable?: boolean;
}

type RootProps<T extends React.ElementType> = RootOwnProps<T> &
Omit<React.ComponentPropsWithoutRef<T>, keyof RootOwnProps<T>>;

type RootRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

const Root = React.forwardRef(
  <T extends React.ElementType = typeof DEFAULT_ROOT_TAG>(
    {
      as, className, hoverable, ...props
    }: RootProps<T>,
    ref?: RootRef<T>,
  ): React.ReactElement | null => {
    const Tag = as || DEFAULT_ROOT_TAG;

    return (
      <Tag
        ref={ref}
        className={clsx(
          className,
          'relative bg-white border shadow-sm',
          hoverable && 'transition duration-100 hover:border-gray-700 hover:ring-1 hover:ring-gray-700',
          !className?.includes('rounded') && 'rounded-md',
        )}
        {...props}
      />
    );
  },
);

Root.displayName = 'Card';

type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

const Header: React.FC<HeaderProps> = function Header({ className, ...props }) {
  return (
    <div className={clsx(className, 'relative py-4 px-5 border-b first:rounded-t-md')} {...props} />
  );
};

Header.displayName = 'Card.Header';

type BodyProps = React.HTMLAttributes<HTMLDivElement>;

const Body: React.FC<BodyProps> = function Body({ className, ...props }) {
  return (
    <div className={clsx(className, 'p-5 first:rounded-t-md last:rounded-b-md bg-gray-50')} {...props} />
  );
};

Body.displayName = 'Card.Body';

type FooterProps = React.HTMLAttributes<HTMLDivElement>;

const Footer: React.FC<FooterProps> = function Footer({ className, ...props }) {
  return (
    <div className={clsx(className, 'relative py-4 px-5 border-t last:rounded-b-md')} {...props} />
  );
};

Footer.displayName = 'Card.Footer';

const Card = Object.assign(Root, { Header, Body, Footer });

export type {
  RootProps as CardProps,
  HeaderProps as CardHeaderProps,
  BodyProps as CardBodyProps,
  FooterProps as CardFooterProps,
};

export default Card;
