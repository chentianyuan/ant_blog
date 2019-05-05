import React from 'react'
import Breadcrumb from '../../../../pages/components/breadcrumb'
import { Layout, Input, Button, message, Form } from 'antd'
import { PATHS, request } from '../../../../util/request';

const { Content } = Layout
class addTag extends React.Component {
  state = {
    newTagName: ''
  }
  render () {
    return (
      <Content style={{ margin: '0 24px 24px' }}>
        <Breadcrumb pathList={['Tag', 'Add']}></Breadcrumb>
        <div style={{padding: 24, backgroundColor: '#fff'}}>
          <Form>
            <Form.Item>
              <Input placeholder="新增文章标签" value={this.state.newTagName} onChange={this.onChange.bind(this)}/>
            </Form.Item>
          </Form>
          <Button type="primary" onClick={() => this.submit()}>提交</Button>
        </div>
      </Content>
    )
  }
  onChange (e) {
    this.setState({
      newTagName: e.target.value
    })
  }
  submit () {
    let self = this
    request.post(PATHS.tag.insertTag, {
      tagName: self.state.newTagName,
      count: 0
    }).then(res => {
      if (res) {
        message.success('新增成功')
        self.props.history.push('/tagList')
      } else {
        message.error('新增失败')
      }
    })
  }
}

export default addTag