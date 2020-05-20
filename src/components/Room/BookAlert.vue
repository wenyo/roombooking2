<template>
    <div>
        <div class="bookAlert" @click.self='closeAlert' v-if='bShowBooking'>
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
                        <span class='font-medium dateLabel'>預約起迄</span>
                        <div class="timeInput inputStyle">
                            <input type="date" v-model='sTimeStart' :min='sTomorow'>
                            <span>~</span>
                            <input type="date" v-model='sTimeEnd' :min='sTimeStart ? sTimeStart : sTomorow'>
                        </div>
                    </label>
                </div>

                <div class="calcDay alertContent">
                    <div class="dayStyle">
                        <span>平日 NT.{{iNormalDayPrice}}</span>
                        <span class='font-medium'>{{iNormalDays}}夜</span>
                    </div>
                    <div class="dayStyle">
                        <span>假日 NT.{{iHolidayPrice}}</span>
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
        <div class="tooltip" v-if='bShowAlert' @click.self='closeAlert_tips'>
            <div>
                <div class="title alertContent">
                    <div class='font-medium' v-if='msg == ""'>預約成功</div>
                    <div class='font-medium' v-else>預約失敗</div>
                    <div class="lineDirectionBlack shortLine"></div>
                </div>
                
                <div class="alertContent bookingMsg">
                    <img v-if='msg == ""' src="../../assets/img/check.png">
                    <span v-else>{{msg}}</span>                    
                </div>

                <div class="backBtn alertContent" @click='closeAlert_tips'>
                    <div class="back" v-if='bBooking' @click='closeAlert()'>回頁面</div>
                    <div class="back" v-else>返回</div>
                </div>              
            </div>

        </div>
        <div class="loading" v-if='bLoading'>
            <div>
                <div class='alertContent'>Loading...</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: ['getClickDate'],
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
            iTotalPrice: 0,
            bShowAlert: false, // 控制回饋訊息視窗
            bShowBooking: true, // 控制預約視窗
            bLoading: false, // 控制 loading 中視窗
            bBooking: false, // 是否送出 axios
            msg: ''
        }
    },
    created(){
        this.getRoomId();
        this.getTomorrow();
        this.getPrice();
        this.getDateFromCanlendar();
    },
    computed:{
        ...mapState(['vRoomDetail']),
    },
    methods:{
        ...mapActions(['bookRoom', 'getRoomDetail']),
        // 關掉整個 BookAlert
        closeAlert(){
            this.$emit('closeAlert', false);
            this.closAlert_booking();
        },
        // 關掉提示視窗
        closeAlert_tips(){
            this.msg = '';
            this.bShowAlert = false;
        },
        // 控制預約頁面
        closAlert_booking(){
            this.bShowBooking = !this.bShowBooking;
        },
        // 送出請求後執行
        afterSubmit(){
            this.bBooking = true;
            this.bLoading = false;
            this.closAlert_booking();
            this.bShowAlert = true;
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
            sDate =  sDate >= 10 ? sDate : '0' + sDate;

            let sMonth = date.getMonth() + 1;
            sMonth = sMonth >= 10 ? sMonth : '0' + sMonth;

            const sYear = date.getFullYear();

            return sYear+ '-' + sMonth+ '-' + sDate;
        },
        addDate(date, idays){
            let dateNew = new Date(date.getFullYear(), date.getMonth(), date.getDate() + idays);
            return this.getTimeString(dateNew);
        },
        // booking room
        submitBooking(){
            // 檢查輸入框
            const bChekInput = this.checkBookingInput();
            if(!bChekInput) {
                this.bBooking = false;
                return;
            }
            this.bLoading = true;
            const data = {'id': this.iRoomId, 'name': this.sName, 'tel': this.sTel, 'date': this.vTime};
            this.bookRoom(data)
            .then((rs)=>{
                this.afterSubmit()
                if(rs.data.success){ // 訂房成功
                    // 重load訂房日期
                    this.$emit('showBookingDate', rs.data.booking);                
                    this.getRoomDetail(this.id);
                }
            })
            .catch( error => {
                if (error.response) {
                    this.afterSubmit()
                    this.msg = error.response.data.message;
                }
            });
        },
        // 檢查預定資料
        checkBookingInput(){
            // 檢查姓名
            if( !this.sName ) {
                this.bShowAlert = true;
                this.msg = '請填入姓名'
                return false;
            }

            // 檢查電話
            const regTel1 = /[0-9]{10}/.test(this.sTel);//帶區號的固定電話
            const regTel2 = /[0-9]{9}/.test(this.sTel);//不帶區號的固定電話
            if( !this.sTel) {
                this.bShowAlert = true;
                this.msg = '請填入電話號碼'
                return false;
            }else if(!(regTel1 || regTel2)){
                this.bShowAlert = true;
                this.msg = '電話號碼至少9碼(市內電話需加上區碼)'
                return false;
            }

            // 檢查預約日期
            if( !this.sTimeStart || !this.sTimeEnd || this.sTimeEnd < this.sTimeStart ) {
                this.bShowAlert = true;
                this.msg = '請確認日期是否正確';
                return false;
            }

            return true;
        },
        // 得到該房間 ID
        getRoomId(){
            this.iRoomId = this.vRoomDetail[this.id].room[0].id;
        },
        getTomorrow(){
            let today = new Date();
            this.sTomorow = this.addDate(today, 1);
        },
        // calculation weekDay
        calcuWeekDays(date){
            let iWeekDays = new Date(date).getDay();
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
            this.iTotalPrice = this.iHolidayPrice * this.iHolidays + this.iNormalDayPrice * this.iNormalDays;
        },
        getDateFromCanlendar(){
            if(this.getClickDate !== '' ){
                this.sTimeStart = this.getClickDate;
                this.sTimeEnd = this.getClickDate;
            }
        }
    },
    watch:{
        sTimeEnd(){
            this.resetWeekDays();
            this.calcDate();
            this.calcPrice();
        },
        sTimeStart(){
            this.sTimeEnd = this.sTimeEnd !== '' ? this.sTimeEnd : this.sTimeStart;
            this.resetWeekDays();
            this.calcDate();
            this.calcPrice();
            
        }
    }
}
</script>

<style lang="scss">
    // BookAlert
    .bookAlert,
    .tooltip,
    .loading{
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
    .loading{
        &>div{
            width: auto;
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
    label span.dateLabel{
        @include s420{
            white-space: unset;
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
            @include s420{
                padding: 9px 10px;
            }
        }
    }

    .cancel{
        background: $color-13;
        color: $color-nine;
        &:hover{
            box-shadow: -3px 3px 6px $color-thir, -3px 3px 6px $color-ele inset;
        }
    }

    .submit,
    .back{
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

    .bookingMsg{
        color: $color-15;
        margin-bottom: 35px;
        img{
            display: block;
            margin: 0 auto;
            width: 60px;
        }
    }

    .backBtn{
        display: flex;
        justify-content: flex-end;
        div{
            display: inline-block;
            padding: 9px 24px;
            transition: all .3s;
            font-size: $fontsize-xs;
            @include pointer;
        }
    }
</style>