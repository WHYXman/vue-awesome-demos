import Layout from '@/layout'

const main = {
    path: '/dataView',
    redirect: '/dataView/dagreD3',
    component: Layout,
    name: 'dataView',
    meta: {title: '可视化',routerShow: true,},
    children: [
        {
            path: 'dagreD3',
            hidden:false,
            name: 'dagreD3',
            component: () => import('@/views/dataView/page/dagreD3'),
            meta: {title: '流程图-dagreD3', icon: '',bgcolor:'#EF7F62'},
            menu: ''
        },
        {
            path: 'fabric',
            hidden:false,
            name: 'fabric',
            component: () => import('@/views/dataView/page/fabric'),
            meta: {title: 'canvas对象fabric', icon: '',bgcolor:'#EF7F62'},
            menu: ''
        },
        {
            path: 'g6',
            hidden:false,
            name: 'g6',
            component: () => import('@/views/dataView/page/g6'),
            meta: {title: 'g6示例', icon: '',bgcolor:'#EF7F62'},
            menu: ''
        },
    ]
}
export default main;