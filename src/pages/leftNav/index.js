import React from 'react'
import './leftNav.scss'
import { Layout, Icon, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu

class LeftNav extends React.Component {
  render () {
    return (
      <Sider
        className="left-nav"
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={(collapsed, type) => this.props.onCollapsedHandler()}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['article-list']}
          defaultOpenKeys={['sub-article']}
        >
          <SubMenu key="sub-article" title={<span><Icon type="user" />{!this.props.collapsed ? '文章管理' : ''}</span>}>
            <Menu.Item key="article-list">
              <span>文章列表</span>
            </Menu.Item>
            <Menu.Item key="article-item">
              <span>添加文章</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub-tag" title={<span><Icon type="user" />{!this.props.collapsed ? '标签管理' : ''}</span>}>
            <Menu.Item key="tag-list">
              <span>全部标签</span>
            </Menu.Item>
            <Menu.Item key="tag-add">
              <span>新增标签</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub-borad" title={<span><Icon type="user" />{!this.props.collapsed ? '留言墙管理' : ''}</span>}>
            <Menu.Item key="borad">
              <span>留言墙</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

export default LeftNav
