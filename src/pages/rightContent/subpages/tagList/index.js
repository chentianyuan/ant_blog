import React from 'react'
import Breadcrumb from '../../../../pages/components/breadcrumb'
import { Divider, Table, Layout, message, Modal, Input } from 'antd'
// import { Link } from 'react-router-dom'
import { PATHS, request } from '../../../../util/request'

let { Content } = Layout
let confirm = Modal.confirm
class tagList extends React.Component {
  state = {
    tagData: [],
    saveName: '',
    columns: [{
      title: '标签名',
      dataIndex: 'tagName',
      render: (text, record) => (
      !record.editState ? <a href={'javascript:'}>{record.tagName}</a> : <Input allowClear={true} value={this.state.saveName} style={{width: '100%'}} placeholder="请输入标签名称" onInput={this.onInput.bind(this, record)}/> // eslint-disable-line
      )
    }, {
      title: '相关文章数量',
      dataIndex: 'count',
      render: (text, record) => (<a href={'javascript:'}>{record.count}篇文章</a>) // eslint-disable-line
    }, {
      title: '功能',
      render: (text, record) => (
        <span>
          {
            !record.editState ? <a onClick={this.Edit.bind(this, record)} to={'javascript:'}>编辑</a> : <a onClick={this.Save.bind(this, record)} to={'javascript:'}>保存</a> // eslint-disable-line
          }
          <Divider type="vertical" />
          {
            !record.editState ? <a href={'javascript:'} onClick={this.showConfirm.bind(this, record)}>删除</a> : <a href={'javascript:'} onClick={this.Cancel.bind(this, record)}>取消</a> // eslint-disable-line
          }
        </span>
      )
    }]
  }
  componentDidMount () {
    this.getTagList().then(data => {
      console.log(data)
      this.setState({
        tagData: data.map((item, key) => Object.assign(item, {
          key,
          editState: false
        }))
      })
    })
  }
  getTagList () {
    // 获取异步数据
    return request.get(PATHS.tag.getAlltags)
  }
  Edit (record) {
    this.setState({
      tagData: this.state.tagData.map(tag => {
        if (tag.id === record.id) {
          tag.editState = true
        }
        return tag
      }),
      saveName: record.tagName
    })
  }
  onInput (record, e) {
    this.setState({
      saveName: e.target.value
    })
  }
  Save (record) {
    request.post(PATHS.tag.renameTag, {
      tagName: this.state.saveName,
      id: record.id
    }).then(res => {
      if (res) {
        message.success('修改成功')
        this.setState({
          tagData: this.state.tagData.map(tag => {
            if (tag.id === record.id) {
              tag.editState = false
              tag.tagName = this.state.saveName
            }
            return tag
          }),
          saveName: ''
        })
      } else {
        message.error('修改失败')
      }
    })
  }
  Cancel (record) {
    this.setState({
      tagData: this.state.tagData.map(tag => {
        if (tag.id === record.id) {
          tag.editState = false
        }
        return tag
      })
    })
  }
  render () {
    return (
      <Content style={{ margin: '0 24px 24px' }}>
        <Breadcrumb pathList={['Tag', 'List']}></Breadcrumb>
        <div style={{padding: 24, backgroundColor: '#fff', minHeight: 360}}>
          <Table columns={this.state.columns} dataSource={this.state.tagData} pagination={{pageSize: 4, total: this.state.tagData.length}}/>
        </div>
      </Content>
    )
  }
  showConfirm (tag) {
    let self = this
    confirm({
      title: 'Delete',
      content: `确认删除标签 ${tag.tagName} 吗`,
      onCancel () {},
      onOk () {
        return new Promise((resolve, reject) => {
          request.post(PATHS.article.deleteTag, {
            tagId: tag.id
          }).then(res => {
            if (res && !res.hasError) {
              message.success('删除成功')
              self.getTagList().then(data => {
                self.setState({
                  tagData: data.map((item, key) => Object.assign(item, {key}))
                })
                resolve()
              })
            } else {
              reject()
              message.error('删除失败')
            }
          })
        }).catch(console.log)
      }
    })
  }
}

export default tagList
