<template>
    <div>
        <div class="bookAlert" @click.self='closeAlert'>
            <div>
                <div class="title alertContent">
                    <div class='font-medium'>預約時段</div>
                    <div class="lineDirectionBlack shortLine"></div>
                </div>

                <div class="bookingContent alertContent">
                    <label>
                        <span class='font-medium'>姓名</span>
                        <input type="text" class='inputStyle'>
                    </label>
                    <label>
                        <span class='font-medium'>電話</span>
                        <input type="text" class='inputStyle'>
                    </label>
                    <label>
                        <span class='font-medium'>預約起迄</span>
                        <div class="timeInput inputStyle">
                            <input type="date" value='2020-03-20'>
                            <span>~</span>
                            <input type="date" value='2020-03-30'>
                        </div>
                    </label>
                </div>

                <div class="calcDay alertContent">
                    <div class="dayStyle">
                        <span>平日時段</span>
                        <span class='font-medium'>1夜</span>
                    </div>
                    <div class="dayStyle">
                        <span>假日時段</span>
                        <span class='font-medium'>1夜</span>
                    </div>
                </div>

                <div class="totalPrice font-medium alertContent">
                    <span>=</span>
                    <span>NT.1450</span>
                </div>

                <div class="bookBtn alertContent">
                    <span class="cancel" @click.self='closeAlert'>取消</span>
                    <span class="submit">確定預約</span>
                </div>
            </div>
        </div>
        <div class="tooltip"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    created(){
    },
    methods:{
        closeAlert(){
            this.$emit('closeAlert', false);
        }
    }
}
</script>

<style lang="scss">
    // BookAlert
    .bookAlert{
        width: 100vw;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: $color-thir;
        display:flex;
        justify-content: center;
        align-items: center;
        &>div{
            max-width: 423px;
            width: 80%;
            background: $color-master;
            padding: 27px 0;
            box-sizing: border-box;
        }
    }
    .title{
        margin-bottom: 35px;
    }
    .shortLine{
        height: 10px;
        width: 38px;
        position: unset;
        margin: 12px 0;
    }
    .bookingContent{
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        label{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            font-size: $fontsize-xs;
            letter-spacing: $letter-spc-xs;
            &>span{
                width: auto;
                white-space:nowrap;
            }
            input{
                padding: 5px 8px;
                border-radius: 3px;
                border: 1px solid $color-13;
                border-radius: 3px;
            }
        }
    }
    .timeInput{
        display: flex;
        justify-content: space-between;
        align-items: center;
        input{
            width: 45%;
            &::-webkit-clear-button {
                display: none;
            }
        }
    }
    .inputStyle{
        width: 75%;
    }

    .calcDay{
        background: $color-14;
        font-size: $fontsize-xxs;
        padding: 18px 0; 
    }
    .dayStyle{
        display: flex;
        justify-content: space-between;
        margin: 6px 0;
        color: $color-ele;
    }

    .totalPrice{
        color: $color-15;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: $fontsize-l;
        padding: 15px 0;
        span:last-child{
            margin-left: 50px;
        }
    }

    .bookBtn{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        span{
            padding: 9px 24px;
            transition: all .3s;
            font-size: $fontsize-xs;
            @include pointer;
        }
    }

    .cancel{
        background: $color-13;
        color: $color-nine;
        &:hover{
            box-shadow: -3px 3px 6px $color-thir, -3px 3px 6px $color-ele inset;
        }
    }

    .submit{
        background: $color-nine;
        color: $color-master;
        &:hover{
            box-shadow: -3px 3px 6px $color-thir, -3px 3px 6px $color-thir inset;
        }
    }


    .alertContent{
        padding-left: 42px;
        padding-right: 42px;
    }
</style>