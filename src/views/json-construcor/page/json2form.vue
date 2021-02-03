<template>
    <div style="margin-top:30px;">
        <json2form
            ref="customForm"
            :model="formFields"
            label-width="150px"
            :formItemConfig.sync="formItemConfig"
            :btnConfig="btnConfig"
            :rules="rules"
            @doSubmit="doSubmit"
            @doReset="doReset"
        >
        </json2form>
        <!-- 展示区，不需要管下面这块代码 -->
        <template v-for="(item) in getFormData" >
            <span>{{item.key}}</span>:<span>{{item.value}}</span><span style="display:inline-block;width:50px;"></span>
        </template>
    </div>
</template>

<script>
import Json2Form from '@/components/JsonForm'
export default {
    name: '',
    components:{
        'json2form':Json2Form,
    },
    data() {
        return {
            formItemConfig: [
                { label: "输入框input", type: "input", model: "input", placeholder: "请输入", default: "default", change: "handleInputChange" },
                //select=>{filterable:true,}
                { label: "select", type: "select", model: "select", options: [], 
                placeholder: "请输入", default: "1" ,change:"handleSelectChange" },
                {label: "date",type: "date",model:"date",placeholder: "请输入",default:"2020-09-23"},
                {label: "year",type: "year",model:"year",placeholder: "请输入",default:"2020"},
                {label: "datetime",type: "datetime",model:"datetime",placeholder: "请输入",default:"2020-09-15 00:00:00"},
                {label: "datetimerange",type: "datetimerange",model:"datetimerange",default:["2020-09-10 00:00:00", "2020-10-05 00:00:00"],colSpan:10},
                {label: "daterange",type: "daterange",model:"daterange",default:["2020-09-08", "2020-10-05"]},
                {label: "monthrange",type: "monthrange",model:"monthrange",default:["2020-09", "2020-10"]},
                {label: "单选radio",type: "radio",model:"radio",options:[{label:"label1",value:"1"},{label:"label2",value:"2"}],default:"2"},
                {label: "多选checkbox",type: "checkbox",model:"checkbox",options:[{label:"label1",value:"1"},{label:"label2",value:"2"}],default:["2"]},
                {label: "开关switch",type: "switch",model:"switch",default:true},
                { label: "输入框input", type: "input", model: "input1", placeholder: "请输入", default: "default", change: "handleInputChange" },
                {label: "文本域textarea",type: "textarea",model:"textarea",default:"123",colSpan:12},
            ],
            btnConfig:{
                // colSpan:5,  //设置按钮的宽度
                // submitBtnText:"查查",//确认按钮中文描述
                // resetBtnText:"重置",//重置按钮中文描述
                // isHidden:true,//是否隐藏按钮区，默认值false.
            },
            
            formFields: {
                input: "",
                input1: "",
                select: "",
                date: "",
                datetime: "",
                datetimerange: "",
                monthrange: "",
                daterange: "",
                radio: "",
                checkbox: [],
                switch: true,
                textarea: "",
                selectTreeMultiple: [],
                selectTreeSingle: null,
            },
            rules:{
                input:[{required: true, message: '请输入活动名称', trigger: 'blur'}],
                selectTreeSingle:[{required: true, message: '请输入下拉树', trigger: 'input'}],
            }
        }
    },
    computed:{
        getFormData(){
            let formFields = this.formFields;
            let arr = [];
            Object.keys(formFields).forEach(key=>{
                arr.push({
                    key,
                    value:formFields[key]
                })
            })
            return arr;
        }
    },
    mounted(){
        this.getSelectOptions()
    },
    methods: {
        handleInputChange(val, item) {
            console.log(val, item, '父组件input改变值');
        },
        handleSelectChange(val,item){
            console.log(val, item, '父组件select改变值');
        },
        handleSelectTreeChange(val,item){
            this.$refs["customForm"].getForm().validateField("selectTreeSingle");
            console.log(val, item, '父组件selectTree改变值');
        },
        doSubmit(){//查询按钮
            
        },
        doReset(){//重置按钮

        },
        getSelectOptions(){//样例
            setTimeout(()=>{
                this.$refs.customForm.setItemsConfigByKey("select","options",[{ label: "label1", value: "1" }, { label: "label2", value: "2" }])
            },2000);
        }
    }
}
</script>

<style lang='scss'>
</style>
