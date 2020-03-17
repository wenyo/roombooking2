<template>
    <div class='btnBox'>
        <div class="bookingBtn">
            <input type="submit" value="預約時段">
            <div class="lineDirectionBlack right-line"></div>
            <div class="lineDirectionBlack bottom-line"></div>
        </div>        
    </div>
</template>

<style lang="scss">
    // booking Btn

    .btnBox{
        position: absolute;
        top: 100vh;
        right: 5vw;
    }
    .bookingBtn{
        display: inline-block;
        position: relative;
        padding: 20px 0;
        input{
            border: none;
            font-size: $fontsize-xs;
            padding: 20px 30px;
            margin-top: 26px;

            background-color: $color-nine;
            color: $color-master;
            @include pointer;
            transition: all .3s;
            &:hover{
                background-color: $color-sev;
                color: $color-nine;
            }
        }
        .right-line{
            width: 10px;
            height: 100%;

            top: 10px;
            right: -10px;
        }
        .bottom-line{
            width: calc(100% - 10px);
            height: 10px;

            bottom: -10px;
            right: 0;
        }
    }

</style>