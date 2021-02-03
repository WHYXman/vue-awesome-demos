<template>
    <div class="table-box">
        <div
            class="conmon_header_title"
        >
            <span class="title_icon"></span>
            <span class="title_label">查询结果</span>
            <i
                class="el-icon-setting"
                style="cursor:pointer;"
                @click="dialogVisible=true"
            ></i>
        </div>
        <el-table
            v-loading="loading"
            element-loading-text="加载中..."
            v-if="showTable"
            ref="glTableRef"
            :data="data"
            highlight-current-row
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            @cell-click="doCellClick"
            @selection-change="handleSelectionChange"
            @current-change="handleCurrentChangeTable"
            row-key="id"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <template v-for="(item,index) in columnConfigList">
                <!-- 序号 -->
                <el-table-column
                    :key="index"
                    v-if="item.type == 'index' && !item.isHidden"
                    type="index"
                    :label="item.label?item.label:'序号'"
                    :width="item.width?item.width:50"
                    :align="item.align || defaultAlign"
                ></el-table-column>
                <!-- 默认展示复选框 -->
                <el-table-column
                    :key="index"
                    v-else-if="item.type == 'selection' && !item.isHidden"
                    type="selection"
                    :align="item.align || defaultAlign"
                ></el-table-column>
                <!-- 操作列 -->
                <!-- 编辑类型列 -->
                <el-table-column
                    v-else-if="item.type == 'operation' && !item.isHidden"
                    :key="index"
                    :label="item.label ? item.label : '操作'"
                    :width="item.width ? item.width : 200"
                    :min-width="item.minWidth ? item.minWidth : 150"
                    :align="item.align || defaultAlign"
                    :header-align="item.align || defaultAlign"
                >
                    <template slot-scope="scope">
                        <slot
                            name="editBtn"
                            :row="scope.row"
                            :scope="scope"
                        ></slot>
                        <el-button
                            v-if="item.editBtn"
                            @click="edit(scope.row, scope.$index)"
                            type="text"
                            class="el-icon-edit"
                        >编辑</el-button>
                        <el-button
                            v-if="item.checkBtn"
                            @click="look(scope.row)"
                            class="el-icon-view"
                            type="text"
                        >查看</el-button>
                        <el-button
                            v-if="item.deleteBtn"
                            @click="del(scope.row, scope.$index)"
                            type="text"
                            icon="el-icon-delete"
                        >删除</el-button>
                        <slot
                            name="editAfterBtn"
                            :row="scope.row"
                            :scope="scope"
                        ></slot>
                    </template>
                </el-table-column>
                <!-- 展示类型列 -->
                <el-table-column
                    v-if="!item.type && !item.isHidden"
                    :key="index"
                    :label-class-name="item.labelClassName?item.labelClassName:''"
                    :label="item.label"
                    :show-overflow-tooltip="item.isTooltip || false"
                    :align="item.align || defaultAlign"
                    :width="item.width || ''"
                    :min-width="item.minWidth || ''"
                    :header-align="item.align || defaultAlign"
                >
                    <template slot-scope="scope">
                        <!-- 常规 -->
                        <span v-if="!item.isCustom">{{
                    scope.row[item.prop]
                }}</span>
                        <!-- 自定义 -->
                        <slot
                            v-else
                            :name="item.prop"
                            :scope="scope"
                        />
                    </template>
                    <!-- 组合列 -->
                    <el-table-column
                        v-for="(ele, eli) in item.children"
                        :key="`${index}.children.${eli}`"
                        :width="ele.width || ''"
                        :label="ele.label"
                        :align="ele.align || defaultAlign"
                        :header-align="ele.align || defaultAlign"
                    >
                        <template slot-scope="scope">
                            <span v-if="!ele.isCustom">
                                {{ scope.row[ele.prop] }}
                            </span>
                            <slot
                                v-else
                                :name="ele.prop"
                                :scope="scope"
                            />
                        </template>
                    </el-table-column>
                </el-table-column>
            </template>
        </el-table>
        <!-- 配置参数信息 -->
        <el-dialog
            :visible.sync="dialogVisible"
            :before-close="beforeClose"
            @open="dialogOpen"
            width="30%"
            title="配置显示字段"
            :append-to-body="true">
            <div class="config-header">
                <div class="config-left">是否显示</div>
                <div class="config-center">显示字段</div>
                <div class="config-right">拖拽</div>
            </div>
            <draggable
                v-model="dialogTableData"
                @start="onStart"
                @end="dragTableEnd"
                animation="1000"
                class="drag"
            >
                <div
                    class="config-item"
                    v-for="(item, index) in dialogTableData"
                    :key="item.label + `${index}`">
                    <div class="config-left">
                        <el-checkbox :disabled="item.disabled" v-model="item.isShow"></el-checkbox>
                    </div>
                    <div class="config-center">{{ item.label }}</div>
                    <div class="config-right">
                        <svg-icon class="drag-handler" icon-class="drag" />
                    </div>
                </div>
            </draggable>
            <template slot="footer">
                <el-button @click="resetConfig">恢复默认</el-button>
                <el-button
                    type="primary"
                    @click="configSave"
                >保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>

