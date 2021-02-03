<template>
    <div class="box">
        <quill-editor ref="myTextEditor"
            v-model="content"
            :options="editorOption1"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
        </quill-editor>
    </div>
</template>

<script>

    import { quillEditor } from 'vue-quill-editor'
    import {editorOption} from '@/components/richText/config'
    //富文本样式
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import '@/components/richText/style.scss'
    export default {
        name: 'quillRich',
        data() {
            return {
                content:"",
                editorOption1: editorOption,
            }
        },
        components:{
            quillEditor,
        },
        methods:{
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log(editor);
            },
            onEditorReady(editor) {
                // console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
                // console.log('editor change!', editor, html, text)
                this.content = html
            },
        }
    }
</script>

<style lang="scss" scoped>
    .box{
        padding: 30px;
    }
</style>