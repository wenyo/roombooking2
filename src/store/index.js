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
    allRoomData: [],
  },
  mutations: {
    addAllRoomData(state, data){
      console.log(data)
        state.allRoomData = data;
        state.bGetAllData = true;
    }
  },
  actions: {
    getAllRoom({ commit, state }){
      axios.get( state.URL_AJAX,{
        headers: {
            'Authorization': state.VUE_APP_TOKEN,
            'Accept': 'application/json'
        }
      })
      .then(res => {
        commit('addAllRoomData', res.data.items)
      })
    }
  },
  modules: {}
});
