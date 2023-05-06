import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/pro-regular-svg-icons/faUser';
import clsx from 'clsx';
import Image from 'next/legacy/image';
import Icon from './icon';
import Text from './text';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  border?: boolean;
  icon?: IconDefinition;
  shadow?: boolean;
  square?: boolean;
  size: number;
}

const Avatar: React.FC<AvatarProps> = function Avatar({
  border,
  icon,
  src,
  alt,
  size,
  square,
  shadow,
  className,
  ...props
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={clsx(
        className,
        'inline-block shrink-0 leading-none overflow-hidden',
        square ? 'rounded' : 'rounded-full',
        shadow && 'shadow-md',
        (border || !src) && border
      )}
      {...props}
    >
      {src ? (
        <Image
          alt={alt || ''}
          src={src}
          width={size}
          height={size}
          objectFit="contain"
        />
      ) : (
        <Text
          color="gray"
          size="sm"
          className="w-full h-full flex items-center justify-center"
        >
          <Icon icon={icon || faUser} />
        </Text>
      )}
    </div>
  );
};

export type { AvatarProps };

export default Avatar;
