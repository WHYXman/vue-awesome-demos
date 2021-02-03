import Layout from '@/layout'

const barCode = {
    path: '/barCode',
    redirect: '/barCode/make',
    component: Layout,
    name: 'barCode',
    meta: {title: '二维码',routerShow: true,},
    children: [
        {
            path: 'make',
            hidden:false,
            name: 'make',
            component: () => import('@/views/barCode/page/make'),
            meta: {title: '字符串生成二维码', icon: '',bgcolor:'#EF7F62'},
            menu: ''
        },
    ]
}
export default barCode;