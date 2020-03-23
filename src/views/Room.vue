<template>
    <div>
        <LightBox :give-show-img='imgIdx' @closeImg='resetShowImg'></LightBox>
        <LogoBlack></LogoBlack>
        <RoomImg @iShowImg='getShowImg'></RoomImg>
        <div class="roomContent content">
            <RoomDetail></RoomDetail>
            <Canlendar @sendBookAlert='getBookAlert'
                        :add-date='addDate'></Canlendar>            
        </div>
        <BookAlert v-if='bShowBook' 
                    @closeAlert='getBookAlert'
                    @showBookingDate='addBookingDate'></BookAlert>
    </div>
</template>

<script>

import LogoBlack from '../components/Room/logo_black'
import LightBox from '../components/Room/LightBox'
import RoomDetail from '../components/Room/RoomDetail'
import RoomImg from '../components/Room/RoomImg'
import Canlendar from '../components/Room/Canlendar'
import BookAlert from '../components/Room/BookAlert'

import { mapState } from 'vuex';

export default {
    components: { RoomDetail, RoomImg, LogoBlack, LightBox, Canlendar, BookAlert },
    data(){
        return {
            id: this.$route.params.id,
            imgIdx: -1,
            bShowBook: false,
            addDate: ''
        }
    },
    computed:{
        ...mapState(['bGetAllData']),
    },
    methods:{
        getShowImg(imgIdx){
            this.imgIdx = imgIdx;
        },
        resetShowImg(){
            this.imgIdx = -1;
        },
        getBookAlert(bShow){
            this.bShowBook = bShow;
        },
        addBookingDate(date){
            this.addDate = date;
        }
    }
}
</script>

<style lang="scss">
    .roomContent{
        margin-top: 90vh;
        display: flex;
        justify-content: space-between;
        @include s768{
            flex-direction: column-reverse;
            align-items: center;
        }
    }
</style>