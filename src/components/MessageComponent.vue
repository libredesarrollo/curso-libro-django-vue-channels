<template>
  <div class="chat-wrapper">
    <div class="chat-card shadow-lg">
      <div class="chat-header text-white d-flex justify-content-between align-items-center px-4 py-3">
        <h5 class="mb-0 font-weight-bold"><i class="fas fa-comments mr-2"></i>Live chat</h5>
        <span class="badge badge-light text-primary">Online</span>
      </div>
      
      <div class="messages-area" ref="messagesArea">
        <AlertsComponent ref="alertsComponent" @loaded="scrollToBottom" />
        <div v-if="connecting" class="text-center mt-3 custom-loader">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Connecting...</span>
          </div>
          <p class="small text-muted mt-2">Connecting to chat...</p>
        </div>
      </div>

      <div class="input-area px-3 py-3">
        <div class="input-group">
          <textarea
            v-model="message"
            @keydown.enter.exact.prevent="send"
            placeholder="Type your message..."
            class="form-control rounded-left border-right-0 custom-textarea"
            :disabled="connecting"
            rows="1"
          ></textarea>
          <div class="input-group-append">
            <button @click="send" class="btn btn-primary rounded-right px-4 font-weight-bold" :disabled="connecting || message.trim() === ''">
              Send <i class="fas fa-paper-plane ml-1"></i>
            </button>
          </div>
        </div>
      </div>
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

        const data = JSON.parse(event.data);
        this.$refs.alertsComponent.pushNewAlert(data);
        this.scrollToBottom();
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

        //this.$refs.alertsComponent.getAlerts();
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
.chat-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh; /* Or fit container */
  padding: 1rem;
}

.chat-card {
  width: 100%;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: none;
}

.chat-header {
  background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); /* Light blue gradient */
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.messages-area {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f7fb; /* Light grayish blue background */
}

.input-area {
  background-color: white;
  border-top: 1px solid #eee;
}

.custom-textarea {
  resize: none;
  border-color: #e0e0e0;
  box-shadow: none;
}

.custom-textarea:focus {
  border-color: #29b6f6;
  box-shadow: 0 0 0 0.2rem rgba(41, 182, 246, 0.25);
}

/* Custom Scrollbar for cleaner look */
.messages-area::-webkit-scrollbar {
  width: 6px;
}

.messages-area::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

.messages-area::-webkit-scrollbar-thumb {
  background: #ccc; 
  border-radius: 3px;
}

.messages-area::-webkit-scrollbar-thumb:hover {
  background: #bbb; 
}
</style>
