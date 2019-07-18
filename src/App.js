import React from 'react';
import './App.css';
import { Layout, Menu } from 'antd';

function App() {
    const { Header, Footer, Content } = Layout;
  return (
      <Layout style={{height:"100vh"}}>
          <Header>
              <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ lineHeight: '64px' }}
              >
                  <Menu.Item>Home</Menu.Item>
                  <Menu.Item>Leaderboard</Menu.Item>
                  <Menu.Item>Create A Poll</Menu.Item>
              </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
              Would You Rather ©2019 Created by Jaime A. Araujo
          </Footer>
      </Layout>

  );
}

export default App;
