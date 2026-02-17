<template>
    <div class="mt-5">
        <h3 class="text-center mb-4 font-weight-bold text-dark">Select a Chat Room</h3>
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="list-group shadow-sm rounded-lg overflow-hidden">
                    <button 
                        v-for="r in rooms" 
                        :key="r.id" 
                        @click="selectRoom(r.id)" 
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-4 border-0 mb-1 room-item"
                    >
                        <div class="d-flex align-items-center">
                            <div class="icon-wrapper bg-primary-light mr-3 text-primary">
                                <i class="fas fa-hashtag"></i>
                            </div>
                            <h5 class="mb-0 font-weight-bold text-dark">{{ r.name }}</h5>
                        </div>
                        <i class="fas fa-chevron-right text-muted"></i>
                    </button>
                </div>
                
                <div v-if="rooms.length === 0" class="text-center mt-5 text-muted">
                    <p>Loading rooms...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

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
            this.$axios.get('http://127.0.0.1:8000/api/rooms', {
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

<style scoped>
.room-item {
    transition: all 0.2s ease;
    background-color: white;
}

.room-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    background-color: white;
    z-index: 10;
}

.icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e3f2fd; /* Light blue */
}

.list-group {
    background-color: transparent;
}
</style>