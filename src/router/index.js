import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/common.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        redirect: '/'
    },
    {
        path: '/',
        component: Common,
        children: [{
                path: '',
                name: 'home',
                component: Home,
                meta: {
                    title: "首页",
                }
            },
            // 分类
            {
                path: "/category",
                name: "category",
                component: () =>
                    import ("../views/Category/category.vue"),
                meta: {
                    title: "分类页面"
                }
            },
            // 购物页面
            {
                path: "/Shoppingcar",
                name: "Shoppingcar",
                component: () =>
                    import ("../views/Shoppingcar/shoppingcar.vue"),
                meta: {
                    title: "我的购物车"
                }
            },
            // 我的
            {
                path: "/my",
                name: "my",
                component: () =>
                    import ("../views/My/my.vue"),
                meta: {
                    title: "我的页面",
                }
            }

        ]
    },
    {
        path: "/city",
        name: "city",
        component: () =>
            import ("../views/City/city.vue"),
        meta: {
            title: "城市选择"
        }

    },
    {
        path: "/sign",
        name: "sign",
        component: () =>
            import ("../views/Sign/sign.vue"),
        meta: {
            title: "登录页面"
        }

    },
    {
        path: "/detailspage",
        name: "detailspage",
        component: () =>
            import ("../views/Detailspage/detailspage.vue"),
        meta: {
            title: "物品详情"
        }

    },
    {
        path: "/address",
        name: "address",
        component: () =>
            import ("../views/Address/address.vue"),
        meta: {
            title: "地址页面"
        }

    },
    {
        path: "/addressAdit",
        name: "addressAdit",
        component: () =>
            import ("../views/Address/addressAdit.vue"),
        meta: {
            title: "修改地址页面"
        }

    },
    {
        path: "/order",
        name: "order",
        component: () =>
            import ("../views/My/child/order.vue"),
        meta: {
            title: "订单页面"
        }

    },
    {
        path: "/collection",
        name: "collection",
        component: () =>
            import ("../views/My/child/collection.vue"),
        meta: {
            title: "我的收藏"
        }
    },
    {
        path: "/shoppingpayment",
        name: "shoppingpayment",
        component: () =>
            import ("../views/Shoppingcar/Shoppingpayment/shoppingpayment.vue"),
        meta: {
            title: "支付页面",
        }
    },
    {
        path: "/evaluationcenter",
        name: 'evaluationcenter',
        component: () =>
            import ("../views/EvaluationCenter/evaluationcenter.vue"),
        meta: {
            title: "评价中心"
        }
    },
    {
        path: "/center",
        name: "center",
        component: () =>
            import ("../views/EvaluationCenter/center.vue"),
        meta: {
            title: "评价中心"
        }
    },
    {
        path: "/evaluationdetails",
        name: "evaluationdetails",
        component: () =>
            import ("../views/EvaluationCenter/evaluationdetails.vue"),
        meta: {
            title: "评价详情"
        }
    },
    {
        path: "/recentlybrowse",
        name: "recentlybrowse",
        component: () =>
            import ("../views/Recentlybrowse/recentlybrowse.vue"),
        meta: {
            title: "最近浏览"
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router