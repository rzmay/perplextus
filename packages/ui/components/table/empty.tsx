import React from 'react';
import Icon, { IconProps } from 'ui/components/icon';
import Text from 'ui/components/text';

interface EmptyProps {
  icon: IconProps['icon'];
  title: string;
  description: string;
  cta: React.ReactNode;
}

export default function Empty({ icon, title, description, cta }: EmptyProps) {
  return (
    <div className="h-100 w-100 flex items-center justify-center pt-28 px-5 md:px-10">
      <div className="max-w-sm">
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-100 border">
          <Icon icon={icon} size="lg" className="text-gray-400" />
        </div>
        <Text weight="semibold" size="2xl" className="mt-5">
          {title}
        </Text>
        <Text color="gray" className="mt-3">
          {description}
        </Text>
        <div className="mt-5">{cta}</div>
      </div>
    </div>
  );
}
