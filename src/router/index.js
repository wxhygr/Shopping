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
            },
            // 分类
            {
                path: "/category",
                name: "category",
                component: () =>
                    import ("../views/Category/category.vue")
            },
            // 购物页面
            {
                path: "/Shoppingcar",
                name: "Shoppingcar",
                component: () =>
                    import ("../views/Shoppingcar/shoppingcar.vue")
            },
            // 我的
            {
                path: "/my",
                name: "my",
                component: () =>
                    import ("../views/My/my.vue")
            }

        ]
    },
    {
        path: "/city",
        name: "city",
        component: () =>
            import ("../views/City/city.vue")
    },
    {
        path: "/sign",
        name: "sign",
        component: () =>
            import ("../views/Sign/sign.vue")
    },
    {
        path: "/detailspage",
        name: "detailspage",
        component: () =>
            import ("../views/Detailspage/detailspage.vue")
    },
    {
        path: "/address",
        name: "address",
        component: () =>
            import ("../views/Address/address.vue")
    },
    {
        path: "/addressAdit",
        name: "addressAdit",
        component: () =>
            import ("../views/Address/addressAdit.vue")
    },
    {
        path: "/order",
        name: "order",
        component: () =>
            import ("../views/My/child/order.vue")
    },
    {
        path: "/collection",
        name: "collection",
        component: () =>
            import ("../views/My/child/collection.vue")
    },
    {
        path: "/shoppingpayment",
        name: "shoppingpayment",
        component: () =>
            import ("../views/Shoppingcar/Shoppingpayment/shoppingpayment.vue")
    },
    {
        path: "/evaluationcenter",
        name: 'evaluationcenter',
        component: () =>
            import ("../views/EvaluationCenter/evaluationcenter.vue")
    },
    {
        path: "/center",
        name: "center",
        component: () =>
            import ("../views/EvaluationCenter/center.vue")
    },
    {
        path: "/evaluationdetails",
        name: "evaluationdetails",
        component: () =>
            import ("../views/EvaluationCenter/evaluationdetails.vue")
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