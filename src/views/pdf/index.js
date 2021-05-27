import Layout from '@/layout'

const barCode = {
    path: '/pdf',
    redirect: '/pdf/preview',
    component: Layout,
    name: 'barCode',
    meta: {title: 'pdf',routerShow: true,},
    children: [
        {
            path: 'preview',
            hidden:false,
            name: 'preview',
            component: () => import('@/views/pdf/page/preview'),
            meta: {title: 'pdf预览', icon: '',bgcolor:'#EF7F62'},
            menu: ''
        },
    ]
}
export default barCode;