import draggable from "vuedraggable";
import {deepClone} from '@/utils'
export default {
    components: {
        draggable,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        isMultipleSelect: {
            type: Boolean,
            default: true,
        },
        configKey: {
            type: Number || String,
        },
        columnConfigList: {
            type: Array,
            default: () => {
                return [];
            },
        },
        loading:{
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            defaultAlign: "center",
            dialogVisible: false,
            selectArray: [],
            showTable: true,
            dialogTableData: [],
            firstOpenDialog:true,
            drag: false,
        };
    },
    created(){
        //保存的原始配置，用于重置
        this.oldColumnConfigList = deepClone(this.columnConfigList.slice());
    },
    mounted() {
        this.initTableConfig();
    },

    methods: {
        //主table的checkbox change
        handleCurrentChangeTable(val) {
          this.$emit("handleCurrentChangeTable", val);
        },
        handleSelectionChange(val) {
            this.selectArray = val;
            if (this.isMultipleSelect == false) {
                // 单选
                if (val.length == 0) {
                    this.$emit("handleSelectionChange", this.selectArray);
                }
                if (this.selectArray.length > 1) {
                    this.$refs.glTableRef.toggleRowSelection(this.selectArray[0]);
                }
                if (this.selectArray.length == 1) {
                    this.$emit("handleSelectionChange", this.selectArray);
                }
            } else {
                // 多选
                this.$emit("handleSelectionChange", this.selectArray);
            }
        },

        rowClick(row, column, event) {
            this.$emit("rowClick", row, column, event);
        },
        rowDblclick(row, column, event) {
            this.$emit("rowDblclick", row, column, event);
        },
        doCellClick(row, column, event) {
            this.$emit("cellClick", row, column, event);
        },

        //  编辑
        edit(row, index) {
            console.log(row, index, "编辑");
            this.$emit("edit", row, index);
        },

        //  查看
        look(row) {
            console.log(row, "查看");
            this.$emit("look", row);
        },

        //  删除
        del(row, index) {
            console.log(row, index, "删除");
            this.$emit("del", row, index);
        },
        //打开设置弹窗
        dialogOpen() {
            if(!this.firstOpenDialog) return; //如果再次打开不用初始化数据
            let result = this.getLocalConfig();

            //读取配置
            this.dialogTableData = result.map((item, i) => {
                let label = item.label;
                if(item.type == 'selection' && !item.label) label = "复选框";
                if(item.type == 'operation' && !item.label) label = "操作";
                return {
                    label,
                    prop: item.prop,
                    isShow: !item.isHidden,
                }
            });
            /*和初始数据做对比，初始isHidden为true,isShow为true，结果isShow为false
            * 业务是否展示优先级大于配置是否展示
            */
            this.dialogTableData.forEach(item=>{
                let temp = this.oldColumnConfigList.filter(i=>i.prop == item.prop)[0];
                if(temp.isHidden){
                    item.disabled = true; //不让修改
                    item.isShow = false;
                }
            })
            //置为非第一次打开
            this.firstOpenDialog = false;
        },

        //优先获取本地配置，如没有则直接通过父组件生成
        getLocalConfig(){
            let localConfigStr = localStorage.getItem(this.getLocalKey());//获取本地存储配置
            let result = this.columnConfigList;
            if(localConfigStr){//获取本地配置
                let localConfig = JSON.parse(localConfigStr);
                if(localConfig[this.$route.path+ this.configKey]){
                    result = this.getSetConfig(localConfig[this.$route.path+ this.configKey]);
                }
            }
            return result;
        },
        getSetConfig(arr){//获取设置的配置
            let temp = this.columnConfigList.slice();
            return arr.map(item=>{
                let one = temp.filter(i=>{
                    return i.prop == item.prop;
                })[0];
                //isShow如果没有表示直接展示，如果有值表示要取反
                one.isHidden = item.isShow === undefined? false:!item.isShow;
                return one;
            });
        },

        //  初始化配置,读取本地存储配置
        initTableConfig() {
            // 获取表格配置项
            let config = JSON.parse(localStorage.getItem(this.getLocalKey())) || {};
            // 比对路由获取对应路由和key下的表格配置项
            let param = this.$route.path + this.configKey;
            // 如果能获取到用户本地配置项，则采用配置项，否则采用拷贝的视图配置
            if (config[param]) {//本地有数据
                //获取本地配置更新
                let result = this.getLocalConfig();
                this.$emit('update:columnConfigList',result);
                this.reDrawTable();
            }
        },

        beforeClose() {
            this.dialogVisible = false;
        },

        //  保存设置
        configSave() {
            /**
             * 将更改后的配置项存储到localstorage中
             */
            let config = localStorage.getItem(this.getLocalKey())
                ? JSON.parse(localStorage.getItem(this.getLocalKey()))
                : {};
            let param = this.$route.path + this.configKey;
            let copy = this.dialogTableData.map(item=>{
                return {
                    prop:item.prop,
                    isShow: item.isShow?undefined:false,
                }
            })
            config[param] = copy;
            localStorage.setItem(this.getLocalKey(), JSON.stringify(config));
            //修改父组件的配置项，改变配置
            let result = this.getSetConfig(this.dialogTableData);
            this.$emit('update:columnConfigList',result);
            this.reDrawTable();//重绘
            this.dialogVisible = false;
            this.$message({
                message: "保存配置成功!",
                type: "success",
            });
        },

        // 重置表头配置
        resetConfig() {
            this.$confirm("恢复默认将删除已保存的配置，确定重置吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    //获取表格配置项
                    let config = JSON.parse(localStorage.getItem(this.getLocalKey()));
                    //删除对应的配置项
                    let param = this.$route.path + this.configKey;
                    delete config[param];
                    localStorage.setItem(this.getLocalKey(), JSON.stringify(config));

                    //重新渲染主页面各项
                    let newArr = deepClone(this.oldColumnConfigList.slice());
                    this.$emit('update:columnConfigList',newArr );
                    this.firstOpenDialog = true;

                    this.reDrawTable();

                    this.dialogVisible = false;
                })
                .catch(() => { });
        },
        //重绘表格
        reDrawTable(){
            this.$refs.glTableRef.doLayout();
            this.showTable = false;
            this.$nextTick(() => {
                this.showTable = true;
            });
        },
        onStart() {
            this.drag = true;
        },
        getTableInstance(){
            return this.$refs.glTableRef;
        },
        //  拖拽结束事件
        dragTableEnd() {
            this.drag = false;
        },
        getLocalKey(){
            //这里最好加上对应的userId,这样不同用户就可以互不影响
            return "json2table";
        }
    },
};
</script>>


<style lang="scss">
//  {
    .config-header,.config-item{
        display: flex;
        border-bottom: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        padding: 12px 0;
        .config-left{
            width: 70px;
            text-align: center;
        }
        .config-center{
            flex: 1;
            text-align: center;
        }
        .config-right{
            width: 120px;
            text-align: center;
        }
    }
    .config-header{
        color: #000000;
        background-color: #f7fbfe;
        border-top: 1px solid #ebeef5;
    }
    .table-box{
        thead{
            th .is-required:before{
                content:'*';
                color:red;
                display:inline-block;
            }
        }
    }
// }
</style>
