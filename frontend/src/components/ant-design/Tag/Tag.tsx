import React from 'react';
import { space } from 'styled-system';
import { Tag as AntTag } from 'antd';
import { TagProps as AntTagProps } from 'antd/lib/tag';
import 'antd/lib/tag/style/css';
import { styled, SpaceProps } from '@services/theme';

export type TagProps = AntTagProps & SpaceProps;

const StyledTag = styled(AntTag, { preserve: ['size'] })(space);

export const Tag = (props: TagProps) => <StyledTag {...props} />;
