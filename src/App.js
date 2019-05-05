import React from 'react'
import './App.scss'
import { Layout } from 'antd'
import LeftNav from './pages/leftNav'
import RightContent from './pages/rightContent'
import { Switch, Route } from 'react-router-dom'

// 导出普通函数为函数式组件，没有生命周期，没有内部状态，没有this实例
class App extends React.Component {
  state = {
    collapsed: false
  }

  // 侧边栏状态
  onCollapsedHandler = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  render () {
    window.gvm = this
    return (
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

export default App
