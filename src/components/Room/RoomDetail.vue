<template>
    <div class='RoomDetail content detailPageContent font-light' v-if='bGetAllDetails'>
        <h3 class="roomName font-medium">{{vThisRoom.name}}</h3>
            <div class="thisRoomInfo">
                <ul>
                    <li>房客人數限制： {{vThisRoom.descriptionShort.GuestMin}}~{{vThisRoom.descriptionShort.GuestMax}} 人</li>
                    <li>床型：{{vThisRoom.descriptionShort.Bed[0]}}</li>
                    <li>衛浴數量： {{vThisRoom.descriptionShort['Private-Bath']}} 間</li>
                    <li>房間大小： {{vThisRoom.descriptionShort.Footage}} 平方公尺</li>
                </ul>
                <p>{{vThisRoom.description}}</p>
                
                <div class="lineDirectionBlack separationLine"></div>

                <div class="checkTime">
                    <div class="checkIn">
                        <span>Check In</span>
                        <div>{{vThisRoom.checkInAndOut.checkInEarly}}  —  {{vThisRoom.checkInAndOut.checkInLate}}</div>
                    </div>
                    <div class="checkOut">
                        <span>Check Out</span>
                        <div>{{vThisRoom.checkInAndOut.checkOut}}</div>
                    </div>
                </div>

                <ul class="equipment">
                    <li :class="vEquipment[0]">
                        <i class="fas fa-wifi"></i>
                        <span>Wi-Fi</span>
                    </li>
                    <li :class="vEquipment[1]">
                        <i class="fas fa-phone-square-alt"></i>
                        <span>電話</span>
                    </li>
                    <li :class="vEquipment[2]">
                        <i class="fas fa-mountain"></i>
                        <span>漂亮的視野</span>
                    </li>
                    <li :class="vEquipment[3]">
                        <i class="fas fa-utensils"></i>
                        <span>早餐</span>
                    </li>
                    <li :class="vEquipment[4]">
                        <i class="fas fa-wind"></i>
                        <span>空調</span>
                    </li>
                    <li :class="vEquipment[5]">
                        <i class="fas fa-smoking-ban"></i>
                        <span>禁止吸煙</span>
                    </li>
                    <li :class="vEquipment[6]">
                        <i class="fas fa-glass-martini-alt"></i>
                        <span>Mini Bar</span>
                    </li>
                    <li :class="vEquipment[7]">
                        <i class="fas fa-door-closed"></i>
                        <span>冰箱</span>
                    </li>
                    <li :class="vEquipment[8]">
                        <i class="fas fa-child"></i>
                        <span>適合兒童</span>
                    </li>
                    <li :class="vEquipment[9]">
                        <i class="fas fa-concierge-bell"></i>                                            
                        <span>客房服務</span>
                    </li>
                    <li :class="vEquipment[10]">
                        <i class="fas fa-couch"></i>
                        <span>沙發</span>
                    </li>
                    <li :class="vEquipment[11]">
                        <i class="fas fa-dog"></i>
                        <span>寵物攜帶</span>
                    </li>
                </ul>

                <ul class="priceDetail" ref='price'>
                    <li class="regular" ref='regularDay'>
                        <div>NT.{{vThisRoom.normalDayPrice}}</div>
                        <span>平日(一~四)</span>
                    </li>
                    <li class="holiday" ref='holiday'>
                        <div>NT.{{vThisRoom.holidayPrice}}</div>
                        <span>假日(五~日)</span>
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
            id: this.$route.params.id,
            vThisRoom: [],
            vEquipment: []
        }
    },
    computed:{
        ...mapState([ 'vRoomDetail', 'bGetAllDetails']),
    },
    created(){
        this.getThisRoom();
    },
    mounted(){
        this.showPrice();
    },
    updated(){
        this.showPrice();
    },
    methods:{
        // 得到該間房間資料
        getThisRoom(){
            if(this.bGetAllDetails){
                this.vThisRoom = this.vRoomDetail[this.id].room[0];
                this.checkEquipment();
            }
        },
        // 顯示今日價格
        showPrice(){
            if(!this.bGetAllDetails) return;

            const today = new Date().getDay();
            if(today > 1 && today < 6){
                this.$refs.regularDay.children[0].classList = ['todayPrice'];
            }else{
                this.$refs.price.classList += ' holidayPrice';
                this.$refs.holiday.children[0].classList = ['todayPrice'];
            }
        },
        checkEquipment(){
            const bItem = this.vThisRoom.amenities;
            for(let $item in bItem){
                if(bItem[$item]){
                    this.vEquipment.push('');
                }else{
                    this.vEquipment.push('unequipped');
                }
            }
        }
    },
    watch:{
        bGetAllDetails(){
            this.getThisRoom();
        }
    }
}
</script>

<style lang="scss" scoped>
    .RoomDetail{
        margin-top: 90vh;
    }

    // ROOM INFO
    .roomName{
        font-size: $fontsize-xl;
        margin: 20px 0;
    }

    .thisRoomInfo{
        position: relative;
        // margin: 30px 0;
        width: 50vw;
        ul{
            margin: 30px 0;
        }
        li{
            margin: 10px 0;
        }
        p{  
            width: 80%;
            letter-spacing: $letter-spc-xxs;
            text-align: justify;
            line-height: $line-h-master;
            font-size: $fontsize-xxs;
        }
    }

    .separationLine{
        height: 10px;
        width: 30px;
        margin: 30px 0;
        position: inherit;
    }

    // CHECK TIME
    .checkTime{
        display: inline-flex;
        flex-direction: row;
        width: 100%;
        font-size: $fontsize-m;
        letter-spacing: $letter-spc-s;
        &>div{
            width: 50%;
            div{
                margin-top: 10px;
            }
        }
        span{
            font-size: $fontsize-xs;
            letter-spacing: $letter-spc-xs;
        }
    }

    // EQUIPMENT
    .equipment{
        width: 100%;
        padding: 5%;
        background-color: $color-six;

        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        li{
            width: 135px;
            margin: 3% 0;
            &.unequipped{
                color: $color-sev;
            }
        }
        i{
            margin-right: 10px;
        }
    }

    // PRICE
    ul.priceDetail{
        margin: 0;
        text-align: right;
        font-size: $fontsize-xs;
        letter-spacing: $letter-spc-xs;

        position: absolute;
        top: 0;
        right: 20px;

        display: inline-flex;
        flex-direction: column;
        li{
            margin: 0;
            margin-bottom: 10px;
        }
        span{
            color: $color-sev;
            line-height: $line-h-master;
        }
        div{
            margin-bottom: 5px;
        }
        .todayPrice{
            letter-spacing: $letter-spc-m;
            font-size: $fontsize-xl;
        }
    }

    ul.holidayPrice{
        flex-direction: column-reverse;
    }
</style>