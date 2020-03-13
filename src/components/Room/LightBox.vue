<template>
    <div v-if='iImg > -1' class='lightBox' @click.self="closeLightBox">
        <div class='changeImg' @click='changePage(-1)'>
            <div class="preImg"></div>
        </div>
        <div class="imgBlock">
            <img :src="getImgUrl(iImg)">
            <div class="imgNote font-medium">
                <div class="name">{{iThisRoom.name}}</div>
                <div class="page">{{iImg+1}}/{{iTotalImg}}</div>
            </div>
        </div>
        <div class='changeImg' @click='changePage(1)'>
            <div class="nextImg"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: ['giveShowImg'],
    data(){
        return{
            id: this.$route.params.id,
            iTotalImg: 0,
            iThisRoom: [],
            iImg: -1
        }
    },
    computed:{
        ...mapState([ 'vRoomDetail', 'bGetAllDetails']),
    },
    created(){
        this.getRoomDetail()
    },
    methods:{
        // 得到顯示圖片
        getImgUrl(imgIdx){
            return this.iThisRoom.imageUrl[imgIdx];
        },
        // 關掉視窗
        closeLightBox(){
            this.iImg = -1;
            this.$emit('closeImg')
        },
        // 循環換頁
        changePage(plus){
            let iMax = this.iTotalImg -1;
            this.iImg += plus;
            this.iImg = (this.iImg > iMax) ? 0 : ((this.iImg < 0 ) ? iMax : this.iImg);
        },
        // 得到這間房間的資訊
        getRoomDetail(){
            if(this.bGetAllDetails){
                this.iThisRoom = this.vRoomDetail[this.id];
                this.iTotalImg = this.iThisRoom.imageUrl.length;                
            }
        }
    },
    watch:{
        bGetAllDetails(){
            this.getRoomDetail()
        },
        // 存下得到的 id
        giveShowImg(){
            this.iImg = this.giveShowImg;
        }
    }
}
</script>

<style lang="scss" scoped>
    .lightBox{
        width: 100vw;
        height: 100vh;
        z-index: 11;
        background: $color-thir;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 50vw;
            height: auto;
        }
    }
    .changeImg{
        @include pointer;          
        div{
            width: 20px;
            height: 20px;
            border-left: 2px solid $color-master;
            border-bottom: 2px solid $color-master;
            margin: 15px;
            transition: all .3s;
        }
        &:hover>div{
            border-left: 2px solid $color-five;
            border-bottom: 2px solid $color-five;
            box-shadow: -2px 2px 2px $color-four, 2px -2px 2px $color-four inset;
        }
    }
    .preImg{
        transform: rotate(45deg);
    }
    .nextImg{
        transform: rotate(-135deg);
    }
    .imgNote{
        display: flex;
        justify-content: space-between;
        color: $color-master;
        font-size: $fontsize-xs;
        margin-top: 10px;
        letter-spacing: $letter-spc-xs;
    }
</style>