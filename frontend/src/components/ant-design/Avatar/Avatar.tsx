import React from 'react';
import {Avatar as AntAvatar} from 'antd';
import {AvatarProps as AntAvatarProps} from 'antd/lib/avatar'; 
import { UserOutlined } from '@ant-design/icons';
import { color, space, layout } from 'styled-system'
import {styled, ColorProps, SpaceProps, LayoutProps} from '@services/theme';

export type AvatarProps = AntAvatarProps & ColorProps & SpaceProps & LayoutProps
const StyledAvatar = styled(AntAvatar)(color, space, layout)

export const Avatar = (props: AvatarProps) => <StyledAvatar {...props} icon = {<UserOutlined />}/>
;




