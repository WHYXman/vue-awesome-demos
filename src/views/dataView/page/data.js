export const selectOptions = [
  {
    value: "选项1",
    label: "黄金糕"
  },
  {
    value: "选项2",
    label: "双皮奶"
  },
  {
    value: "选项3",
    label: "蚵仔煎"
  },
  {
    value: "选项4",
    label: "龙须面"
  },
  {
    value: "选项5",
    label: "北京烤鸭"
  }
];

export const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄"
  }
];

export const flowChartData = {
  nodes: [
    {
      id: "node1",
      x: 50,
      y: 100,
      shape: "start",
      anchorPoints: [
        [0, 0.5], // 左侧中间
        [1, 0.5] // 右侧中间
      ]
    }, // 最简单的
    {
      id: "node2",
      x: 250,
      y: 100,
      shape: "end",
      size: [50, 100],
      anchorPoints: [
        [0, 0.5], // 左侧中间
        [1, 0.5] // 右侧中间
      ]
    }, // 添加宽高
    { id: "node3", x: 350, y: 100, color: "red", shape: "start" }, // 添加颜色
    { id: "node4", x: 550, y: 100, label: "菱形", shape: "start" } // 附加文本
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      color: "red",
      // 该边连入 source 点的第 0 个 anchorPoint，
      sourceAnchor: 1,
      // 该边连入 target 点的第 0 个 anchorPoint，
      targetAnchor: 0,
      style: {
        endArrow: true
      }
    }
  ]
};
import start from '@/assets/imgs/start.png';
import script from '@/assets/imgs/script.png';
import artificial from '@/assets/imgs/artificial.png';
import end from '@/assets/imgs/end.png';
import repelSplit from '@/assets/imgs/repel-split.png';
import repelMerge from '@/assets/imgs/repel-merge.png';
import parallelSplit from '@/assets/imgs/parallel-split.png';
import parallelMerge from '@/assets/imgs/parallel-merge.png';
export const flowChartData1 = {
  nodes: [
    {
      id: "node1",
      x: 25,
      y: 250,
      img: start,
      label:'开始',
    }, 
    {
      id: "node2",
      x: 100,
      y: 250,
      img: repelSplit,
    }, 
    {
      id: "node3",
      x: 180,
      y: 250,
      img: artificial,
      label:'人员报名',
    }, 
    {
      id: "node4",
      x: 250,
      y: 250,
      img: repelMerge,
    }, 
    {
        id: "node5",
        x: 450,
        y: 250,
        shape:'bganimate',
        size:48,
        img: artificial,
        label:'【区县级】部门审批',
    }, 
    {
        id: "node6",
        x: 460,
        y: 150,
        img: repelSplit,
    }, 
    {
        id: "node7",
        x: 600,
        y: 55,
        img: repelSplit,
    }, 
    {
        id: "node8",
        x: 600,
        y: 300,
        img: repelMerge,
    }, 
    {
        id: "node9",
        x: 750,
        y: 260,
        img: artificial,
        label:'【市级】部门审批',
    }, 
    {
        id: "node10",
        x: 700,
        y: 180,
        img: repelSplit,
    }, 
    {
        id: "node11",
        x: 850,
        y: 55,
        img: repelSplit,
    }, 
    {
        id: "node12",
        x: 1000,
        y: 150,
        img: script,
    }, 
    {
        id: "node13",
        x: 1300,
        y: 150,
        img: end,
    }, 
    {
        id: "node14",
        x: 1200,
        y: 400,
        img: artificial,
        label:'【省级】部门审批',
    }, 
    {
        id: "node15",
        x: 690,
        y: 400,
        img: repelMerge,
    }, 

  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      // 该边连入 source 点的第 0 个 anchorPoint，
      sourceAnchor: 3,
      // 该边连入 target 点的第 0 个 anchorPoint，
      targetAnchor: 2,
    },
    {
      source: "node2",
      target: "node3",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node3",
      target: "node4",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node4",
      target: "node5",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node5",
      target: "node6",
      sourceAnchor: 0,
      targetAnchor: 1,
    },
    {
      source: "node6",
      target: "node7",
      label:"同意",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node7",
      target: "node8",
      label:"区县批->市批",
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      source: "node8",
      target: "node9",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node9",
      target: "node10",
      sourceAnchor: 0,
      targetAnchor: 1,
    },
    {
      source: "node10",
      target: "node2",
      type: 'polyline',
      sourceAnchor: 2,
      targetAnchor: 0,
    },
    {
      source: "node10",
      target: "node11",
      sourceAnchor: 0,
      targetAnchor: 2,
    },
    {
      source: "node4",
      target: "node8",
      type: 'polyline',
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node4",
      target: "node15",
      type: 'polyline',
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node11",
      target: "node12",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node12",
      target: "node13",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
    {
      source: "node7",
      target: "node11",
      sourceAnchor: 3,
      targetAnchor: 2,
    },
  ]
};
