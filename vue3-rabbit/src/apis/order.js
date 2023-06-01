import request from '@/utils/http'

/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/

// 获取用户订单信息
export const getUserOrder = (params) => {
    return request({
        url: '/member/order',
        method: 'GET',
        params
    })
}