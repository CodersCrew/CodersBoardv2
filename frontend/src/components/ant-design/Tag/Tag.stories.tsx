import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons/lib';
import { Box } from '@components/atoms/Box';
import { Tag } from './Tag';

export default {
  component: Tag,
  title: 'Tag',
  excludeStories: /.*Data$/,
};

const log: () => void = () => {
  alert('Callback executed when tag is closed');
};

export const Basic = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Tag>Default</Tag>
    <Tag closable>Closable</Tag>
    <Tag closable onClose={log}>
      Closable(onCLose)
    </Tag>
  </Box>
);

export const Colored = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Tag color="#f50">#f50</Tag>
    <Tag color="#2db7f5">#2db7f5</Tag>
    <Tag color="#87d068">#87d068</Tag>
    <Tag color="#108ee9">#108ee9</Tag>
  </Box>
);

export const WithIcon = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Tag icon={<CheckCircleOutlined />} color="success">
      success
    </Tag>
    <Tag icon={<SyncOutlined spin />} color="processing">
      processing
    </Tag>
    <Tag icon={<CloseCircleOutlined />} color="error">
      error
    </Tag>
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      warning
    </Tag>
    <Tag icon={<ClockCircleOutlined />} color="default">
      waiting
    </Tag>
    <Tag icon={<MinusCircleOutlined />} color="default">
      stop
    </Tag>
  </Box>
);
