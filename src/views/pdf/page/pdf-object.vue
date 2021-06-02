<template>
    <div style="width:100%">
        <el-button @click="close" style="position:fixed;z-index:10000;">关闭</el-button>
        <el-button @click="open" style="position:fixed;z-index:10000;margin-left:100px;">打开</el-button>
        <a href="https://blog.csdn.net/m0_37618340/article/details/82730707">js实现PDF在线预览</a>
        <div v-if="visible" id="pdf-content"></div>
    </div>
</template>

<script>
import pdf from "@/assets/js/pdfobject.min.js";
export default {
    name: "PdfObject",
    data() {
        return {
            visible:true,
        };
    },
    mounted() {
        // pdf.embed(`${process.env.BASE_URL}1.pdf`, "#pdf-content");//指定dom节点
        //指定body dom来全局显示
        // pdf.embed(`${process.env.BASE_URL}1.pdf`, "body");
        //url 链接类型
        // https://blog.csdn.net/qq_38975553/article/details/104261830  PDFObject无法加载远程url 
        pdf.embed(`https://pwrk.us/sample-pdf/?file=pdf`, "#pdf-content");
    },
    methods:{
        close(){
            this.visible = false;
        },
        open(){
            this.visible = true;
            this.$nextTick(()=>{
                pdf.embed(`${process.env.BASE_URL}1.pdf`, "#pdf-content");//指定dom节点
            })
        }
    }
};
</script>

<style lang="scss" scoped>
#pdf-content {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index:1001;
    background: #999;
}
</style>
