import React, { ComponentProps } from 'react';
import { compose, space, layout, flexbox, color  } from 'styled-system';
import { Layout as AntLayoute } from 'antd';
import { LayoutProps as AntLayouteProps, SiderProps } from 'antd/lib/layout';
import 'antd/lib/button/style/css';
import { styled, SpaceProps, LayoutProps, FlexboxProps, ColorProps, Theme, theme } from '@services/theme';



export type LayoutComponentProps = AntLayouteProps & SpaceProps & LayoutProps & FlexboxProps
 
type StyledSiderProps =     LayoutComponentProps & Omit< SiderProps , 'theme'>  ;



const StyledLayout = styled(AntLayoute)(space, layout, flexbox);
const styledSystem = compose(space, layout, flexbox);


const StyledLayouteHeader = styled(AntLayoute.Header)(space, layout, flexbox);
const StyledLayouteContent = styled(AntLayoute.Content)(space, layout, flexbox);

const StyledLayouteFooter = styled(AntLayoute.Footer)(space, layout, flexbox);
const StyledLayouteSider = styled(AntLayoute.Sider)(space, layout, flexbox);

export const Sider = styled(AntLayoute.Sider)<StyledSiderProps>((props) => {
    const { theme } = props;
    return {
        theme:theme,
        ...styledSystem(props),
    }
})


export const Layout = (props: LayoutComponentProps) => <StyledLayout {...props} />
export const Header = (props: LayoutComponentProps) => <StyledLayouteHeader {...props} />
export const Content = (props: LayoutComponentProps) => <StyledLayouteContent {...props} />
export const Footer = (props: LayoutComponentProps) => <StyledLayouteFooter {...props} />


// export const Sider = ({theme}:Theme,{...props}: StyledSiderProps) => <StyledLayouteSider  theme = {theme} {...props} />


// export const Sider = styled( AntLayoute.Sider )<SiderProps>((props) => {
//     const { theme } = props;
//     const { color } = theme;
// })







