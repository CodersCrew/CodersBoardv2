import React from 'react';
import { Box } from '@components/atoms/Box';
import { Card, CardBody } from './Card';

export default {
  component: Card,
  title: 'Card',
  excludeStories: /.*Data$/,
};

export const Basic = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Card title="Default card">
      <p>Card content</p>
    </Card>
    <Card title="Default card with body">
      <CardBody>
        <p>Card content</p>
      </CardBody>
    </Card>
  </Box>
);
