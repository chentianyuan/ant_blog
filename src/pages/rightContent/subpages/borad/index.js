import React from 'react'
import Breadcrumb from '../../../../pages/components/breadcrumb'
import { Layout, Comment, List } from 'antd'
import { request, PATHS } from '../../../../util/request'

const { Content } = Layout
class Borad extends React.Component {
  state = {
    commentList: []
  }
  componentDidMount () {
    this.getCommentList().then(res => {
      console.log(res)
      this.setState({
        commentList: res
      })
    })
  }
  getCommentList () {
    return request.get(PATHS.comment.getLeaveMessageList)
  }
  render () {
    let data = this.state.commentList
    return (
      <Content style={{ margin: '0 24px 24px' }}>
        <Breadcrumb pathList={['Borad', 'List']}></Breadcrumb>
        <div style={{padding: 24, backgroundColor: '#fff'}}>
          <List
            className="comment-list"
            header={`${data.length} replies`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem = {item => (
              <Comment
                actions={[]}
                author={item.name}
                avatar={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                content={<p>{item.content}</p>}
                datetime={new Date(item.created_at).toLocaleString()}
              />
            )}
          />
        </div>
      </Content>
    )
  }
}

export default Borad
