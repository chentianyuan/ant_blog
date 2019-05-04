// 添加文章列表页
import React from 'react'
import Breadcrumb from '../../../../pages/components/breadcrumb'
import { Layout, Table, Tag, Divider, Modal, message } from 'antd'
import { request, PATHS } from '../../../../util/request'
import { Link } from 'react-router-dom'

let { Content } = Layout
let getLocalTime = function (nS) {
  if (/(.*)T(.*)/.test(nS)) return RegExp.$1.replace(/-/g, '.')
}
let confirm = Modal.confirm

class articleList extends React.Component {
  state = {
    articleData: [],
    columns: [{
      title: '标题',
      dataIndex: 'title',
      render: title => <a href={'javascript:'}>{title}</a> // eslint-disable-line
    }, {
      title: '日期',
      dataIndex: 'created_at',
      render: date => <a href={'javascript:'}>{getLocalTime(date).replace(/\./g, '-')}</a> // eslint-disable-line
    }, {
      title: '标签',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = 'geekblue'
            return <Tag color={color} key={tag.id}>{tag.tagName}</Tag>;
          })}
        </span>
      ),
    }, {
      title: '编辑',
      render: (text, record) => (
        <span>
          <a href="www.baidu.com">查看</a>
          <Divider type="vertical" />
          <Link to={`/edit/${record.id}`}>修改</Link>
          <Divider type="vertical" />
          <a href={'javascript:'} onClick={() => this.showConfirm(record)}>删除</a> {/*eslint-disable-line*/}
        </span>
      )
    }]
  }
  componentWillMount () {
    // 组件挂载之前，此处获取异步数据setState不会触发重渲染
  }
  render () {
    // 首次
    return (
      <Content style={{ margin: '0 24px 24px' }}>
        <Breadcrumb pathList={['Article', 'List']}></Breadcrumb>
        <div style={{padding: 24, backgroundColor: '#fff', minHeight: 360}}>
          <Table columns={this.state.columns} dataSource={this.state.articleData} />
        </div>
      </Content>
    )
  }
  componentDidMount () {
    this.getArticles().then(res => {
      this.setState({
        articleData: res.postList.map((item, key) => Object.assign(item, {key}))
      })
    })
  }
  getArticles () {
    // 获取异步数据
    return request.post(PATHS.article.getArticleByPagination, {
      pageIndex: 1,
      pageSize: 8
    })
  }
  showConfirm (post) {
    let self = this
    confirm({
      title: 'Delete',
      content: `确认删除文章 ${post.title} 吗`,
      onCancel () {},
      onOk () {
        return new Promise((resolve, reject) => {
          request.post(PATHS.article.deleteArticle, {
            postId: post.id
          }).then(res => {
            if (res && !res.hasError) {
              message.success('删除成功')
              self.getArticles().then(res => {
                self.setState({
                  articleData: res.postList.map((item, key) => Object.assign(item, {key}))
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

export default articleList
