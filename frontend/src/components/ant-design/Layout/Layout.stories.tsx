import React from 'react';
import { Box } from '@components/atoms/Box';
import  * as Layout from './Layout'
import { DoubleRightOutlined, RightCircleOutlined  } from '@ant-design/icons';
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



  
  export const LayoutHasSider = () => (
    <Box>
      <Box style={{ textAlignLast: 'left', }}>
       <h1>true</h1>
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
        <Box mt ={10} mb ={10} >
          <Box mb ={10} style={{ textAlignLast: 'left', }}>
            <h1>XS </h1>
            <h2>{'<'} 576px</h2>
          </Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'xs'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box   mt ={40} mb = {20}>
          <Box mb = {10} style={{ textAlignLast: 'left', }}>
              <h1>SM </h1>
              <h2>{'≥'} 576px</h2>
          </Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'sm'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Box mb = {10} style={{ textAlignLast: 'left', }}>
              <h1>MD </h1>
              <h2>{'≥'} 768px</h2>
          </Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'md'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Box mb = {10} style={{ textAlignLast: 'left', }}>
              <h1>LG </h1>
              <h2>{'≥'} 992px</h2>
          </Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'lg'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Box mb = {10} style={{ textAlignLast: 'left', }}>
              <h1>XL </h1>
              <h2>{'≥'} 1200px</h2>
          </Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'xl'} pt={40} style={{  textAlign: 'center',background: '#3ba0e9',}}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Box mb = {10} style={{ textAlignLast: 'left', }}>
              <h1>XXL </h1>
              <h2>{'≥'} 1600px</h2>
          </Box>
          <Layout.Layout   style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  breakpoint ={'xxl'} pt={40} 
                              style={{  textAlign: 'center',background: '#3ba0e9',}}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
      </Box>
    
  )


  export const SiderColapsed= () => (
    <Box>
      <Box>
        <Box style={{ textAlignLast: 'left', }}>
        <h1> true</h1>
        </Box>
        <Box mt ={30}>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  collapsed ={true}  pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
      </Box>
      <Box>
        <Box mt ={30} style={{ textAlignLast: 'left', } }>
        <h1> false</h1>
        </Box>
        <Box mt ={30}>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  collapsed ={false}  pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>Sider</Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
      </Box>
      
     
    </Box>
  )

  export const SiderCollapsible = () => (
    <Box>
        <Box  style={{ textAlignLast: 'left', } }>
        <h1> true</h1>
        </Box>
        <Box mt ={30}>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider   collapsible={true}  pt={50} 
                              style={{  textAlign: 'center',background: '#3ba0e9', }}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
      </Box>
  );

  export const SiderDefaultCollapsed = () => (
    <Box>
        <Box  style={{ textAlignLast: 'left', } }>
        <h1 >  true</h1>
        </Box>
        <Box mt ={30}>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider   defaultCollapsed={true} collapsible={true}  
                              pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
      </Box>
  );


  export const SiderCollapsedWidth = () => (
    <Box>
        <Box mt ={30}>
          <Box mb={10} style={{ textAlignLast: 'left', } }>
            <h1 >  50px</h1>
          </Box>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  defaultCollapsed={true} collapsedWidth={50} 
                            pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Box mb={10} style={{ textAlignLast: 'left', } }>
            <h1 >  100px</h1>
          </Box>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  defaultCollapsed={true} 
                            collapsedWidth={100} pt={50} 
                            style={{  textAlign: 'center',background: '#3ba0e9', }}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <Box mb={10} style={{ textAlignLast: 'left', } }>
            <h1 >  150px</h1>
          </Box>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  defaultCollapsed={true} collapsedWidth={150} 
                            pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
        
      </Box>
  );

  
  export const SiderTrigger= () => (
    <Box>
        <Box  style={{ textAlignLast: 'left', } }>
        <h1> Icon  </h1>
        </Box>
        <Box mt ={30}>
          <Layout.Layout  style={{ textAlign: 'center' }}>
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
            <Layout.Layout >
              <Layout.Sider  trigger={<RightCircleOutlined /> } 
                              defaultCollapsed={true} collapsible={true}  
                              pt={50} style={{  textAlign: 'center',background: '#3ba0e9', }}>   
                Sider
              </Layout.Sider>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
            </Layout.Layout>
            <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
          </Layout.Layout>
        </Box>
      </Box>
  );



  export const SiderZeroWidthTriggerStyle= () => (
    <Box>
      <Box mt ={30}>
          <h1> default </h1>
          <Layout.Layout mt ={10} style={{ textAlign: 'center' }}>
            <Layout.Sider  collapsedWidth={0} zeroWidthTriggerStyle={{}} 
                            defaultCollapsed={true} collapsible={true}  pt={50} 
                            style={{  textAlign: 'center',background: '#3ba0e9', }}>  
              Sider
            </Layout.Sider>
            <Layout.Layout >
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
              <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
            </Layout.Layout>
          </Layout.Layout>
        </Box>
        <Box mt ={30}>
          <h1> top: 0  </h1>
          <Layout.Layout mt ={10} style={{ textAlign: 'center' }}>
            <Layout.Sider   collapsedWidth={0} zeroWidthTriggerStyle={{top:'0'}} 
                            defaultCollapsed={true} collapsible={true}  pt={50} 
                            style={{  textAlign: 'center',background: '#3ba0e9', }}>  
              Sider
            </Layout.Sider>
            <Layout.Layout >
            <Layout.Header  height={60} style={{ background: '#7dbceb', }} >Header</Layout.Header>
              <Layout.Content  pt={50} height={120}  style={{ background: '#108ee9', }}>Content</Layout.Content>
              <Layout.Footer  style={{ background:  '#7dbceb', }}>Footer</Layout.Footer  >
            </Layout.Layout>
          </Layout.Layout>
        </Box>
      </Box>
  );