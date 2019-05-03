import React from 'react'
import { Breadcrumb } from 'antd'

export default class createBreadCrumb extends React.Component {
  render () {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {this.props.pathList.map((path, i) => {
          return (
            <Breadcrumb.Item key={i}>{path}</Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }
}