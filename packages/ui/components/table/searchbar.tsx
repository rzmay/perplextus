import { faSearch } from '@fortawesome/pro-regular-svg-icons/faSearch';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons/faSpinnerThird';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import Input, { InputProps } from '../form/input';
import Icon from '../icon';

interface SearchBarProps extends Omit<InputProps, 'onChange'> {
  loading: boolean;
  onChange: (v: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = function SearchBar({
  className, value, onChange, loading = false, placeholder = 'Search', ...props
}) {
  const router = useRouter();

  React.useEffect(() => {
    if (!value) return;

    if (router.query.page && router.query.page !== '1') {
      router.push({
        query: { ...router.query, page: 1 },
      }, undefined, {
        shallow: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={clsx(className, 'relative group')}>
      <Input
        name="query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
        placeholder={placeholder}
        {...props}
      />
      <div className="absolute inset-y-0 left-3 flex items-center z-20 pointer-events-none">
        <Icon
          className={clsx('text-gray-400 group-focus-within:text-gray-500', { 'animate-spin': loading })}
          icon={loading ? faSpinnerThird : faSearch}
          fixedWidth
          size="sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;
