<template>
    <div>
        <div class="bookAlert" @click.self='closeAlert'>
            <div>
                <div class="title alertContent">
                    <div class='font-medium'>預約時段</div>
                    <div class="lineDirectionBlack shortLine"></div>
                </div>

                <div class="bookingContent alertContent">
                    <label>
                        <span class='font-medium'>姓名</span>
                        <input type="text" class='inputStyle' v-model='sName'>
                    </label>
                    <label>
                        <span class='font-medium'>電話</span>
                        <input type="text" class='inputStyle' v-model='sTel'>
                    </label>
                    <label>
                        <span class='font-medium'>預約起迄</span>
                        <div class="timeInput inputStyle">
                            <input type="date" value='2020-03-20' v-model='sTimeStart' :min='sTomorow'>
                            <span>~</span>
                            <input type="date" value='2020-03-30' v-model='sTimeEnd' :min='sTimeStart ? sTimeStart : sTomorow'>
                        </div>
                    </label>
                </div>

                <div class="calcDay alertContent">
                    <div class="dayStyle">
                        <span>平日時段 NT.{{iNormalDayPrice}}</span>
                        <span class='font-medium'>{{iNormalDays}}夜</span>
                    </div>
                    <div class="dayStyle">
                        <span>假日時段 NT.{{iHolidayPrice}}</span>
                        <span class='font-medium'>{{iHolidays}}夜</span>
                    </div>
                </div>

                <div class="totalPrice font-medium alertContent">
                    <span>=</span>
                    <span>NT.{{iTotalPrice}}</span>
                </div>

                <div class="bookBtn alertContent">
                    <span class="cancel" @click.self='closeAlert'>取消</span>
                    <span class="submit" @click="submitBooking">確定預約</span>
                </div>
            </div>
        </div>
        <div class="tooltip"></div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data(){
        return{
            id: this.$route.params.id,
            iRoomId: 0,
            sName: '',
            sTel: '',
            sTimeStart: '',
            sTimeEnd: '',
            vTime: [],
            sTomorow: '',
            iNormalDays: 0,
            iHolidays: 0,
            iHolidayPrice: 0,
            iNormalDayPrice: 0,
            iTotalPrice: 0
        }
    },
    created(){
        this.getRoomId();
        this.getTomorrow();
        this.getPrice();
        console.log(new Date(this.sTomorow).getDay())
    },
    computed:{
        ...mapState(['vRoomDetail']),
    },
    methods:{
        ...mapActions(['bookRoom']),
        // close alert
        closeAlert(){
            this.$emit('closeAlert', false);
        },
        // calculation vTime between  sTimeStart from sTimeEnd
        calcDate(){
            this.vTime = []; //reset
            const iDuringTimeOut = (new Date(this.sTimeEnd)).valueOf() - (new Date(this.sTimeStart)).valueOf();
            const iDays = iDuringTimeOut / 1000 / 60 / 60 / 24;
            let date = new Date(this.sTimeStart);
            let dateNew;
            for (let day = 0; day <= iDays; day++) {
                dateNew = this.addDate(date, day);
                this.vTime.push(dateNew)
                this.calcuWeekDays(dateNew);
            }
        },
        // get time string format
        getTimeString(date){
            let sDate = date.getDate();
            sDate =  sDate > 10 ? sDate : '0' + sDate;

            let sMonth = date.getMonth() + 1;
            sMonth = sMonth > 10 ? sMonth : '0' + sMonth;

            const sYear = date.getFullYear();

            return sYear+ '-' + sMonth+ '-' + sDate;
        },
        addDate(date, idays){
            let dateNew = new Date(date.getFullYear(), date.getMonth(), date.getDate() + idays);
            return this.getTimeString(dateNew);
        },
        // booking room
        submitBooking(){
            if( !this.sName ) return;
            if( !this.sTel ) return;
            if( !this.sTimeStart || !this.sTimeEnd || this.sTimeEnd < this.sTimeStart ) return;

            const data = {'id': this.iRoomId, 'name': this.sName, 'tel': this.sTel, 'date': this.vTime};
            this.bookRoom(data)
            .then(()=>
                console.log(111)
            )
        },
        getRoomId(){
            this.iRoomId = this.vRoomDetail[this.id].room[0].id;
        },
        getTomorrow(){
            let today = new Date();
            this.sTomorow = this.addDate(today, 1);
            console.log(this.sTomorow);
        },
        // calculation weekDay
        calcuWeekDays(date){
            let iWeekDays = new Date(date).getDay();
            console.log(iWeekDays, date)
            if( iWeekDays > 0 && iWeekDays < 6 ){
                this.iNormalDays++;
            }else{
                this.iHolidays++;
            }
        },
        // reset weekDay
        resetWeekDays(){
            this.iNormalDays = 0;
            this.iHolidays = 0;
        },
        getPrice(){
            this.iHolidayPrice = this.vRoomDetail[this.id].room[0].holidayPrice;
            this.iNormalDayPrice = this.vRoomDetail[this.id].room[0].normalDayPrice;
        },
        calcPrice(){
            console.log(this.iHolidayPrice, this.iHolidays)
            console.log(this.iNormalDayPrice, this.iNormalDays)
            this.iTotalPrice = this.iHolidayPrice * this.iHolidays + this.iNormalDayPrice * this.iNormalDays;
        }
    },
    watch:{
        sName(){
            console.log(this.sName);
        },
        sTel(){
            console.log(this.sTel);
        },
        sTimeEnd(){
            console.log(this.sTimeEnd);
            this.resetWeekDays();
            this.calcDate();
            this.calcPrice();
            console.log(this.iNormalDays);
            console.log(this.iHolidays);
        },
        sTimeStart(){
            this.sTimeEnd = this.sTimeEnd !== '' ? this.sTimeEnd : this.sTimeStart;
            console.log(this.sTimeStart);
            this.resetWeekDays();
            this.calcDate();
            this.calcPrice();
            
        },
    }
}
</script>

