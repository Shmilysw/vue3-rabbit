import request from '@/utils/http'

export const getOrderAPI = (id) => {
    return request({
        url: `/member/order/${id}`
    })
}