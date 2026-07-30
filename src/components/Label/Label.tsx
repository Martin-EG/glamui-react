import { FC } from 'react';

import Text from '../Text';

import { StyledLabel } from './Label.styles';
import { LabelProps } from './Label.types';

const Label: FC<LabelProps> = ({ text, htmlFor }) => {
  return (
    <StyledLabel htmlFor={htmlFor}>
      <Text as="span" size="sm" weight="medium">
        {text}
      </Text>
    </StyledLabel>
  );
};

export default Label;
