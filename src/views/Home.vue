<template>
    <div>
        <Header></Header>
        <RoomList></RoomList>
    </div>
</template>

<script>
import Header from '../components/Home/Header'
import RoomList from '../components/Home/RoomList'

export default {
    components:  { Header, RoomList },
}
</script>
<style lang="scss">
    *{
        @include fixSizing;
        font-family: NotoSansCJKtc-DemiLight;
    }
    .content{
        max-width: 1920px;
    }
</style>