import React from 'react';
import { Box } from '@components/atoms/Box';
import  * as Layout from './Layout'


export default {
    component: Layout,
    title: 'Layout',
    excludeStories: /.*Data$/,
  };

  

  export const Structer = () => (
    <Box>
         <Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header   style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Content  pt={50} height={120} style={{  textAlign: 'center',background: '#108ee9', }}>Content</Layout.Content>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
          </Box>
          <Box mt ={30}>
            <Layout.Layout   style={{ textAlign: 'center' }}>
              <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
              <Layout.Layout>
                <Layout.Sider pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
                <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
              </Layout.Layout>
              <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
            </Layout.Layout>
          </Box>
          <Box mt ={30}>
            <Layout.Layout   style={{ textAlign: 'center' }}>
              <Layout.Header   style={{ background: '#7dbceb', }} >Header</Layout.Header>
              <Layout.Layout>
                <Layout.Content  pt={50} height={120} style={{  textAlign: 'center',background: '#108ee9', }}>Content</Layout.Content>
                <Layout.Sider pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
              </Layout.Layout>
              <Layout.Footer   style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
            </Layout.Layout>
          </Box>
          <Box mt ={30}>
            <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Sider pt={100}  style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
              <Layout.Layout>
                <Layout.Header   style={{ background: '#7dbceb', }} >Header</Layout.Header>
                <Layout.Content  pt={50} height={120} style={{  textAlign: 'center',background: '#108ee9', }}>Content</Layout.Content>
                <Layout.Footer   style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
              </Layout.Layout>
            </Layout.Layout>
          </Box>
    </Box>
  )



  
  export const LayoutType= () => (
    <Box>
      <Box style={{ textAlignLast: 'center', }}>
       <h2>hasSider</h2>
      </Box>
      <Box mt ={30}>
        <Layout.Layout  hasSider ={true} style={{ textAlign: 'center' }}>
          <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
          <Layout.Layout >
            <Layout.Sider pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
            <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
          </Layout.Layout>
          <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
        </Layout.Layout>
      </Box>
    </Box>
  )

    
  export const SiderBreakpoint= () => (
    <Box>
      <Box  >
        <Box style={{ textAlignLast: 'center', }}>
        <h2>Breakpoint</h2>
        </Box>
        <Box mt ={30} >
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'xs'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}><p style = {{fontSize : '20px'}}>XS {'<'} 576px</p>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'sm'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}><p style = {{fontSize : '20px'}}>SM {'≥'} 576px</p>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'md'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}><p style = {{fontSize : '20px'}}>MD {'≥'} 768px</p>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'lg'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}><p style = {{fontSize : '20px'}}>LG {'≥'} 992px</p>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'xl'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}><p style = {{fontSize : '20px'}}>XL {'≥'} 1200px</p>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'xxl'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}><p style = {{fontSize : '20px'}}>XXL {'≥'} 1600px</p>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
      </Box>
    </Box>
  )