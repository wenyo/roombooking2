import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import VueAxios from 'vue-axios'

const VUE_APP_TOKEN = 'Bearer 2hhirFH88rqb9AXPumSpm4Cwvk9Z9rx6xxICFY2E1q8SIKEgLZhGbqqrpzdc';
const URL_AJAX = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const URL_AJAX_SLASH = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/';

Vue.use(Vuex, VueAxios, axios);

export default new Vuex.Store({
  state: {
    // axios 
    VUE_APP_TOKEN,
    URL_AJAX,
    URL_AJAX_SLASH,

    // ALL ROOM DATAS
    bGetAllData: false,
    bGetAllDetails: false,
    vAllRoomData: [],
    vRoomDetail: []
  },
  mutations: {
    addAllRoomData(state, data){
        state.vAllRoomData = data;
        state.bGetAllData = true;
    },
    getRoomDetailArray(state, {res, idx}){
      state.vRoomDetail[idx] = res.data;
      let len = state.vRoomDetail.filter( vRoom => vRoom !== null).length;
      state.bGetAllDetails = state.vAllRoomData.length == len;
    }
  },
  actions: {
    // 得到房間概略資料
    getAllRoom({ commit, state, dispatch }){
      return axios.get( state.URL_AJAX,{
        headers: {
            'Authorization': state.VUE_APP_TOKEN,
            'Accept': 'application/json'
        }
      })
      .then(res => {
        commit('addAllRoomData', res.data.items);
        dispatch('getAllRoomDetail');
      })
      .catch( error => {
        console.warn(error);
      })
    },
    // 得到個別房間細節資料
    getRoomDetail({ commit, state }, {idx, id}){
      const URL_DETAIL = state.URL_AJAX_SLASH + id;
      return axios.get( URL_DETAIL, {
          headers: {
              'Authorization': state.VUE_APP_TOKEN,
              'Accept': 'application/json'
          }
      })
      // 回傳 Response 物件
      .then(res => {
          commit('getRoomDetailArray', {res, idx});
        })
      .catch( error => {
          console.warn(error);
      });
    },
    // 得到所有房間細節
    getAllRoomDetail({ state, dispatch }){
      for (const idx in state.vAllRoomData) {
        let id = state.vAllRoomData[idx].id;
        dispatch('getRoomDetail', {idx, id})
      }
    },
    // 預約房型
    bookRoom({ state }, {id, name, tel, date}){
      // bookRoom({state},{id, name, tel, date}){
      const URL_BOOKING = state.URL_AJAX_SLASH + id;
      return axios.post( URL_BOOKING, {
        name,
        tel,
        date
      },{
        headers: {
          'Authorization': state.VUE_APP_TOKEN,
          'Accept': 'application/json'
        }
      })
    }
  },
  modules: {}
});
