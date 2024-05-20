<template lang="">
    <div>
        <AlertsComponent/>

        <p v-if='connecting'>Connecting...</p>

        <textarea v-model='message' class="form-control mt-2">
        </textarea>
        <button @click='send' class='btn btn-success mt-1' :disabled='connecting'>
            Send
        </button>
    </div>
</template>
<script>
import AlertsComponent from '@/components/AlertsComponent.vue'
export default {
    components:{
        AlertsComponent
    },
    data() {
        return {
            alertSocket: Object,
            message: '',
            connecting:true
        }
    },
    mounted() {
        setTimeout(this.websocketInit,1000)
    },
    methods: {
        websocketInit() {
            this.alertSocket = new WebSocket('ws://127.0.0.1:8000/ws/alert/room/'+this.$root.roomIdSelected+'?'+this.$root.tokenAuth)
            this.connecting=true
            // abrir canal WS
            const c = this;
            this.alertSocket.onopen = function () {
                console.log('Channels WS is Open!')
                c.connecting=false
            }


            this.alertSocket.onmessage = function (data) {
                console.log('Message ' + data)
            }

        },
        send() {
            if (this.message.trim() != '')
                this.alertSocket.send(JSON.stringify({ message: this.message }))
            console.log('send mej')
        }
    },
}
</script>