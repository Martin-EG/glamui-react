import { Close, Search } from '../Icon';
import { FC } from 'react';

import IconButton from '../IconButton/IconButton';

import { Wrapper, Input, RightSection } from './Searchbar.styles';
import { SearchbarProps } from './Searchbar.types';

const SearchBar: FC<SearchbarProps> = ({
  placeholder,
  clearLabel = 'Clear search',
  value,
  onChange,
  onClear,
}) => {
  const placeholderText = placeholder || 'Search...';

  const rightIcon = value ? (
    <IconButton
      icon={<Close size="md" />}
      label={clearLabel}
      onClick={onClear}
    />
  ) : (
    <Search size="md" />
  );

  return (
    <Wrapper>
      <Input
        role="searchbox"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        aria-label={placeholderText}
      />

      <RightSection>{rightIcon}</RightSection>
    </Wrapper>
  );
};

export default SearchBar;
