import { faArrowRight } from '@fortawesome/pro-regular-svg-icons/faArrowRight';
import clsx from 'clsx';
import React from 'react';
import Link from './link';
import Skeleton from './skeleton';
import Text from './text';

type RootProps = React.HTMLAttributes<HTMLDivElement>;

const Root: React.FC<RootProps> = function Root({ children, className, ...props }) {
  return (
    <div className={clsx(className, 'space-y-1.5')} {...props}>
      {children}
    </div>
  );
};

Root.displayName = 'Details';

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  loading?: boolean;
  href?: string;
  placeholder?: string;
  value: string | number | boolean;
}

const Item: React.FC<ItemProps> = function Item({
  loading,
  href,
  label,
  placeholder,
  value,
  ...props
}) {
  return (
    <div className="grid grid-cols-3" {...props}>
      <Text size="sm" opacity={50}>{label}</Text>
      {loading ? <Skeleton width={120} /> : (
        <Text size="sm" opacity={value ? 70 : 30} className="col-span-2 break-words whitespace-pre-wrap">
          {/* eslint-disable-next-line no-nested-ternary */}
          {!value ? (placeholder || `No ${label.toLowerCase()}`) : (!href ? value : (
            <Link
              href={href}
              underline
              external={!href.startsWith('/')}
              icon={href.startsWith('/') ? faArrowRight : undefined}
            >
              {value}
            </Link>
          ))}
        </Text>
      )}
    </div>
  );
};

Item.displayName = 'Details.Item';

const Details = Object.assign(Root, { Item });

export type {
  RootProps as DetailsProps,
  ItemProps as DetailsItemProps,
};

export default Details;
