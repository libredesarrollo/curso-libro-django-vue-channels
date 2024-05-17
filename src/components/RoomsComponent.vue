<template>
    <div>
        <div v-for="r in rooms" :key="r.id">
            <div @click="selectRoom(r.id)" class="card bg-light mt-2 mx-auto w-75" >
                <div class="card-body">
                    <h5 class="my-0">{{ r.name }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const axios = require('axios')
export default {
    data() {
        return {
            rooms: []
        }
    },
    mounted() {
        setTimeout(this.getRooms, 1000);
    },
    methods: {
        selectRoom(roomId){
            this.$root.roomIdSelected = roomId
        },
        getRooms: function () {
            axios.get('http://127.0.0.1:8000/api/rooms', {
                headers: {
                    Authorization: this.$root.tokenAuthRest
                }
            }).then((res) => {
                this.rooms = res.data
            }).catch((e) => {
                console.log(e)
            })
        }
    },
}
</script>