<template>
    <div>
        room
        {{this.$route.params.num}}
        <RoomImg></RoomImg>
        <RoomDetail></RoomDetail>
    </div>
</template>

<script>
import RoomDetail from '../components/Room/RoomDetail'
import RoomImg from '../components/Room/RoomImg'

export default {
    components: { RoomDetail, RoomImg }
}
</script>