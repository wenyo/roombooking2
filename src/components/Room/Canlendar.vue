<template>
    <div class="booking" v-if='bGetAllDetails'>

        <div class="calendar">
            <div class="dateTitle">
                <i class="fas fa-chevron-left" @click="changeCanlendar(-1)"></i>
                <span>{{iYearShow}}/{{iMonthShow+1}}</span>
                <i class="fas fa-chevron-right" @click="changeCanlendar(1)"></i>
            </div>
            <table>
                <tr>
                    <td v-for='(sWeek, idx) in iWeekText' :key='idx'>{{sWeek}}</td>
                </tr>
                <tr v-for='(vWeek, idx2) in vMonthDate' :key='idx2'>
                    <td v-for='(iDate, idx3) in vWeek' :key='idx3' 
                    :class="checkDate(iDate)"
                >{{iDate}}</td>
                </tr>
            </table>
        </div>

        <span class="bookingBtn" @click='showBookAlert()'>
            <div class="submit">預約時段</div>
            <div class="lineDirectionBlack right-line"></div>
            <div class="lineDirectionBlack bottom-line"></div>
        </span>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    props: ['addDate'],
    data(){
        return{
            id: this.$route.params.id,
            iTodayTimeOut: 0,
            iYearNow: new Date().getFullYear(),
            iMonthNow: new Date().getMonth(),
            iToday: new Date().getDate(),
            iYearShow: '',
            iMonthShow: '',
            iWeekText:['日', '一','二','三','四','五','六'],
            vMonthDate: [[],[],[],[],[],[]],
            vThisRoomBooking: [],
        }
    },
    computed:{
        ...mapState(['bGetAllDetails', 'vRoomDetail']),
    },
    created(){
        this.iYearShow = this.iYearNow;
        this.iMonthShow = this.iMonthNow;
        this.iTodayTimeOut = this.getTimeout(this.iYearNow, this.iMonthNow, this.iToday)
        this.getMonth(this.iYearShow, this.iMonthShow);
    },
    mounted(){
        this.getRoomBooking();
    },
    methods:{
        // 得到該月日期陣列
        getMonth(iYearNow, iMonthNow){
            this.vMonthDate = [[],[],[],[],[],[]]; // reset
            const sMonthFstDate = new Date(iYearNow, iMonthNow, 1);
            const sMonthLastDate = new Date(iYearNow, iMonthNow+1, 0);
            const iMonthNowLen = sMonthLastDate.getDate();
            let iWeekDay = sMonthFstDate.getDay();
            let iWeek = 0;
            for(let iDate = 1; iDate <= iMonthNowLen; iDate++){
                this.vMonthDate[iWeek][iWeekDay] = iDate;
                iWeekDay++;
                if(iWeekDay == this.iWeekText.length){
                    iWeekDay = 0;
                    iWeek++
                }
            }
        },
        // 得到該間房間的訂房狀況
        getRoomBooking(){
            this.vThisRoomBooking = [];
            if(this.bGetAllDetails){
                let vBooking = this.vRoomDetail[this.id].booking;
                for (const vBook of vBooking) {
                    this.add_vThisRoomBooking(vBook.date)
                }
            }
        },
        // vThisRoomBooking 得到 date
        add_vThisRoomBooking(date){
            this.vThisRoomBooking.push(date);
        },
        // 得到時間戳記
        getTimeout(iYear, iMonth, iDate){
            const sDate = `${iYear}-${iMonth+1}-${iDate}`; // string date: month+1
            const iDateTimeout = new Date(sDate).valueOf();
            return iDateTimeout;
        },
        // 檢查是否為過去日期 && 是否已訂房
        checkDate(iDate){
            const sDate = this.getDateString(iDate);
            const iCheckdate = this.getTimeout(this.iYearShow, this.iMonthShow, iDate);
            let sClassName = this.iTodayTimeOut < iCheckdate ? '' : 'beforToday';
            sClassName = this.vThisRoomBooking.indexOf(sDate) > -1 ? sClassName + ' lineDirectionBlack' : sClassName;
            return sClassName;
        },
        // 切換日曆
        changeCanlendar(addMonth){
            this.iMonthShow = this.iMonthShow + addMonth;
            if(this.iMonthShow > 11 || this.iMonthShow < 0){
                this.iYearShow =  this.iYearShow + addMonth;
                this.iMonthShow = this.iMonthShow > 11 ? 0 : 11;
            }

            this.getMonth(this.iYearShow ,this.iMonthShow);
        },
        // 發出顯示預約視窗
        showBookAlert(){
            this.$emit('sendBookAlert', true)
        },
        // 得到 date string
        getDateString(iDate){
            const sMonth = ((this.iMonthShow + 1) > 10) ? (this.iMonthShow + 1) : ('0' + (this.iMonthShow + 1));
            const sDate = (iDate > 10) ? iDate : ('0' + iDate);
            return this.iYearShow + '-' + sMonth + '-' + sDate;
        }
    },
    watch:{
        bGetAllDetails(){
            this.getRoomBooking();
        },
        addDate(date){
            this.add_vThisRoomBooking(date);
        }
    }
}
</script>

<style lang="scss">

    // CALENDAR
    .booking{
        display: flex;
        height: fit-content;
        flex-direction: column;
        @include s768{
            margin-top: 20px;
            flex-direction: row;
            width: 90vw;
            align-items: flex-end;
        }
        @include s420{
            flex-direction: column;
            width: 95vw;
            margin-top: 30px;
            align-items: flex-start;
        }
    }
    .calendar{
        background-color: $color-egh;
        width: 300px;
        padding: 20px;
        box-shadow:  0 2px 10px 0 $color-thir;
        table{
            width: 100%;
        }
        td{
            padding: 10px 0;
            text-align: center;
            @include pointer;
        }
        .beforToday{
            color: $color-sev;
            cursor: not-allowed;
        }
    }

    .dateTitle{
        width: 100%;
        margin-bottom: 10px;
        padding: 0 12px;

        display: inline-flex;
        justify-content: space-between;
        span{
            letter-spacing: $letter-spc-s;
        }
        i{
            @include pointer;
        }
    }

    // booking Btn

    .bookingBtn{
        position: relative;
        display: inline-block;
        margin-top: 26px;
        width: 116px;
        height: 54px;
        @include s768{
            margin-top: 0;
            margin-left: 30px;
        }
        @include s420{
            margin-top: 26px;
            margin-left: 0;
        }
        .submit{
            border: none;
            font-size: $fontsize-xs;
            padding: 20px 30px;

            background-color: $color-nine;
            color: $color-master;
            @include pointer;
            transition: all .3s;
            &:hover{
                background-color: $color-sev;
                color: $color-nine;
            }
        }
        .right-line{
            width: 10px;
            height: 100%;

            top: 10px;
            right: -10px;
        }
        .bottom-line{
            width: calc(100% - 10px);
            height: 10px;

            bottom: -10px;
            right: 0;
        }
    }
    td.lineDirectionBlack{
        position: relative;
        z-index: 0;
    }
</style>