<style lang="scss">
    // BookAlert
    .bookAlert{
        width: 100vw;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: $color-thir;
        display:flex;
        justify-content: center;
        align-items: center;
        &>div{
            max-width: 423px;
            width: 80%;
            background: $color-master;
            padding: 27px 0;
            box-sizing: border-box;
        }
    }
    .title{
        margin-bottom: 35px;
    }
    .shortLine{
        height: 10px;
        width: 38px;
        position: unset;
        margin: 12px 0;
    }
    .bookingContent{
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        label{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            font-size: $fontsize-xs;
            letter-spacing: $letter-spc-xs;
            &>span{
                width: auto;
                white-space:nowrap;
            }
            input{
                padding: 5px 8px;
                border-radius: 3px;
                border: 1px solid $color-13;
                border-radius: 3px;
            }
        }
    }
    .timeInput{
        display: flex;
        justify-content: space-between;
        align-items: center;
        input{
            width: 45%;
            &::-webkit-clear-button {
                display: none;
            }
        }
    }
    .inputStyle{
        width: 75%;
    }

    .calcDay{
        background: $color-14;
        font-size: $fontsize-xxs;
        padding: 18px 0; 
    }
    .dayStyle{
        display: flex;
        justify-content: space-between;
        margin: 6px 0;
        color: $color-ele;
    }

    .totalPrice{
        color: $color-15;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: $fontsize-l;
        padding: 15px 0;
        span:last-child{
            margin-left: 50px;
        }
    }

    .bookBtn{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        span{
            padding: 9px 24px;
            transition: all .3s;
            font-size: $fontsize-xs;
            @include pointer;
        }
    }

    .cancel{
        background: $color-13;
        color: $color-nine;
        &:hover{
            box-shadow: -3px 3px 6px $color-thir, -3px 3px 6px $color-ele inset;
        }
    }

    .submit{
        background: $color-nine;
        color: $color-master;
        &:hover{
            box-shadow: -3px 3px 6px $color-thir, -3px 3px 6px $color-thir inset;
        }
    }


    .alertContent{
        padding-left: 42px;
        padding-right: 42px;
    }
</style>