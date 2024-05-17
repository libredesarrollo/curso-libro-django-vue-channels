<template>
    <div>
        <div v-for="m in messages" :key="m.id">
            <div class="card bg-light mt-2 mx-auto w-75" >
                <div class="card-body">
                    <h5 class="my-0">{{ m.content }}</h5>
                    <p class="text-muted text-end my-0">{{ m.create_at }}</p>
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
            messages: []
        }
    },
    mounted() {
        setTimeout(this.getAlerts, 1000);
    },
    methods: {
        getAlerts: function () {
            axios.get('http://127.0.0.1:8000/api/alerts', {
                headers: {
                    Authorization: this.$root.tokenAuthRest
                }
            }).then((res) => {
                this.messages = res.data
            }).catch((e) => {
                console.log(e)
            })
        }
    },
}
</script>