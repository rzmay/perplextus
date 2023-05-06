import clsx from 'clsx';
import Image, { ImageProps } from 'next/legacy/image';
import React from 'react';

interface BackgroundProps
  extends Omit<
    ImageProps,
    'layout' | 'quality' | 'objectFit' | 'objectPosition' | 'src'
  > {
  image: string;
}

const Background: React.FC<BackgroundProps> = function Background({
  image,
  className,
  ...props
}) {
  return (
    <Image
      {...props}
      layout="fill"
      quality={100}
      objectFit="cover"
      objectPosition="center"
      className={clsx(
        'absolute inset-0 overflow-hidden select-none pointer-events-none z-0',
        className
      )}
      src={image}
    />
  );
};

export default Background;
