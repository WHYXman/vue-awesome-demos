import Layout from '@/layout'

const json = {
    path: '/json-maker',
    redirect: '/json-maker/json2form',
    component: Layout,
    name: 'json-maker',
    meta: {title: 'json转化',icon: '',routerShow: true,},
    children: [
        {
            path: 'json2form',
            hidden:false,
            name: 'json2form',
            component: () => import('@/views/json-construcor/page/json2form'),
            meta: {title: 'json生成表单', bgcolor:'#EF7F62'},
            menu: ''
        },
        {
            path: 'json2table',
            hidden:false,
            name: 'json2table',
            component: () => import('@/views/json-construcor/page/json2table'),
            meta: {title: 'json生成表格', bgcolor:'#EF7F62'},
        },
    ]
}
export default json;
