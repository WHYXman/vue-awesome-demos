import Layout from '@/layout'

const richText = {
    path: '/richText',
    redirect: '/richText/quillRich',
    component: Layout,
    name: 'richText',
    meta: {title: '富文本',routerShow: true,},
    children: [
        {
            path: 'quillRich',
            hidden:false,
            name: 'quillRich',
            component: () => import('@/views/richText/page/quillRich'),
            meta: {title: '富文本-quill', icon: '',bgcolor:'#EF7F62'},
            menu: ''
        },
    ]
}
export default richText;