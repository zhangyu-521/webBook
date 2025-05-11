const routes = [
    {
        path: '/',
        component: () => import('@/layout/front/index.vue'),
        children: [
            { path: '/booksIndex', component: () => import('@/pages/front/booksIndex.vue') },
            { path: '/bookDetail', component: () => import('@/pages/front/bookDetail.vue') },
            { path: '/orderDetail', component: () => import('@/pages/front/orderDetail.vue') },
            { path: '/orders', component: () => import('@/pages/front/orders.vue'), },
            { path: '/shopCar', component: () => import('@/pages/front/shopCar.vue') },
        ]
    },

]



export default routes