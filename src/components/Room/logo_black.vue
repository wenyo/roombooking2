<template>
    <div>
        <a href="/" class="logo logoBlack font-medium">
            <div class="lineDirectionBlack top-line"></div>
            <div class="lineDirectionBlack left-line"></div>
            <h1>White Space</h1>
        </a>
    </div>
</template>
<style lang="scss" scoped>
    .logoBlack{
        border: 1px solid $color-five;
        padding: 0 20px;
        position: absolute;
        top: 50px;
        left: 50px;
        z-index: 10;
        transition: all .5s;
        background: $color-twth;
        h1{
            color: $color-five;
            font-size: $fontsize-s;
            line-height: $line-h-sec;
        }
        .top-line{
            width: 100%;
            height: 10px;
            top: -10px;
            left: -10px
        }
        .left-line{
            width: 10px;
            height: 34px;

            top: 0;
            left: -10px;
        }
        &:hover{
            background-color: $color-thir;
            & > h1{
                color: $color-master;
            }
        }
    }
</style>