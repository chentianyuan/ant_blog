import React from 'react'
import { Layout, Icon } from 'antd'
import { Switch, Route } from 'react-router-dom'
import articleList from './subpages/articleList'
import './rightContent.scss'

let { Header, Footer } = Layout

class RightContent extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  toggle = () => {
    this.props.onCollapsedHandler()
  }

  render () {
    return (
      <Layout className="right-content">
        <Header className="right-content-header">
          <Icon
            className="trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          ></Icon>
        </Header>
        {/* 路由区 */}
        <Switch>
          <Route exact path="/" component={articleList} />
          <Route exact path="/addArticle" component={articleList}/>
        </Switch>
        {/* 路由区 */}
        <Footer style={{ textAlign: 'center' }}>
          backMangner ©2018 Created by React && Ant
        </Footer>
      </Layout>
    )
  }
}

export default RightContent