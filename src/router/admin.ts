const router = [
    {
        path: '/admin/login', component: () => import('@/layout/admin/login.vue'),
    },
    {
        path: '/admin', component: () => import('@/layout/admin/index.vue'), meta: { requiresAuth: true },
        children: [
            {path: '/admin/bookinfo', component: () => import('@/pages/admin/bookInfoManage.vue')},
            {path: '/admin/announcementManage', component: () => import('@/pages/admin/announcementManage.vue')},
            {path: '/admin/classification', component: () => import('@/pages/admin/classification.vue')},
            {path: '/admin/orderManage', component: () => import('@/pages/admin/orderManage.vue')},
            {path: '/admin/userManage', component: () => import('@/pages/admin/userManage.vue')},
        ]
    },

]


export default router