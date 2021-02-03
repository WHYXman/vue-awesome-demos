    <template>
        <!-- <div :id="name" :class="!color ? 'qrcode-black' : color=='green'?'qrcode-green':color=='yellow'?'qrcode-yellow':'qrcode-red'"></div> -->
        <div :id="name" :class="renderColor(color)"></div>
    </template>
    <script>
    import QRcode from 'qrcodejs2';
    
    export default {
      name: 'qrcode',
      data() { 
        return {
            qrcode:'',
            colorArr: ['#3D783D','#FFC108','red', '#D3D3D3'],//绿，黄，红, 灰
        }
      },
      computed:{
            name:{
                get(){
                    let sid = 'qrcode';
                    if(this.sid){
                        sid = this.sid;
                    }
                    return sid;
                },
                set(value){
                    this.name = value;
                }
            },
            value:{
                get(){
                    let value = '';
                    if(this.text){
                        value = this.text;
                    }
                    return value;
                },
                set(value){
                    this.value = value;
                }
            },
            qrwidth(){
                let width = 0;
                if(this.swidth){
                    width = this.swidth;            
                }
                else{
                    width = 5.33;                   
                }
                return width;
            },
            qrColor(){
                let colorResult = "";
                let colorIndex = 0;
                if(this.color){
                    switch(this.color){
                        case "green":
                            colorIndex = 0;
                            break;
                        case "yellow":
                            colorIndex = 1;
                            break;
                        case "red":
                            colorIndex = 2;
                            break;
                        case 'gray':
                            colorIndex = 3;
                            break;    
                    }
                    colorResult = this.colorArr[colorIndex];            
                }else{
                    colorResult = "black";                   
                }
                return colorResult;
            },

      },
      props:{
            sid:{
                type:String
            },
            text:{
                type:String
            },
            color:{
                type:String
            },
            swidth:{
                type:Number
            }
      },
      methods:{
            renderColor(color) {
                if (color) {
                    switch (color) {
                        case 'green':
                            return 'qrcode-green';
                            break;
                        case 'yellow':
                            return 'qrcode-yellow';
                            break;
                        case 'red':
                            return 'qrcode-red';
                            break; 
                        case 'gray':
                            return 'qrcode-gray';
                            break;  
                    }
                } else {
                    return 'qrcode-black'
                }

            },
            makeQrcode() {  
                if(this.qrcode){
                    // qrcode.clear();
                    // qrcode.makeCode('new content');
                    this.qrcode = null;
                }
                else{
                     this.qrcode = new QRcode(this.name, {  
                        width: this.qrwidth,  
                        height: this.qrwidth, // 高度  
                        text: this.value, // 二维码内容
                        colorDark: this.qrColor, //颜色
                        correctLevel : QRcode.CorrectLevel.H  
                        //容错级别，可设置为：(低到高)
                        // QRCode.CorrectLevel.L
                        // QRCode.CorrectLevel.M
                        // QRCode.CorrectLevel.Q
                        // QRCode.CorrectLevel.H 
                        
                        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                        // background: '#f0f'  
                        // foreground: '#ff0'  
                    })  
                }
            }
      },
      destroyed(){
            this.qrcode = null;
      },
      mounted(){
          this.makeQrcode();
      }
     }
    </script>
    <style lang="scss" scoped>
        .qrcode-green {
            border: 1.5px solid rgba(65, 117, 5, 1);
            padding: 5px;
            display: inline-block;
        }
        .qrcode-black {
            border: 1.5px solid black;
            padding: 5px;
            display: inline-block;
        }

        .qrcode-red {
            border: 1.5px solid red;
            padding: 5px;
            display: inline-block;
        }
        .qrcode-yellow {
            border: 1.5px solid #FFC108;
            padding: 5px;
            display: inline-block;
        }
        .qrcode-gray{
            border: 1.5px solid #D3D3D3;
            padding: 5px;
            display: inline-block;
        }
    </style>
