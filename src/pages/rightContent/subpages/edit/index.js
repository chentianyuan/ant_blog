import React from 'react'
import Breadcrumb from '../../../../pages/components/breadcrumb'
import { Layout, Form, Input, Checkbox, Col, Button, message, Modal } from 'antd'
import { request, PATHS } from '../../../../util/request'
import Editor from 'for-editor'

const { Content } = Layout
const confirm = Modal.confirm
class Edit extends React.Component {
  componentDidMount () {
    let { postId } = this.props.match.params
    Promise.all([
      this.getTagList(),
      this.getPostById(postId)
    ]).then(([tags, post]) => {
      this.setState({
        tagList: tags,
        post,
        defaultValue: post.tags ? post.tags.map(tag => tag.id) : [],
        md: post.content
      })
    })
  }

  async getTagList () {
    return await request.get(PATHS.tag.getAlltags)
  }

  async getPostById (postId) {
    return await request.post(PATHS.article.getOnearticle, { postId })
  }

  state = {
    tagList: [],
    post: {
      title: '',
      descript: ''
    },
    defaultValue: [],
    md: ''
  }

  onChange = value => {
    this.setState({
      defaultValue: value
    })
  }

  onEdit = value => {
    this.setState({
      md: value
    })
  }

  onInput = (e, prefix) => {
    let post = Object.assign(this.state.post, {
      [prefix]: e.target.value
    })
    this.setState({
      post
    })
  }

  submit = () => {
    // 这三只从post拿
    let { id, title, descript } = this.state.post
    let defaultValue = this.state.defaultValue
    let self = this
    let tags = this.state.tagList.filter(tag => defaultValue.includes(tag.id)).map(tag => tag.tagName).join(',')
    confirm({
      title: 'Update',
      content: `确认更新文章吗`,
      onCancel () {},
      onOk () {
        return new Promise((resolve, reject) => {
          request.post(PATHS.article.upadteArticle, {
            postId: id,
            title,
            descript,
            content: self.state.md,
            tags
          }).then(res => {
            if (res && !res.hasError) {
              resolve()
              message.success('更新成功')
              self.props.history.push('/')
            } else {
              reject()
              message.error('更新失败')
            }
          })
        }).catch(console.log)
      }
    })
  }

  render () {
    return (
      <Content style={{ margin: '0 24px 24px' }}>
      <Breadcrumb pathList={['Article', 'Edit']}></Breadcrumb>
      <div style={{padding: 24, backgroundColor: '#fff', minHeight: 360}}>
        <Form>
          <Form.Item>
            <Input placeholder="article title" value={this.state.post.title} onChange={e => this.onInput(e, 'title')}/>
          </Form.Item>
          <Form.Item>
            <Input placeholder="article description" value={this.state.post.descript} onChange={e => this.onInput(e, 'descript')}/>
          </Form.Item>
          <Form.Item>
            <Checkbox.Group
            value={this.state.defaultValue}
            onChange={value => this.onChange(value)}
            style={{width: '100%'}}
            >
              {
                this.state.tagList.map((tag, key) => {
                  return (
                    <Col span={8} key={key} style={{marginBottom: '15px'}}>
                      <Checkbox value={tag.id}>
                        {tag.tagName}
                      </Checkbox>
                    </Col>
                  )
                })
              }
            </Checkbox.Group>
          </Form.Item>
          <Editor value={this.state.md} onChange={e => this.onEdit(e)}/>
          <Form.Item style={{textAlign: 'right'}}>
            <Button type="primary" onClick={() => this.submit()}>提交</Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
    )
  }
}

export default Edit