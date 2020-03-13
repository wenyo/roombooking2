<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    created(){
        this.getAllRoom();
    },
    methods:{
        ...mapActions(['getAllRoom'])
    }
}
</script>
<style lang="scss">
  /*-------BASIC SETTING-------*/

  *{
      @include fixSizing;
      font-family: NotoSansCJKtc-DemiLight;
  }

  .homePage{
      color: $color-master;
      a{
          color: $color-master;
      }
  }

  .roomDescribe{
      color: $color-five;
  }

  .content{
      padding: 5%;
  }

  .lineDirection{
      background: $color-four;
      background-image: repeating-linear-gradient(
                          45deg, transparent, 
                          transparent 5px, $color-master 3px, $color-master 6px);
      position: absolute;
      z-index: -1;
  }

  .lineDirectionBlack{
      background: $color-sec;
      background-image: repeating-linear-gradient(
                          45deg, transparent, 
                          transparent 5px, $color-five 3px, $color-five 6px);
      position: absolute;    
      z-index: -1;
  }
  // FONT

  .font-light{
      font-family: NotoSansCJKtc-Light;
  }
  .font-medium{
      font-family: NotoSansCJKtc-Medium;
  }

/*-------BASIC END-------*/
</style>