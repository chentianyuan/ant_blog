import React from 'react'
import './App.scss'
import { Layout, Form } from 'antd'
import LeftNav from './pages/leftNav'
import RightContent from './pages/rightContent'
import Login from './pages/components/login'
import { Switch, Route } from 'react-router-dom'
import { connect }  from 'react-redux'

// 导出普通函数为函数式组件，没有生命周期，没有内部状态，没有this实例
class App extends React.Component {
  state = {
    collapsed: false
  }

  // 侧边栏状态
  onCollapsedHandler = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  componentDidMount () {
    let hasToken = document.cookie.match(/_ytcblog_token_=(.*)(;?)/)
    if (hasToken) {
      this.props.updateStateAction(true)
    }
  }

  render () {
    const isLogin = this.props.loginFlag
    let WrappedNormalLoginForm
    if (!isLogin) {
      WrappedNormalLoginForm = Form.create({ name: 'login' })(Login)
    }
    return !isLogin ? 
    <div className="bk" style={{overflow: 'hidden'}}>
      <div className="bk-cover"></div>
      {/* <img className="bk-img" alt="博客后台" src={require('./static/sentry-pattern.png')}/> */}
      <WrappedNormalLoginForm/>
    </div> : (
      <div className="App">
        <Layout style={{minHeight: '100vh'}}>
          <Switch>
            <Route path="/" render={props => (
              <LeftNav
                collapsed={this.state.collapsed}
                onCollapsedHandler={() => this.onCollapsedHandler()}
              ></LeftNav>
            )}/>
          </Switch>
          <RightContent
            collapsed={this.state.collapsed}
            onCollapsedHandler={() => this.onCollapsedHandler()}
          ></RightContent>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginFlag: state.common.loginFlag
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStateAction: payload => dispatch({ type: 'login', payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
