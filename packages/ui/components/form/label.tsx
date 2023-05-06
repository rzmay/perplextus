import clsx from 'clsx';
import Badge from '../badge';
import Text, { TextProps } from '../text';

const DEFAULT_LABEL_TAG = 'label';

type LabelOwnProps = {
  for: string;
  optional?: boolean;
};

type LabelProps = LabelOwnProps &
Omit<TextProps<typeof DEFAULT_LABEL_TAG>, 'as' | keyof LabelOwnProps>;

const Label: React.FC<LabelProps> = function Label({
  className,
  for: htmlFor,
  optional,
  children,
  ...props
}) {
  return (
    <Text
      as="label"
      size="sm"
      opacity={70}
      className={clsx(className, 'block mb-1')}
      {...{ htmlFor, ...props }}
    >
      {children}
      {optional && (
        <Badge variant="gray" className="ml-1.5 -translate-y-px" size="sm">
          optional
        </Badge>
      )}
    </Text>
  );
};

export type { LabelProps };

export default Label;
