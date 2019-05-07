export const PATHS = {
  article: {
    getAllarticles: '/post/list',
    getOnearticle: '/post/onepost',
    getArticleByPagination: '/post/pagination',
    getArticleByPaginationWithTag: '/post/pagination/withtag',
    deleteArticle: '/post/deleteArticle',
    upadteArticle: '/post/updateArticle',
    insertPost: '/post/insert'
  },
  tag: {
    getAlltags: '/tag/list',
    deleteTag: '/tag/delete',
    renameTag: '/tag/rename',
    insertTag: '/tag/insert'
  },
  comment: {
    insertLeaveMessage: '/comment/insertComment',
    getLeaveMessageList: '/comment/getleaveComment'
  },
  user: {
    verify: '/user/verify'
  }
}

/**
 * 公有请求方法
 * @param {*} path url地址
 * @param {*} params 请求参数
 */
let fetchFn = function (path, params = {}, headerParams = { 
  // fetch请求传输json数据时，务必带上content-type: 'application/json'
  headers: new Headers({
    'Content-Type': 'application/json',
    'Authorization': document.cookie.match(/_ytcblog_token_=(.*)(;?)/) ? document.cookie.match(/_ytcblog_token_=(.*)(;?)/)[1] : ''
  })
 }) {
  path = 'http://localhost:8089/api' + path
  params = Object.assign(headerParams, {
    method: this.method,
    mode: 'cors'
  }, this.method === 'POST' ? {body: JSON.stringify(params)} : {})
  return fetch(path, params)
  .then(res => res.json())
  .then(data => {
    console.log(data, !data.hasError)
    if (data && !data.hasError) {
      return data
    } else {
      throw JSON.stringify(data.msg || '接口异常')
    }
  })
  .catch(alert)
}

export const request = {
  get: fetchFn.bind({ method: 'GET' }),
  post: fetchFn.bind({ method: 'POST' })
}
