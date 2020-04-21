<template>
    <div class='header'>
        <div class="content mainContent height">
            <div class="blackOverlayOpacity height"></div>
            <div class="roomImg height" v-if='bannerImg !== ""'>
                <img :src="bannerImg">
            </div>
            <div class="info">
                <a href="/" class="logo logoWhite font-medium">
                    <div class="lineDirection top-line"></div>
                    <div class="lineDirection left-line"></div>
                    <h1>White<br/>Space</h1>
                </a>
                <div class="infoDetail">
                    <div class="socialMedia">
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-instagram"></i>
                    </div>
                    <ul class="contact">
                        <li>
                            <i class="fas fa-phone-alt"></i>
                            <span>02-17264937</span>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <span>whitespace@whitespace.com.tw</span>
                        </li>
                        <li>
                            <i class="fas fa-home"></i>
                            <span>台北市羅斯福路十段30號</span>
                        </li>
                    </ul>
                </div>
            </div>           
        </div>

    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    data(){
        return{
            bannerImg: '',
        }
    },
    created(){
        this.getBanner();
    },
    computed:{
        ...mapState([ 'vAllRoomData', 'bGetAllData' ])
    },
    methods:{
        getBanner(){
            if(this.bGetAllData){
                const len = this.vAllRoomData.length;
                const idx = Math.floor(Math.random()*len);
                this.bannerImg = this.vAllRoomData[idx].imageUrl;
            }
        }
    },
    watch:{
        bGetAllData(){
            this.getBanner();
        }
    }
}
</script>

<style lang="scss">
    /*-------HOMEPAGE SETTING-------*/
    .header{
        display: flex;
        justify-content: center;
    }
    .height{
        height: 75vh;
    }
    .mainContent{
        width: 100vw;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .blackOverlayOpacity{
        position: absolute;
        top:0;
        right:0;
        left:0;
        background: linear-gradient(180deg, $color-sec 0%, $color-thir 100%);
        z-index: -1;
    }

    .roomImg{
        width: 100vw;
        @include over-hidden;

        position: absolute;
        top:0;
        bottom: 0;
        right:0;
        left:0;
        z-index: -2;
        img{
            height: auto;
            width: 120%;
            // position: absolute;
            // bottom: 0;
            @include s768{
                min-height: 120%;
                max-height: 140%;
                width: auto;
                min-width: 100%;
            }
        }
    }
    // info //
    .info{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    // LOGO
    .logo{
        display: inline-flex;
        align-items: center;
        justify-content: center;

        position: relative;
        @include pointer;
        text-decoration: none;
        transition: all .8s;
    }

    .logoWhite{
        width: 148px;
        height: 148px;
        border: 2px solid $color-master;
        color: $color-master;
        h1{
            font-family: NotoSansCJKtc-Medium;
            font-size: $fontsize-xl;
            letter-spacing: $letter-spc-m;
            line-height: $line-h-sec;
        }
        &:hover{
            background-color: $color-master;
            h1{
                color: $color-thir;
            }
        }
        .top-line{
            width: 148px;
            height: 14px;

            top: -14px;
            left: -14px;
        }
        .left-line{
            width: 14px;
            height: 138px;
            
            top: 0;
            left: -14px;
        }
    }
    // infoDetail
    .infoDetail{
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        color: $color-master
    }

    .socialMedia{
        width: 120px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid $color-master;
        i{
            margin: 0 5px;
            font-size: $fontsize-l;
            padding: 5px;
            transition: all .3s;
            @include pointer;
            &:hover{
                color:$color-nine;
                text-shadow: 0 0 10px $color-master;
            }
        }
        @include s420{
            flex-direction: column;
            width: 60px;
            i{
                margin: 10px 5px;
            }
        }
    }

    .contact{
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 27px;
        word-break: break-all;
        position: relative;
        margin-left: 30px;
        li{
            margin: 6.5px 0;
        }
        i{
            position: absolute;
            left: -5px;
        }
    }
</style>