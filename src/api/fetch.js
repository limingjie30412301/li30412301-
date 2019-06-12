import index from './index'

const api = Object.assign({}, index)
const API_ROOT = 'http://dev-20190423-meiriyituan.ark-api.daweixinke.com'
const header = { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }

export default function() {
  let fetch = {}
  Object.keys(api).map(key => {
    return (fetch[key] = function(data = '') {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${API_ROOT}${api[key][1]}`,
          data: data,
          method: api[key][0],
          header: header,
          success(res) {
            resolve(res.data)
          },
          fail(err) {
            reject(err)
          },
        })
      })
    })
  })
  return fetch
}
