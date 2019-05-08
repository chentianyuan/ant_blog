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
map.set('/borad', 'borad')
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
    // let key = this.props.path
    let key = this.props.location.pathname
    key = key.startsWith('/edit') ? '/edit' : key
    let optKey = 'sub-article'
    if (key.toLocaleLowerCase().includes('tag')) {
      optKey = 'sub-tag'
    } else if (key.toLocaleLowerCase().includes('borad')) {
      optKey = 'sub-borad'
    }

    return (
      <Sider
        className="left-nav"
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={(collapsed, type) => this.props.onCollapsedHandler()}
      >
      <div className="left-nav-avatar">
        <img alt="avatar" src={require('../../static/avatar.png')}/>
      </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={[optKey]}
          defaultSelectedKeys={[map.get(key)]}
          selectedKeys={[map.get(key || '/')]}
        >
          <SubMenu key="sub-article" title={<span><Icon type="ordered-list" />{!this.props.collapsed ? '文章管理' : ''}</span>}>
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
          <SubMenu key="sub-tag" title={<span><Icon type="tags" />{!this.props.collapsed ? '标签管理' : ''}</span>}>
            <Menu.Item key="tag-list">
              <Link to="/tagList">
                <span>全部标签</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="tag-add">
              <Link to="/addTag">
                <span>新增标签</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub-borad" title={<span><Icon type="message" />{!this.props.collapsed ? '留言墙管理' : ''}</span>}>
            <Menu.Item key="borad">
              <Link to="/borad">
                <span>留言墙</span>
              </Link>
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
