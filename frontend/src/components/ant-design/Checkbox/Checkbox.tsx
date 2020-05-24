import React from 'react';
import { space } from 'styled-system';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxProps as AntCheckboxProps, CheckboxGroupProps } from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/css';
import { styled, SpaceProps } from '@services/theme';

export type CheckboxProps = AntCheckboxProps & SpaceProps;

const StyledCheckbox = styled(AntCheckbox)(space);

export const Checkbox = (props: CheckboxProps) => <StyledCheckbox {...props} />;
export const CheckboxGroup = (props: CheckboxGroupProps) => <AntCheckbox.Group {...props} />;
