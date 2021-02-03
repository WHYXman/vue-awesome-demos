<template>
    <div>
        <div class="toolbar">
            <img
                :src="start"
                alt=""
            >
            <img
                :src="script"
                alt=""
            >
            <img
                :src="artificial"
                alt=""
            >
            <img
                :src="end"
                alt=""
            >
            <img
                :src="repelSplit"
                alt=""
            >
            <img
                :src="repelMerge"
                alt=""
            >
            <img
                :src="parallelSplit"
                alt=""
            >
            <img
                :src="parallelMerge"
                alt=""
            >
        </div>
        <div
            id="container"
            style="border:1px solid #666;width:100%;height:500px;"
        />
    </div>
</template>

<script>
import start from '@/assets/imgs/start.png';
import script from '@/assets/imgs/script.png';
import artificial from '@/assets/imgs/artificial.png';
import end from '@/assets/imgs/end.png';
import repelSplit from '@/assets/imgs/repel-split.png';
import repelMerge from '@/assets/imgs/repel-merge.png';
import parallelSplit from '@/assets/imgs/parallel-split.png';
import parallelMerge from '@/assets/imgs/parallel-merge.png';

import G6 from "@antv/g6";
import { flowChartData, flowChartData1 } from './data'
export default {
    name: '',

    data() {
        return {
            start: start,
            script: script,
            artificial: artificial,
            end: end,
            repelSplit: repelSplit,
            repelMerge: repelMerge,
            parallelSplit: parallelSplit,
            parallelMerge: parallelMerge,
        }
    },
    mounted() {
        // this.initRegisterAll()
        this.registerImg1();
        this.doTest2()
    },
    methods: {
        initRegisterAll() {//注册
            this.registerImg("start", start, {
                getAnchorPoints() {
                    return [
                        [0, 0.5], // 左侧中间
                        [1, 0.5]  // 右侧中间
                    ]
                },
                // type:'circle',
            });
            this.registerImg("end", end, {
                getAnchorPoints() {
                    return [
                        [0, 0.5], // 左侧中间
                        [1, 0.5]  // 右侧中间
                    ]
                },
                // type:'circle',
            });
            // this.registerImg("artificial",artificial,{});
            // this.registerImg("script",script,{});
        },
        registerImg(imgName, imgSrc, config) {
            G6.registerNode(imgName, {
                draw(cfg, group) {
                    const shape = group.addShape('image', {
                        attrs: {
                            x: 0,
                            y: 0,
                            width: 48,
                            height: 48,
                            img: imgSrc,
                        },
                    });
                    if (cfg.label) { // 如果有文本
                        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                        // style.text = cfg.label;
                        group.addShape('text', {
                            // attrs: style
                            attrs: {
                                x: 24, // 居中
                                y: 60,
                                textAlign: 'center',
                                textBaseline: 'middle',
                                text: cfg.label,
                                fill: '#666'
                            }
                        });
                    }
                    return shape
                },
                // getAnchorPoints() {
                //     return config.getAnchorPoints
                // },
            });
        },
        doTest1() {

            const graph = new G6.Graph({
                container: 'container',
                width: 900,
                height: 500,
                defaultEdge: {
                    color: 'red',
                },
                defaultNode: {

                },
            });
            graph.data(flowChartData);
            graph.render();
        },
        registerImg1() {
            G6.registerNode('bganimate', {
                afterDraw(cfg, group) {
                    // 获取该节点上的第一个图形
                    const shape = group.get('children')[0];
                    // 该图形的动画
                    shape.animate({
                        // 动画重复
                        repeat: true,
                        // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                        onFrame(ratio) {
                            // 先变大、再变小
                            const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
                            let radius = cfg.size;
                            if (isNaN(radius)) radius = radius[0];
                            // 返回这一帧需要变化的参数集，这里只包含了半径
                            return {
                                opacity:ratio,
                            }
                        }
                    }, 3000, 'easeCubic'); // 一次动画持续的时长为 3000，动画效果为 'easeCubic'
                }
            }, 'image');
        },
        doTest2() {
            const graph = new G6.Graph({
                container: 'container',
                width: 1400,
                height: 500,
                defaultEdge: {
                    // 边样式配置
                    style: {
                        endArrow: true,
                        opacity: 0.9,        // 边透明度
                        stroke: 'red'       // 边描边颜色
                    },
                    // 边上的标签文本配置
                    labelCfg: {
                        // autoRotate: true     // 边上的标签文本根据边的方向旋转
                    }
                },
                defaultNode: {
                    size: 30,
                    shape: 'image',
                    labelCfg: {
                        style: {
                            fill: '#000'
                        },
                        position: 'bottom'
                    },
                    anchorPoints: [
                        [0.5, 0], // 上侧中间
                        [0.5, 1], // 下侧中间
                        [0, 0.5], // 左侧中间
                        [1, 0.5], // 右侧中间
                    ]
                },
            });
            graph.data(flowChartData1);
            // graph是Graph的实例
            // graph.changeData(data);
            graph.render();
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
