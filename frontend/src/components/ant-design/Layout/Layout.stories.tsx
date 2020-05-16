import React from 'react';
import { Box } from '@components/atoms/Box';
// import  * as Layout from './Layout'
// import { Button } from '../Button';
import { theme } from '../../../services/theme/theme';
import { colorStyle } from 'styled-system';
import { Layout  } from 'antd';
const {Header, Sider, Footer, Content } = Layout;
import {Button } from 'antd';
import { InputNumber } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';

export default {
    component: Layout,
    title: 'Layout',
    excludeStories: /.*Data$/,
  };

  

  export const Structer = () => (
    <div>
          <Layout   style={{ textAlign: 'center',color:'black', }}>
            <Header   style={{ background: 'lightblue', }} >Header</Header>
            <Layout>
              <Sider  style={{ background: 'blue', }}> Sider</Sider>
              <Content style={{ background: 'lightblue', }} >Content</Content>
            </Layout>
              <Footer>Footer</Footer>
          </Layout>
    </div>
  )



  
  