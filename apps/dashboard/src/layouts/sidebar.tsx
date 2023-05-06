import { faCog } from '@fortawesome/pro-solid-svg-icons/faCog';
import { faFolder } from '@fortawesome/pro-solid-svg-icons/faFolder';
import { faHome } from '@fortawesome/pro-solid-svg-icons/faHome';
import React from 'react';
import Icon, { IconProps } from 'ui/components/icon';
import NavLink from 'ui/components/nav-link';
import Text from 'ui/components/text';

function SidebarLink({
  href,
  icon,
  children,
  isActive,
}: {
  href: string;
  icon: IconProps['icon'];
  isActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      href={href}
      className="relative flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md"
      activeClassName="bg-orange-100 hover:bg-orange-100 pr-10 text-orange-500"
      isActive={isActive}
    >
      {(active) => (
        <>
          <Icon
            icon={icon}
            className={active ? 'text-inherit' : 'text-gray-300'}
            size="sm"
          />
          <Text
            weight="medium"
            size="sm"
            className="ml-2 flex-1"
            truncate
            color={active ? 'inherit' : 'default'}
          >
            {children}
          </Text>
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <div className="w-64 shrink-0 border-r">
      <div className="flex-1 flex flex-col overflow-y-auto p-3">
        <SidebarLink href="/dashboard" icon={faHome}>
          Home
        </SidebarLink>
        <SidebarLink href="/buckets" icon={faFolder}>
          Files
        </SidebarLink>
        <SidebarLink href="/settings" icon={faCog}>
          Settings
        </SidebarLink>
      </div>
    </div>
  );
}
