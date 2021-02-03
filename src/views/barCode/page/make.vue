<template>
    <div>
        <span class="my-item" v-for="(item,index) in list" :key="index">
            <Qrcode :sid="item.id" :text="item.text" :swidth="150" :color="item.color" />
        </span>
    </div>
</template>

<script>
    import Qrcode from "@/components/qrcode/qrcode"
    export default {
        name: 'makeBarCode',
        data() {
            return {
                list:[
                    {
                        id:"1",
                        text:"sdjkfjskdjfksjd",
                        color:"green",
                    },
                    {
                        id:"2",
                        text:"sdfsdfkjskj",
                        color:"yellow",
                    },
                    {
                        id:"3",
                        text:"sdfgggggggggggg",
                        color:"red",
                    },
                    {
                        id:"4",
                        text:"aaaaaaaaaaaaaa",
                        color:"gray",
                    },
                    {
                        id:"5",
                        text:"aaaaaaabbbbbbaaaaaaa",
                    },
                ]
            }
        },
        components:{
            Qrcode,
        },
    }
</script>

<style lang="scss" scoped>
    .my-item{
        padding: 20px;
    }
</style>