<template>
    <div v-if='iImg > -1' class='lightBox'  @click.self="closeLightBox">
        <div class='changeImg' @click='changePage(-1)'>
            <div class="preImg"></div>
        </div>
        <div class="imgBlock">
            <img :src="getImgUrl(iImg)">
            <div class="imgNote font-medium">
                <div class="name">{{vThisRoom.name}}</div>
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
            vThisRoom: [],
            iImg: -1,
        }
    },
    computed:{
        ...mapState([ 'vRoomDetail', 'bGetAllDetails']),
    },
    created(){
        this.getRoomDetail();
        document.addEventListener('keyup', this.listerKeyEvent);
    },
    destroyed(){
        document.removeEventListener('keyup', this.listerKeyEvent);
    },
    methods:{
        // 得到顯示圖片
        getImgUrl(imgIdx){
            return this.vThisRoom.imageUrl[imgIdx];
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
                this.vThisRoom = this.vRoomDetail[this.id].room[0];
                this.iTotalImg = this.vThisRoom.imageUrl.length;                
            }
        },
        // 按鍵監聽
        listerKeyEvent(e){
            if(this.iImg == -1) return;
            if(e.keyCode == 39) {
                this.changePage(1);
            }else if(e.keyCode == 37){
                this.changePage(-1);
            }else if(e.keyCode == 27){
                this.closeLightBox();
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
        width: 100%;
        height: 100%;
        background: $color-thir;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 11;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            max-height: 90vh;
            min-width: auto;
            max-width: 65vw;
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
        @include s420{
            flex-direction: column;
        }
    }
</style>