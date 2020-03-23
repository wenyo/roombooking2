<template>
    <div class='roomListPage'>
        <div class="content">

            <ul class='roomList'>
                <li v-for='( vRoom, idx ) in vAllRoomData' :key='idx' class='room'>
                    <router-link :to='`/room/${idx}`'>
                    <img :src='vRoom.imageUrl'>
                    <div class="roomInfo">
                        <div class="name">{{vRoom.name}}</div>
                        <div class="price" :class='checkWeekDay()? "" : "priceReverse" '>
                            <div class="normalDayPrice" 
                                :class='checkWeekDay()? "bigFont" : "" '>
                                <span>NT.{{vRoom.normalDayPrice}}</span>
                                <span class='smallFont day'>平日</span>
                            </div>
                            <div class="holidayPrice"  
                                :class='checkWeekDay()? "" : "bigFont" '>
                                <span>NT.{{vRoom.holidayPrice}}</span>
                                <span class='day smallFont'>假日</span>
                            </div>
                        </div>
                    </div>
                    </router-link>
                </li>
            </ul>

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data(){
        return{
            iWeekDay: new Date().getDay(),
        }
    },
    computed:{
        ...mapState([ 'vAllRoomData', 'bGetAllData' ]),
    },
    methods:{
        // 平日就返回 true
        checkWeekDay(){
            return (this.iWeekDay > 0 || this.iWeekDay < 6);
        }
    }
}
</script>

<style lang="scss">
    .roomListPage{
        position: absolute;
        top: 60vh;
        width: 100%;
        @include s768{
            top: 70vh;
        }
    }

    .roomList{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        li{
            background: $color-egh;
            box-shadow: 2px 2px 9px 0 $color-thir;
            width: 30%;
            height: 350px;
            margin: 2% 1.5%;
            overflow: hidden;
            position: relative;
            @include s900{
                width: 46%;
                margin: 2%;
            }
            @include s630{
                width: 90%;
                margin: 5% 0;
            }
        }
        img{
            height: 100%;
            width: auto;
            min-height: 100%;
            min-width: 100%;
            position: absolute;
            bottom: 70px;
        }
    }
    .roomInfo{
        width: 100%;
        padding: 27px 30px;
        position: absolute;
        bottom: 0;
        background: $color-egh;
        font-size: $fontsize-xs;
        transition: all .3s;
        div{
            color: $color-nine;
        }
    }
    .day{
        margin-left: 5px;
    }
    .price{
        display:none;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 23px;
        .smallFont{
            font-size: $fontsize-xs;
            color: $color-ele;
        }
        .bigFont{
            font-size: $fontsize-m;
        }
    }
    .priceReverse{
        flex-direction: row-reverse;
    }
    .room {
        @include pointer;
        transition: all .3s;
        &:hover{
            box-shadow: 2px 2px 9px 0 $color-ele;
            & .price{
                display: flex;
            }
        }
    }
</style>