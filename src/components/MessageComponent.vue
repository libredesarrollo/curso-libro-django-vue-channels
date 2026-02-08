<template>
  <div class="chat-container">
    <div class="messages-area" ref="messagesArea">
      <AlertsComponent ref="alertsComponent" @loaded="scrollToBottom" />
      <p v-if="connecting">Connecting to chat...</p>
    </div>
    <div class="input-area">
      <textarea
        v-model="message"
        @keydown.enter.exact.prevent="send"
        placeholder="Type a message..."
        class="form-control"
        :disabled="connecting"
      ></textarea>
      <button @click="send" class="btn btn-primary" :disabled="connecting || message.trim() === ''">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import AlertsComponent from '@/components/AlertsComponent.vue'

export default {
  components: {
    AlertsComponent
  },
  data() {
    return {
      alertSocket: null,
      message: '',
      connecting: true
    }
  },
  mounted() {
    // Using setTimeout to ensure that root properties are available.
    // Consider a more robust state management solution (like Vuex or Pinia) in a larger app.
    setTimeout(this.websocketInit, 1000)
  },
  methods: {
    websocketInit() {
      // if (!this.$root.roomIdSelected || !this.$root.tokenAuth) {
      //   console.error("Room ID or Auth Token is missing.");
      //   this.connecting = false;
      //   return;
      // }
      
      const wsUrl = `ws://127.0.0.1:8000/ws/alert/room/${this.$root.roomIdSelected}?token=${this.$root.tokenAuth}`;
      // const wsUrl = `ws://127.0.0.1:8000/ws/1?token=${this.$root.tokenAuth}`;
      this.alertSocket = new WebSocket(wsUrl);
      this.connecting = true;

      this.alertSocket.onopen = () => {
        console.log('WebSocket connection established.');
        this.connecting = false;
      };

      this.alertSocket.onmessage = (event) => {
        console.log('Message received:', event.data);
        // We update getMessage to trigger a re-render of AlertsComponent
        //this.$refs.alertsComponent.getAlerts();
      };

      this.alertSocket.onclose = () => {
        console.log('WebSocket connection closed.');
        this.connecting = true; // Or handle reconnection logic
      };

      this.alertSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.connecting = false;
      };
    },
    send() {
      if (this.message.trim() !== '' && this.alertSocket && this.alertSocket.readyState === WebSocket.OPEN) {
        this.alertSocket.send(JSON.stringify({ message: this.message }));
        this.message = '';
        // We update getMessage to show our own message in the alerts component

        this.$refs.alertsComponent.getAlerts();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesArea;

        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  beforeDestroy() {
    if (this.alertSocket) {
      this.alertSocket.close();
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh; /* Example height, adjust as needed */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.messages-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: #f9f9f9;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  flex-shrink: 0;
}

.input-area textarea {
  flex-grow: 1;
  margin-right: 10px;
  resize: none; /* Prevents manual resizing which can break layout */
}

.input-area button {
  flex-shrink: 0;
}

p {
    text-align: center;
}
</style>
