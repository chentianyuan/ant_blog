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
        console.log(values)
        request.post(PATHS.user.verify,{ username, password })
        .then(data => {
          console.log(data)
          if (data) {
            message.success('登录成功')
            /**
             * path：路径
             * domain：域
             * max-age：有效期长度
             * expries：过期时间
             * secure：httponly设置
             */
            document.cookie = `_ytcblog_token_=${data.data.token}; secure=true`
            this.props.updateStateAction(true)
          } else {
            message.error('登录失败')
          }
        })
      }
    })
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