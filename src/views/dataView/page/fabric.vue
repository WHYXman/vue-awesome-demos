<template>
    <div>
        <canvas
            id="main"
            width="500"
            height="500"
            style="border:0px solid #aaa"
        ></canvas>
    </div>
</template>

<script>
import { fabric } from 'fabric'
export default {
    name: '',

    data() {
        return {
        }
    },
    mounted() {
        var canvas = new fabric.Canvas('main');
        var rect = new fabric.Rect({
            left: 100,//距离画布左侧的距离，单位是像素
            top: 100,//距离画布上边的距离
            fill: 'red',//填充的颜色
            width: 30,//方形的宽度
            height: 30,//方形的高度
            angle:45,
        });
        canvas.add(rect);
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
</style>
