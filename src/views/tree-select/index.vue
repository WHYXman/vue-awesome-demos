<template>
    <div class="app-container">
        <el-row :gutter="20">
          <el-col :span="8">
              <h4>复选框</h4>
              <TreeSelect multiple v-model="treeValue" />
              {{treeValue}}
          </el-col>
          <el-col :span="8">
              <h4>单选框</h4>
              <TreeSelect :multiple="false" v-model="treeValue1" />
              {{treeValue1}}
          </el-col>
          <el-col :span="8">
              <h4>返回node节点</h4>
              <TreeSelect valueFormat="object" v-model="treeValue2" />
              {{treeValue2}}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
              <h4>是否挂靠body节点，默认挂靠</h4>
              <TreeSelect :appendToBod="false" v-model="treeValue3" />
              {{treeValue3}}
          </el-col>
          <el-col :span="8">
            <h4>isSupportExternalInput支持外部输入</h4>
            <TreeSelect isSupportExternalInput v-model="treeValue4" />
            {{treeValue4}}
          </el-col>
          <el-col :span="8">
            <h4>appendToBody为true时下拉框可拖拽</h4>
            <TreeSelect v-model="treeValue5" />
            {{treeValue5}}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <h4>选值过多时有tooltip</h4>
            <TreeSelect v-model="treeValue6" />
            {{treeValue6}}
          </el-col>
          <el-col :span="16">
              <h4>You are using flat mode. But you forgot to add "multiple=true"的解决方案</h4>
              <a target="_blank" href="https://www.jianshu.com/p/6d20834352be">vue-treeselect 爬坑之路</a>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import TreeSelect from "@/components/TreeSelect";
export default {
    data() {
        return {
          treeValue:null,
          treeValue1:null,
          treeValue2:[{ "id": "2-1-1"}],
          treeValue3:null,
          treeValue4:["士大夫"],
          treeValue5:null,
          treeValue6:["2-1-1", "2-1", "2-2-2", "2-2-3" ],
        };
    },
    components: {
        TreeSelect
    },

    methods: {

    }
};
</script>

