<template>
    <div class="form-box">
        <div
            class="conmon_header_title"
        >
            <span class="title_icon"></span>
            <span class="title_label">查询选项</span>
            <i
                class="el-icon-setting"
                style="cursor:pointer;"
                @click="dialogVisible=true"
            ></i>
        </div>
        <el-form
            ref="innerForm"
            style="padding-top:20px;"
            size="mini"
            v-bind="$attrs"
            v-on="$listeners"
            :rules="rules"
            :label-width="$attrs.labelWidth?$attrs.labelWidth:'145px'"
            label-suffix="："
        >
            <div class="flex-box">
                <div :style="calColWidth(item)" v-show="!item.isHidden"
                    v-for="item in formItemConfig"
                    :key="item.model">
                    <el-form-item
                        :prop="item.model"
                        :label-width="item.labelWidth">
                        <template slot="label">
                            <span :title="item.label">{{item.label}}</span>
                        </template>
                        <!-- 输入框 input -->
                        <el-input
                            :style="{ width: item.width?item.width:'100%'}"
                            v-if='item.type=="input"'
                            v-model="$attrs.model[item.model]"
                            :placeholder="item.placeholder"
                            :prefix-icon="item.icon"
                            :disabled="item.disabled?item.disabled:false"
                            :maxlength="item.maxlength?item.maxlength:9999"
                            clearable
                            @change="handleChange($event,item.change,item)"
                            :onkeyup="item.onkeyup"
                            :onafterpaste="item.onafterpaste"
                        >
                            <template
                                v-if="item.prepend"
                                slot="prepend"
                            >{{item.prepend}}</template>
                            <template
                                v-if="item.append"
                                slot="append"
                            >{{item.append}}</template>
                        </el-input>
                        <!-- 普通选择框 select -->
                        <el-select
                            :style="{ width: item.width?item.width:'100%'}"
                            v-if='item.type=="select"'
                            v-model="$attrs.model[item.model]"
                            :multiple="item.multiple"
                            :placeholder="item.placeholder"
                            :prefix-icon="item.icon"
                            @change="handleChange($event,item.change,item)"
                            @visible-change="handleChange($event,item.visibleChange,item)"
                            :disabled="item.disabled?item.disabled:false"
                            :popper-append-to-body="item.popperAppendToBody === undefined ?true:item.popperAppendToBody"
                            clearable
                            :filterable="item.filterable?item.filterable:false"
                        >
                            <el-option
                                v-for="i in item.options"
                                :key="i.value"
                                :label="i.label"
                                :value="i.value"
                            >
                            </el-option>
                        </el-select>
                        <!-- 基础组件集合，一个单元格里同时存在多个基础组件 -->
                        <div
                            class="custom-group"
                            :style="{ width: item.width?item.width:'100%'}"
                            v-if='item.type=="customGroup"'
                        >
                            <template v-for="innerItem in item.group">
                                <el-select
                                    :style="{ width: item.width?item.width:'100%'}"
                                    v-if='innerItem.type=="select" && !innerItem.isHidden'
                                    v-model="$attrs.model[innerItem.model]"
                                    :multiple="innerItem.multiple"
                                    :placeholder="innerItem.placeholder"
                                    :prefix-icon="innerItem.icon"
                                    @change="handleGroupItemChange($event,innerItem.change,item,innerItem)"
                                    @visible-change="handleChange($event,innerItem.visibleChange,innerItem)"
                                    :disabled="innerItem.disabled?innerItem.disabled:false"
                                    clearable
                                >
                                    <el-option
                                        v-for="o in innerItem.options"
                                        :key="o.value"
                                        :label="o.label"
                                        :value="o.value"
                                    >
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <!-- 日期 daterange -->
                        <el-date-picker
                            :style="{ width: item.width?item.width:'100%'}"
                            v-if='"daterange,date,datetimerange,datetime,monthrange,year,month".includes(item.type)'
                            :type="item.type"
                            v-model="$attrs.model[item.model]"
                            :placeholder="item.placeholder"
                            @change="handleChange($event,item.change,item)"
                            :disabled="item.disabled?item.disabled:false"
                            clearable
                        >
                        </el-date-picker>
                        <!-- 单选框 radio -->
                        <el-radio-group
                            :style="{ width: item.width?item.width:'100%'}"
                            v-if='item.type=="radio"'
                            v-model="$attrs.model[item.model]"
                            @change="handleChange($event,item.change,item)"
                            :disabled="item.disabled?item.disabled:false"
                            clearable
                        >
                            <el-radio
                                v-for="i in item.options"
                                :key="i.value"
                                :label="i.value"
                            >
                                {{i.label}}
                            </el-radio>
                        </el-radio-group>
                        <!-- 多选框 checkbox -->
                        <el-checkbox-group
                            :style="{ width: item.width?item.width:'100%'}"
                            v-if='item.type=="checkbox"'
                            v-model="$attrs.model[item.model]"
                            @change="handleChange($event,item.change,item)"
                            :disabled="item.disabled?item.disabled:false"
                            clearable
                        >
                            <el-checkbox
                                v-for="i in item.options"
                                :name="i.model"
                                :key="i.value"
                                :label="i.value"
                            >
                                {{i.label}}
                            </el-checkbox>
                        </el-checkbox-group>
                        <!-- 开关 switch-->
                        <el-switch
                            v-if='item.type=="switch"'
                            v-model="$attrs.model[item.model]"
                            @change="handleChange($event,item.change,item)"
                            :disabled="item.disabled?item.disabled:false"
                            clearable
                        >
                        </el-switch>
                        <!-- 文本域 textarea -->
                        <el-input
                            :style="{ width: item.width?item.width:'100%'}"
                            v-if='item.type=="textarea"'
                            type="textarea"
                            v-model="$attrs.model[item.model]"
                            @change="handleChange($event,item.change,item)"
                            :disabled="item.disabled?item.disabled:false"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                </div>
                <div :style="{width:btnConfig.colSpan?btnConfig.colSpan/24*100+'%':'25%','margin-left':'auto'}" v-if="!btnConfig.isHidden"
                    key="btns">
                    <el-form-item align="right" label-width="0">
                        <el-button @click="doReset">{{btnConfig.resetBtnText || '重置'}}</el-button>
                        <el-button
                            type="primary"
                            :loading="btnConfig.isLoading"
                            @click="doSubmit"
                        >{{btnConfig.submitBtnText || '查询'}}</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <!-- 配置参数信息 -->
        <el-dialog
            width="30%"
            class="configParamDialog"
            @open="dialogOpen"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            title="配置查询条件"
        >
            <div class="config-header">
                <div class="config-left">是否显示</div>
                <div class="config-center">显示字段</div>
                <div class="config-right">拖拽</div>
            </div>
            <draggable
                v-model="tableData"
                @start="onStart"
                @end="dragTableEnd"
                animation="1000"
                class="drag"
            >
                <div
                    class="config-item"
                    v-for="(item, index) in tableData"
                    :key="item.label + `${index}`">
                    <div class="config-left">
                        <el-checkbox :disabled="item.disabled" v-model="item.isShow"></el-checkbox>
                    </div>
                    <div class="config-center">
                        <span :class="{required:item.required}">{{item.label}}</span>
                    </div>
                    <div class="config-right">
                        <svg-icon class="drag-handler" icon-class="drag" />
                    </div>
                </div>
            </draggable>
            <template slot="footer">
                <el-button @click="doResetConfig">恢复默认</el-button>
                <el-button
                    type="primary"
                    @click="doSetSave"
                >保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import {deepClone} from '@/utils'
