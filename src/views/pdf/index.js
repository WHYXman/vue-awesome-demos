import Layout from '@/layout'

const barCode = {
    path: '/pdf',
    redirect: '/pdf/object',
    component: Layout,
    name: 'pdf',
    meta: {title: 'pdf预览',routerShow: true,},
    children: [
        {
            path: 'object',
            hidden:false,
            name: 'object',
            component: () => import('@/views/pdf/page/pdf-object'),
            meta: {title: 'pdf-object', icon: '',bgcolor:'#EF7F62'},
            menu: ''
        },
    ]
}
export default barCode;