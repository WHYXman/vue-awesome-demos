<template>
    <div>
        <svg id="mysvg" width="800" height="500"/>
    </div>
</template>

<script>
import dagreD3 from 'dagre-d3'
import * as d3 from 'd3'
export default {
    name: '',

    data() {
        return {
        }
    },
    mounted() {
        let dataset ={
            nodes: [
                {id: 0,label: "流动人员",shape: "rect"},
                {id: 1,label: "安全筛查",shape: "rect"},
                {id: 2,label: "热像仪人体测温筛查",shape: "diamond"},
                {id: 3,label: "人工复测",shape: "diamond"},
                {id: 4,label: "快速通过",shape: "rect"},
                {id: 5,label: "紧急处理",shape: "rect"}
            ],
            edges: [
                {source: 0,target: 1,label: ""},
                {source: 1,target: 2,label: ""},
                {source: 2,target: 4,label: "正常"},
                {source: 2,target: 3,label: "不正常"},
                {source: 3,target: 5,label: "不正常"},
                {source: 3,target: 4,label: "正常"}
            ]
        };
        // 创建 graph 对象
        let g = new dagreD3.graphlib.Graph();
        //设置图
        g.setGraph({
            //设置 node 节点的延伸排列方向，它有4个值: TB, BT, LR, 或者 RL 可选，默认是'TB'（从上到下）。
            //这里T = top, B = bottom, L = left, and R = right
            rankdir: 'TB'
        });
        dataset.nodes.forEach(item => {
            g.setNode(item.id, {
                //节点标签
                label: item.label,
                //节点形状
                shape: item.shape,
                //节点样式
                style: "fill:#fff;stroke:#000"
            })
        })
        dataset.edges.forEach(item => {
            g.setEdge(item.source, item.target, {
                //边标签
                label: item.label,
                //边样式
                style: "fill:#fff;stroke:#333;stroke-width:1.5px"
            })
        })
        // 创建渲染器
        let render = new dagreD3.render();
        // 选择 svg 并添加一个g元素作为绘图容器.
        let svgGroup = d3.select('#mysvg').append('g');
        // 在绘图容器上运行渲染器生成流程图.
        render(svgGroup, g);
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
</style>