export default {
    name: '',
    data() {
        return {
            dialogVisible: false,//弹窗
            tableData: [],
            firstOpenDialog: true,
            drag:false,
        }
    },
    components: {
        draggable,
    },
    props: {
        //表单项配置参数
        formItemConfig: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        btnConfig: {//下一行按钮配置
            type: Object,
            default: () => {
                return {
                    isSubmitBtnHidden: false,//是否隐藏查询按钮
                    submitBtnText: "查询",//查询按钮名字
                    isResetBtnHidden: false,//是否隐藏重置按钮
                    resetBtnText: "重置",//重置按钮名字
                };
            }
        },
        setConfig: {//整体设置配置
            type: Object,
            default: () => {
                return {
                    isHeaderShow: true,//设置的form头是否展示，默认展示
                };
            }
        },
        rules: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    created() {
        this.originalFormItemConfig = deepClone(this.formItemConfig.slice());//保存的原始配置，用于重置
      if (this.formItemConfig.length > 0) {
            this.formItemConfig.forEach(item => {
                //默认值设置
                let emptyVal = "";//空值
                if (item.type == "checkbox") {
                    emptyVal = [];
                } else if (item.type == "switch") {
                    emptyVal = false;
                } else if (item.type == "fileList") {
                    emptyVal = [];
                } else if (item.type == "selectTree") {
                    if (item.multiple) {//多选
                        emptyVal = [];
                    } else {
                        emptyVal = null;
                    }
                }
                this.$set(this.$attrs.model, item.model, item.default || emptyVal);
            });
        }
    },
    mounted() {
        let localConfigStr = localStorage.getItem(this.getLocalKey());
        if (localConfigStr && JSON.parse(localConfigStr)[this.$route.path]) {
            //获取本地配置更新
            let result = this.getLocalConfig();
            this.$emit('update:formItemConfig', result);
        }
    },
    methods: {
        /**
         * val {String} 改变值
         * fnName {String} 父组件方法名
         * groupItem {Object} 当前form表单项group配置
         * item {Object} 当前form表单项配置
         */
        handClick(){
          this.originalFormItemConfig = deepClone(this.formItemConfig.slice());
          this.$emit('update:formItemConfig', this.originalFormItemConfig);
          console.log(this.originalFormItemConfig)
          let copy =this.originalFormItemConfig.map(item => {
            return {
              model: item.model,
              isShow: item.isShow?undefined:true,
            }
          })
          let localFormConfig = JSON.stringify({ [this.$route.path]: copy })
          localStorage.setItem(this.getLocalKey(), localFormConfig);
          },
        handleChange(val, fnName, item) {
            if (!fnName) return;
            if(this.$parent[fnName]){
                this.$parent[fnName](val, item);
            }else if(this.$parent.$parent.$parent[fnName]){//折叠情况
                this.$parent.$parent.$parent[fnName](val, item)
            }
            
        },
        handleGroupItemChange(val, fnName, groupItem, item) {
            if (!fnName) return;
            if(this.$parent[fnName]){
                this.$parent[fnName](val, groupItem, item)
            }else if(this.$parent.$parent.$parent[fnName]){//折叠情况
                this.$parent.$parent.$parent[fnName](val, groupItem, item)
            }
        },

        /**
         * 改变父组件的formItemConfig，一般用于方便设置异步option选项操作
         * model {String} 每一项的唯一标识 实际就是formItemConfig中每一项的model值
         * key {String} 要操作的实际数据的key
         * newData {Array} 设置的新数据
         */
        setItemsConfigByKey(model, key, newData) {
            let temp = this.formItemConfig.slice();
            let one = temp.filter(item => item.model == model)[0];
            one[key] = newData;
            this.$emit('update:formItemConfig', temp);
        },
        /**
         * 改变父组件的formItemConfig，一般用于方便设置异步option选项操作
         * 仅限于针对修改customGroup项
         * pModel {String} 父model 实际就是formItemConfig中每一项的model值
         * cModel {String} 子model customGroup中每一项的model值
         * key {String} 要操作的实际数据的key
         * newData {Array} 设置的新数据
         */
        setGroupItemsConfigByKey(pModel, cModel, key, newData) {
            let temp = this.formItemConfig.slice();
            let parentItem = temp.filter(item => item.model == pModel)[0].group;
            let childItem = parentItem.filter(item => item.model == cModel)[0];
            childItem[key] = newData;
            this.$emit('update:formItemConfig', temp);
        },
        doSubmit() {
            this.$refs.innerForm.validate((valid, obj) => {
                if (valid) {
                    this.$emit('doSubmit');
                }
            })
        },
        doReset() {
            this.$refs.innerForm.resetFields();
            this.$emit('doReset');
        },
        calColWidth(item){
            let defaultWidth = '25%';
            // 日期range需要在低分辨率下增大宽度
            if(["daterange","datetimerange"].includes(item.type)){
                let client = document.body.offsetWidth;
                if(client <= 1440){
                    defaultWidth = '50%';
                }
            }
            return {width:item.colSpan?item.colSpan/24*100+'%':defaultWidth}
        },
        getForm() {//获取当前form实例
            return this.$refs.innerForm;
        },
        /**
         * 弹窗部分逻辑
         */
        dialogOpen() {
          console.log(this.firstOpenDialog)
            if(!this.firstOpenDialog) return; //如果再次打开不用初始化数据
            let rules = this.rules;
            console.log(this.rules)
            this.tableData = [];

            let result = this.getLocalConfig();
            this.tableData = result.map((item, i) => {
                let o = rules[item.model];
                return {
                    label: item.label,
                    model: item.model,
                    isShow: !item.isHidden,
                    required: o ? o.some(m => m.required) : false,
                }
            });
            /*和初始数据做对比，初始isHidden为true,isShow为true，结果isShow为false，disabled为true
            * required为true, disabled 为true , isShow 为true
            * required为true优先级大于初始数据的isHidden优先级
            * 业务是否展示优先级大于配置是否展示
            */
            this.tableData.forEach(item=>{
                let temp = this.originalFormItemConfig.filter(i=>i.model == item.model)[0];
                if(temp.isHidden){
                    item.disabled = true; //不让修改
                    item.isShow = false;
                } 
                if(item.required){
                    item.disabled = true; //不让修改
                } 
            })
         
            this.firstOpenDialog = false;
        },
    
        doResetConfig() {//配置重置
            this.$confirm("恢复默认将删除已保存的配置，确定重置吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.dialogVisible = false;
                    //清除本地缓存
                    let key = this.$route.path;
                    let localFormConfig = localStorage.getItem(this.getLocalKey());
                    if (localFormConfig) {
                        let obj = JSON.parse(localFormConfig);
                        if (obj[key]) delete obj[key];
                        localStorage.setItem(this.getLocalKey(), JSON.stringify(obj));
                    }
                    //重新渲染主页面各项
                    let result = deepClone(this.originalFormItemConfig.slice());
                    let nowItemConfig = this.formItemConfig;
                    result.forEach(item=>{
                        let matched = nowItemConfig.filter(i=>i.model == item.model)[0];
                        //如果是下拉选项，需要保存options
                        if(item.type == "select") item.options = matched.options
                    });
                    this.$emit('update:formItemConfig', result);
                    this.firstOpenDialog = true;
                })
                .catch(() => { });
        },
        doSetSave() {//控制台保存配置
            let key = this.$route.path;
            //存储到localstorage中，只保留有限字段
            let copy = this.tableData.map(item => {
                return {
                    model: item.model,
                    isShow: item.isShow?undefined:false,
                }
            })
            let localFormConfig = JSON.stringify({ [key]: copy })
            localStorage.setItem(this.getLocalKey(), localFormConfig);
            //修改父组件的配置项，改变配置
            let result = this.getSetConfig(this.tableData);
            this.$emit('update:formItemConfig', result);
            this.dialogVisible = false;
            this.$message({
                message: "保存配置成功!",
                type: "success",
            });
        },
        getSetConfig(originalArr) {//获取设置的配置
            let temp = this.formItemConfig.slice();
            return originalArr.map(item => {
                let one = temp.filter(i => {
                    return i.model == item.model;
                })[0];
                //isShow如果没有表示直接展示，如果有值表示要取反
                one.isHidden = item.isShow === undefined? false:!item.isShow;
                return one;
            });
        },
        getLocalConfig() {//获取本地配置
            let localConfigStr = localStorage.getItem(this.getLocalKey());//获取本地存储配置
            let result = this.formItemConfig;
            if (localConfigStr) {//获取本地配置
                let localConfig = JSON.parse(localConfigStr);
                if (localConfig[this.$route.path]) {
                  console.log(localConfig[this.$route.path])
                    result = this.getSetConfig(localConfig[this.$route.path]);
                }
            }
            return result;
        },
        
        onStart() {
            this.drag = true;
        },

        //  拖拽结束事件
        dragTableEnd() {
            this.drag = false;
        },
        getLocalKey(){
            //这里最好加上对应的userId,这样不同用户就可以互不影响
            return "json2form";
        }
    }
}
</script>

<style lang='scss' scoped>
.form-box {
    position: relative;
    background-color: #fff;
    .flex-box{
        display: flex;
        flex-wrap:wrap;
        align-items: flex-start;
    }
    .drag-handler {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .required:before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
    ::v-deep .sortable-ghost {
        opacity: 0.8;
        color: #fff !important;
        background: rgba(44, 183, 245, 1) !important;
    }
    ::v-deep .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }
    ::v-deep .el-form {
        padding: 0 10px;
        .el-form-item__content > .el-checkbox-group {
            //临时解决办法
            font-size: 1px;
        }
    }
    .custom-group {
        display: flex;
        padding-top: 4px;
    }
}
@media screen and (max-width: 1366px) {
    .form-box {
        background-color: #fff;
        .set-box {
            position: absolute;
            left: 102px;
            top: 127px;
        }
    }
}
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
</style>
