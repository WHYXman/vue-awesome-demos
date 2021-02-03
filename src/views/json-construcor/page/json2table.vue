<template>
    <div class="home" style="background-color:#fff;margin-top:30px;">
        <json2table
            ref="customTable"
            :data="tableData"
            style="width:100%"
            :columnConfigList.sync="columnConfigList"
            @handleSelectionChange="handleSelectionChange"
            @rowClick="rowClick"
            @rowDblclick="rowDblclick"
            @cellClick="cellClick"
            :configKey="1"
        >
            <!-- 插槽向父组件传递scope slotProps形参 获取数据slotProps.scope.row
      slotProps.scope.column -->
            <template
                slot="province"
                slot-scope="slotProps"
            >
                <i class="el-icon-eleme"></i>
                <span>{{ slotProps.scope.row["province"] }}</span>
            </template>
        </json2table>
    </div>
</template>

<script>
import Json2Table from '@/components/JsonTable'
import { tableData } from './data'
export default {
    name: "Home",
    components:{
        'json2table':Json2Table,
    },
    data() {
        return {
            columnConfigList: [
                { type: 'index',prop:'$index', label: '序号' ,isHidden:true},
                { type: 'selection',prop:'$selection' },
                {
                    label: "日期",
                    prop: "date",
                },
                {
                    label: "名字",
                    prop: "name",
                    children: [
                        {
                            label: "名",
                            prop: "m",
                        },
                        {
                            label: "姓",
                            prop: "x",
                        },
                    ],
                },
                {
                    label: "地址",
                    prop: "address",
                    isTooltip: true,
                },
                { label: "市", prop: "province", isCustom: true },
                { label: "标签", prop: "tag", },
                { type: 'operation',prop:'$operation', editBtn: true, checkBtn: true, },
            ],
            tableData: tableData,
        };
    },
    methods: {
        show(index) {
            console.log(index);
        },

        handleSelectionChange(arr) {
            console.log(arr);
        },

        rowClick(row, column, event) {
            console.log(row + "行点击");
        },
        rowDblclick(row, column, event) {
            console.log(row + "行双击");
        },
        cellClick(row, column, event) {
            console.log(row + "单元格点击");
        },
    },
};
</script>
