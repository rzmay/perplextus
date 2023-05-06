import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

type IconProps = FontAwesomeIconProps;

const Icon: React.FC<IconProps> = function Icon(props) {
  return <FontAwesomeIcon {...props} />;
};

export type { IconProps };

export default Icon;
