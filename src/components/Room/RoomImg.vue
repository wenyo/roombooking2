<template>
    <div class='imgTeam' v-if='bGetAllDetails'>
        <div v-for='( val, idx ) in vThisRoom.imageUrl' :key='idx' @click='getShowImg(idx)'>
            <img :src="val">
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    data(){
        return{
            id: this.$route.params.id,
            vThisRoom: [],
        }
    },
    computed:{
        ...mapState([ 'vRoomDetail', 'bGetAllDetails' ]),
    },
    created(){
        this.getTisRoom();
    },
    watch:{
        bGetAllDetails(){
            this.getTisRoom();
        },
    },
    methods:{
        getTisRoom(){
            if(this.bGetAllDetails){
                this.vThisRoom = this.vRoomDetail[this.id];
            }
        },
        getShowImg(imgIdx){
            this.$emit('iShowImg', imgIdx)
        }
    }
}
</script>

<style lang="scss" scoped>
    .imgTeam{
        width: 100vw;
        height: 90vh;
        box-shadow: 5px 0 10px $color-thir;
        position: absolute;
        top: 0;
        left: 0;

        display: inline-flex;
        flex-direction: column;
        flex-wrap: wrap;

        @include over-hidden;
        img{
            position: absolute;
            bottom: -20%;
            width: auto;
            min-height: 120%;
            max-width: 200%;
        }
        div{
            width: 30%;
            height: 50%;
            position: relative;
            @include over-hidden;
            @include pointer;
            transition: all .5s;
            &:first-child{
                width: 70%;
                height: 100%;
                img{
                    bottom: 0;
                }
            }
            &:hover{
                box-shadow: 0 0 20px $color-thir;
                z-index: 5;
            }
        }
    }
</style>