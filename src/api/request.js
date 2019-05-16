const API_ROOT = 'http://dev-20190423-meiriyituan.ark-api.daweixinke.com'

function request ({url, method='POST', data='', header}) {
    wx.showLoading({title: '加载中'})
    header = header ? header : { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' };
    return new Promise((resolve, reject)=>{
        wx.request({
            url: `${API_ROOT}${url}`,
            data: data,
            method: method,
            header: header,
            success(res) {
                wx.hideLoading()
                resolve(res.data)
            },
            fail(err) {
                wx.hideLoading()
                reject(err)
            }
        })
    })
}

export default request