import { createRouter, createWebHistory } from "vue-router";
 
 
let routes= [
    {
        path: '/',
        name: 'home',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('./../view/homeView.vue'),
        children: [
            {
                path: '/today',
                name: 'today',
                default: true,
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                component: () => import('./../view/page/today.vue'),
            },
            {
                path: '/must',
                name: 'must',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                component: () => import('./../view/page/must.vue'),
            },
            {
                path: '/all',
                name: 'all',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                component: () => import('./../view/page/all.vue'),
            },
            {
                path: '/important',
                name: 'important',
                //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
                component: () => import('./../view/page/important.vue'),
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('./../view/test.vue'),
    },
]
// 路由
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 导出
export default router 