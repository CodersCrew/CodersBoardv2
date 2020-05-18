import React from 'react';
import { Avatar } from './Avatar';
import { Box } from '@components/atoms/Box';
import { UserOutlined } from '@ant-design/icons';


export default {
  component: Avatar,
  title: 'Avatar',
  excludeStories: /.*Data$/,
};

export const Colors = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Box>
      <Avatar size={64} bg="primary.main" icon={<UserOutlined/>}/>
    </Box>
    <Box>
      <Avatar size={64} bg="info.main" icon={<UserOutlined/>}/>
    </Box>
    <Box>
      <Avatar size={64} bg="success.main" icon={<UserOutlined/>}/>
    </Box>
    <Box>
      <Avatar size={64} bg="warning.main" icon={<UserOutlined/>}/>
    </Box>
  </Box>
)

export const Sizes = () => (
  <Box display="grid" gridGap={16} justifyItems="left">
    <Box>
      <Avatar size={32} bg="primary.dark"  icon={<UserOutlined/>} />
    </Box>
    <Box>
      <Avatar size={40} bg="primary.dark" icon={<UserOutlined/>} />
    </Box>
    <Box>
      <Avatar size={160} bg="primary.dark" icon={<UserOutlined/>} />
    </Box>
  </Box>
)

