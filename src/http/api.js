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
    //分类查询商品
    category(id) {
        return service.req(`/classification?mallSubId=${id}`)
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
    isCollection({ id }) {
        return service.req(`/isCollection`, { id })
    },
    // 收藏
    collection(goods) {
        return service.req('/collection', goods)
    },
    //取消收藏
    cancelCollection(id) {
        return service.req('/cancelCollection', { id })
    },
    //查询我的收藏
    getCollection() {
        return service.req(`/collection/list`)
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
    },
    //设置默认地址
    setDefaultAddress(id) {
        return service.req(`/setDefaultAddress`, { id })
    },





    // 加入购物车
    addShop(id) {
        return service.req(`/addShop`, { id })
    },
    // 查询获取购物车数据
    getCard() {
        return service.req(`/getCard`, {})
    },
    // 购物车删除数据
    deleteShop(id) {
        return service.post('/deleteShop', id)
    },
    //购物车加减数量
    editCart(count, id, mallPrice) {
        return service.req('/editCart', {
            count,
            id,
            mallPrice
        })
    },
    //提交订单
    placeOrder({...args }) {
        return service.req('/order', args)
    },
    //订单查询
    getMyOrder() {
        return service.req(`/myOrder`)
    },



    // 查询待评价
    tobeEvaluated() {
        return service.req('/tobeEvaluated')
    },
    //查询已评价
    alreadyEvaluated() {
        return service.req('/alreadyEvaluated')
    },
    //提交评价
    comment({...args }) {
        return service.post(`/goodsOne/comment`, args)
    },
    //查询单条评论
    evaluateOne(_id) {
        return service.post('/evaluateOne', {
            _id
        })
    },





}