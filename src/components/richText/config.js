// 工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ['blockquote'], // 引用  代码块-----['blockquote', 'code-block']
    [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
    [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
    [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    [{'direction': 'rtl'}], // 文本方向-----[{'direction': 'rtl'}]
    // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    // [{ font: [] }], // 字体种类-----[{ font: [] }]
    [{ align: [] }], // 对齐方式-----[{ align: [] }]
    ['image'], // 链接、图片、视频-----['link', 'image', 'video']
    // ['clean'], // 清除文本格式-----['clean']
  ];

export const editorOption = {
    placeholder: '请输入文本...',
    theme: 'snow',
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                'image': function (value) {
                    if (value) {
                        document.querySelector('.van-uploader.hidden-van-uploader input').click()
                    } else {
                        this.quill.format('image', false);
                    }
                },
                // 'link': function (value) {
                //     if (value) {
                //         this.quill.format('link', "http://www.baidu.com");
                //     } else {
                //         this.quill.format('link', false);
                //     }
                // },
            }
        }
    }
};



  