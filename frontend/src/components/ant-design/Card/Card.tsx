import React from 'react';
import { margin, layout, position, padding, display, flexbox, compose } from 'styled-system';
import { Card as AntCard } from 'antd';
import { CardProps as AntCardProps } from 'antd/lib/card';
import 'antd/lib/card/style/css';
import {
  styled,
  LayoutProps,
  PositionProps,
  MarginProps,
  PaddingProps,
  DisplayProps,
  FlexboxProps,
} from '@services/theme';

export type CardProps = AntCardProps & MarginProps & LayoutProps & PositionProps;
export type CardBodyProps = AntCardProps & PaddingProps & DisplayProps & FlexboxProps;

const StyledCard = styled(AntCard)(margin, layout, position);
const styledSystem = compose(padding, display, flexbox);

export const Card = (props: CardProps) => <StyledCard {...props} />;
export const CardBody = styled(AntCard)<CardBodyProps>((props) => {
  return {
    border: 'none',

    'div.ant-card-body': {
      padding: 'unset',
      ...styledSystem(props),
    },
  };
});
