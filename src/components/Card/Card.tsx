import { FC } from 'react';

import Text from '../Text/Text';
import Menu from '../Menu/Menu';

import {
  StyledCard,
  CardBody,
  CardImage,
  CardFooter,
  CardTitle,
} from './Card.styles';
import type { CardProps } from './Card.types';

const Card: FC<CardProps> = ({ title, image, body, footer, options }) => {
  const cardImage = image ? <CardImage src={image} alt={title} /> : null;
  const cardFooter = footer ? <CardFooter>{footer}</CardFooter> : null;

  const menu = options ? <Menu items={options} align="right" /> : null;

  return (
    <StyledCard $hasImage={Boolean(image)}>
      {cardImage}
      <CardBody>
        <CardTitle>
          <Text weight="bold" truncate={2}>
            {title}
          </Text>
          {menu}
        </CardTitle>
        {body}
      </CardBody>
      {cardFooter}
    </StyledCard>
  );
};

export default Card;
