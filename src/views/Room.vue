<template>
    <div>
        <LightBox :give-show-img='imgIdx' @closeImg='resetShowImg'></LightBox>
        <LogoBlack></LogoBlack>
        <RoomImg @iShowImg='getShowImg'></RoomImg>
        <RoomDetail></RoomDetail>
    </div>
</template>

<script>

import LogoBlack from '../components/Room/logo_black'
import LightBox from '../components/Room/LightBox'
import RoomDetail from '../components/Room/RoomDetail'
import RoomImg from '../components/Room/RoomImg'

import { mapState } from 'vuex';

export default {
    components: { RoomDetail, RoomImg, LogoBlack, LightBox },
    data(){
        return {
            id: this.$route.params.id,
            imgIdx: -1,
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
        }
    }
}
</script>