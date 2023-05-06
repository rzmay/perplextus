import clsx from 'clsx';
import React from 'react';

interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'width' | 'height'> {
  width?: number | `${string}rem`;
  height?: number | `${string}rem`;
  rounded?: boolean;
  squared?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = function Skeleton({
  height,
  rounded = false,
  squared = false,
  width,
  ...props
}) {
  return (
    <span
      className={clsx('h-full bg-gray-400 opacity-20 inline-block w-full', {
        'rounded-full': rounded,
        'rounded-none': squared,
        rounded: !rounded && !squared,
      })}
      style={{
        backgroundSize: '200px 100%',
        lineHeight: 1,
        width,
        height,
      }}
      {...props}
    >
      &zwnj;
    </span>
  );
};

export default Skeleton;
