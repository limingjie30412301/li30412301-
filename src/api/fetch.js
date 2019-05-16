import request from './request'
import index from './index'

const apiList = [index]

let fetch = {
    getUser(data){
        console.log('1'+ data)
        // return request({
        //     url:'',
        //     data:data
        // })
    }
}

fetch = Object.assign(fetch, ...apiList)

export default fetch