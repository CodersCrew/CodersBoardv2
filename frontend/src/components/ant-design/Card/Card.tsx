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
export type CardBodyProps = PaddingProps & DisplayProps & FlexboxProps;

const StyledCard = styled(AntCard)(margin, layout, position);

export const Card = (props: CardProps) => <StyledCard {...props} />;
export const CardBody = styled('div')<CardBodyProps>(compose(padding, display, flexbox));
