import Image, { ImageProps } from 'next/image';
import React from 'react';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  width: ImageProps['width'];
  height: ImageProps['height'];
  color?: 'orange' | 'black';
  className?: string;
}

export default function Logo({ width, height, className, color = 'black' }: LogoProps) {
  return (
    <Image width={width} height={height} src={`/images/logos/bucket-logo-${color}.svg`} alt="" className={className} />
  );
}
