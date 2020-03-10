<template>
    <div class='roomListPage'>
        <div class="content">

            <ul class='roomList'>
                <li v-for='( vRoom, idx ) in allRoomData' :key='idx' class='room'>
                    <router-link :to='`/room/${idx}`'>
                    <img :src='vRoom.imageUrl'>
                    <div class="roomInfo">
                        <div class="name">{{vRoom.name}}</div>
                        <div class="price">
                            <div class="normalDayPrice">NT.{{vRoom.normalDayPrice}}<span class='smallFont day'>平日</span></div>
                            <div class="holidayPrice smallFont">NT.{{vRoom.holidayPrice}}<span class='day smallFont'>假日</span></div>
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
    computed:{
        ...mapState([ 'allRoomData', 'bGetAllData' ])
    },
}
</script>

<style lang="scss">
    .roomListPage{
        position: absolute;
        top: 60vh;
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
        }
        img{
            height: 100%;
            width: auto;
            min-height: 100%;
            min-width: 100%;
        }
    }
    .roomInfo{
        width: 100%;
        padding: 27px 30px;
        position: absolute;
        bottom: 0;
        background: $color-egh;
        transition: all .3s;
        div{
            color: $color-nine;
        }
        .smallFont{
            font-size: $fontsize-xs;
            color: $color-ele;
        }
    }
    .day{
        margin-left: 5px;
    }
    .normalDayPrice{
        font-size: $fontsize-m;
    }
    .price{
        display:none;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 23px;
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