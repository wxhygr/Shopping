import service from "./index.js"


export default {
    // 验证码的获取
    getVerity() {
        return service.req('/verify')
    },
    //注册
    register({ nickname, password, verify }) {
        return service.req('/register', {
            nickname,
            password,
            verify,
        })
    },
    //登录
    login({ nickname, password, verify }) {
        return service.req('/login', {
            nickname,
            password,
            verify
        })
    },
    // 退出登录
    loginOut() {
        return service.req(`/loginOut`, {})
    },
    // 商品
    recommend() {
        return service.req('/recommend')
    },
    // 搜索
    search({ value, page = 1 }) {
        return service.req('/search', {
            value,
            page
        })
    },
    // 详情页
    goodOne(id, page = 1) {
        return service.req(`/goods/one?id=${id}&page=${page}`)
    },
    // 查询是否收藏
    isCollection(id) {
        return service.req(`/isCollection`, { id })
    },
    // 收藏
    collection(goods) {
        return service.req('/collection', { goods })
    },







    // 增加收货地址请求
    postAddress({...args }) {
        return service.req(`/address`, args)
    },
    // 删除收货地址请求
    deleteAddress(id) {
        return service.req('/deleteAddress', { id })
    },
    // 查询收货地址
    getAddress() {
        return service.req(`/getAddress`)
    }
}