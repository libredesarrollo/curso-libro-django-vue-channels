<template>
    <transition-group name="fade" tag="div">
        <div v-for="m in messages" :key="m.id">
            <div class="card bg-light mt-2 mx-auto w-75" >
                <div class="card-body">
                    <h5 class="my-0">{{ m.content }}</h5>
                    <p class="text-muted text-end my-0">{{ m.create_at || m.created_at }}</p>
                </div>
            </div>
        </div>
    </transition-group>
</template>
<script>
export default {
    data() {
        return {
            messages: []
        }
    },
    mounted() {
        this.getAlerts()
    },
    methods: {
        getAlerts: function () {
            setTimeout(() => {
                this.$axios.get('http://127.0.0.1:8000/api/alerts?room_id=' + this.$root.roomIdSelected , {
                    headers: {
                        Authorization: this.$root.tokenAuthRest
                    }
                }).then((res) => {
                    this.messages = res.data
                    this.$emit('loaded')
                }).catch((e) => {
                    console.log(e)
                })
            }, 1000)
        }
    },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>