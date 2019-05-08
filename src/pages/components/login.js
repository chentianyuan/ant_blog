import React from 'react'
import { Form, Input, Icon, Checkbox, Button, message } from 'antd'
import { request, PATHS } from '../../util/request'
import { connect }  from 'react-redux'

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let username = values['username']
        let password = values['password']
        request.post(PATHS.user.verify,{ username, password })
        .then(data => {
          if (data) {
            message.success('登录成功')
            /**
             * path：路径
             * domain：域
             * max-age：有效期长度
             * expries：过期时间
             * secure：httponly设置
             */
            // expires应使用GMT格式的时间，不设置expires页面刷新后cookie失效
            let expiresDate = new Date('December 31, 2020').toGMTString()
            // max-age优先级高于expires
            document.cookie = `_ytcblog_token_=${data.data.token};expires=${expiresDate};path=/;`
            this.props.updateStateAction(true)
          } else {
            message.error('登录失败')
          }
        })
      }
    })
  }

  TouristMode = e => {
    let expiresDate = new Date(new Date().getTime() + 60 * 60 * 1000).toGMTString()
    // max-age优先级高于expires
    document.cookie = `_ytcblog_token_=tourist;expires=${expiresDate};path=/;`
    this.props.updateStateAction(true)
  }

  componentDidMount () {
    // 若用户已登录，重定向至文章列表页
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} alt="战斗天使|阿丽塔" className="login-form">
        <Form.Item>
          {
            getFieldDecorator('username', {
              rules: [{require: true, message: 'Please input your username!'}]
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }}/>} placeholder="Username"/>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }}/>} type="password" placeholder="Password"/>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>Remember me</Checkbox>
            )
          }
          <a className="login-form-forgot" onClick={this.TouristMode.bind(this)} style={{float: 'right'}} href="javascript:">游客模式！</a> {/*eslint-disable-line*/}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)