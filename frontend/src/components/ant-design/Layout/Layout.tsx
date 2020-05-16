import React, { ComponentProps } from 'react';
import { compose, space, layout, flexbox  } from 'styled-system';
import { Layout as AntLayoute } from 'antd';
import { LayoutProps as AntLayouteProps, SiderProps } from 'antd/lib/layout';
import 'antd/lib/button/style/css';
import { styled, SpaceProps, LayoutProps, FlexboxProps,} from '@services/theme';




export type LayoutComponentProps = AntLayouteProps & SpaceProps & LayoutProps & FlexboxProps
 
export type StyledSiderProps = Omit< SiderProps , 'theme'> &  LayoutComponentProps;


const StyledLayout = styled(AntLayoute)(space, layout, flexbox);
const StyledLayouteHeader = styled(AntLayoute.Header)(space, layout, flexbox);
const StyledLayouteContent = styled(AntLayoute.Content)(space, layout, flexbox);
const StyledLayouteFooter = styled(AntLayoute.Footer)(space, layout, flexbox);
const styledSystem = compose(space, layout, flexbox);



export const Layout = (props: LayoutComponentProps) => <StyledLayout {...props} />
export const Header = (props: LayoutComponentProps) => <StyledLayouteHeader {...props} />
export const Content = (props: LayoutComponentProps) => <StyledLayouteContent {...props} />
export const Footer = (props: LayoutComponentProps) => <StyledLayouteFooter {...props} />
export const Sider = styled(AntLayoute.Sider)<StyledSiderProps>((props) => {
    return {
        ...styledSystem(props),
    }
})








