import React from 'react'
import './leftNav.scss'
import { Layout, Icon, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const { Sider } = Layout
const { SubMenu } = Menu

// 存储侧边栏信息
let map = new Map()
map.set('/', 'article-list')
map.set('/addArticle', 'article-add')
map.set('/tagList', 'tag-list')
map.set('/addTag', 'tag-add')
map.set('/board', 'board')
map.set('/edit', 'article-list')

class LeftNav extends React.Component {
  componentWillMount () {
    // 路由监听
    this.props.history.listen(route => {
      console.log(this.props.dispatch, route, '---------')
      // redux状态管理
      this.props.updateStateAction(route.pathname)
    })
  }
  
  render () {
    console.log(this.props.path, this.store, '-----99--------')
    // let key = this.props.path
    let key = this.props.location.pathname
    key = key.startsWith('/edit') ? '/edit' : key

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
          defaultOpenKeys={['sub-article']}
          defaultSelectedKeys={[map.get(key)]}
          selectedKeys={[map.get(key || '/')]}
        >
          <SubMenu key="sub-article" title={<span><Icon type="user" />{!this.props.collapsed ? '文章管理' : ''}</span>}>
            <Menu.Item key="article-list">
              <Link to="/">
                <span>文章列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="article-add">
              <Link to="/addArticle">
                <span>添加文章</span>
              </Link>
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

const mapStateToProps = state => function () {
  return ({
    path: state.common.path
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStateAction: payload => dispatch({ type: 'update', payload })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftNav))
