import React from 'react';
import 'antd/lib/avatar/style/css'
import { Avatar as AntAvatar } from 'antd';
import { AvatarProps as AntAvatarProps } from 'antd/lib/avatar'; 
import { compose, color, space, layout } from 'styled-system'
import { styled, ColorProps, SpaceProps, LayoutProps } from '@services/theme';

export type AvatarProps = AntAvatarProps & ColorProps & SpaceProps & LayoutProps;

const StyledAvatar = styled(AntAvatar, {preserve: ['size'] })(compose(color, space, layout));

export const Avatar = (props: AvatarProps) => <StyledAvatar {...props}/>;
;




