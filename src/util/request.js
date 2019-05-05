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
    getAlltags: '/tag/list'
  },
  comment: {
    insertLeaveMessage: '/comment/insertComment',
    getLeaveMessageList: '/comment/getleaveComment'
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
    'Content-Type': 'application/json'
  })
 }) {
  path = 'http://localhost:8089/api' + path
  params = Object.assign(headerParams, {
    method: this.method,
    mode: 'cors'
  }, this.method === 'POST' ? {body: JSON.stringify(params)} : {})
  return fetch(path, params)
  .then(res => res.json())
  .then(res => {
    console.log(res, !res.hasError)
    let data = res.data
    if (data && !res.hasError) {
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
