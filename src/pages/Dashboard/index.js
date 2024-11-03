import React from 'react';
import { UploadOutlined, HomeOutlined, TeamOutlined ,MenuOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
// import Dashboard from "../Dashboard"
import Users from './Users';
import CreateItems from './CreateItems';
import UpdateItem from './UpdateItem';
import ItemList from './ItemList';
import DashboardHome from './DashboardHome';
import FeedbackList from './FeedbackList';
const { Content, Sider } = Layout;

const navItems = [
  {
  
    key: 'Home',
    icon: <HomeOutlined /> ,
    
  },
  {
    key: 'Users',
    icon: <TeamOutlined />,
    label: <Link to="../Dashboard/Users" >Users</Link>,
  },
  {
    key: 'Items',
    icon: <MenuOutlined />,
    label: 'Menu',
    children:[
      {key: 'Create Menu', label: <Link to="../Dashboard/CreateItems">Create Menu</Link>},
      {key: 'Item List', label: <Link to="../Dashboard/ItemList">Item List</Link>},
      {key: 'Update Item', label: <Link to="../Dashboard/UpdateItem">Update Item</Link>},
      {key: 'ٖFeedback', label: <Link to="../Dashboard/FeedbackList">Feedback</Link>},
    ]
  },
  {
    key: 'Settings',
    icon: <UploadOutlined />,
    label: 'Upload',
  },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={navItems} />
      </Sider>
      <Layout>
        
        <Content
          style={{
            margin: ' 0',
          }}
        >
          <div
            style={{
              padding: 10,
              minHeight: 520,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
            <Route path="dashboardhome" element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="createitems" element={<CreateItems />} />
            <Route path="itemlist" element={<ItemList />} />
            <Route path="feedbackList" element={<FeedbackList />} />
            <Route path="updateitem/:id" element={<UpdateItem />} />
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};

export default App;