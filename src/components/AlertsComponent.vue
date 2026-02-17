<template>
    <transition-group name="fade" tag="div" class="chat-list">
        <div v-for="m in messages" :key="m.id" class="message-wrapper">
            <!-- Simulated Avatar -->
            <div class="avatar-placeholder mr-3">
                <i class="fas fa-user-circle fa-2x text-secondary"></i>
            </div>
            
            <div class="message-bubble shadow-sm">
                <div class="message-content">
                    <p class="mb-1 text-dark">{{ m.content }}</p>
                </div>
                <div class="message-meta text-right">
                    <small class="text-muted" style="font-size: 0.7rem;">{{ formatTime(m.create_at || m.created_at) }}</small>
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
        pushNewAlert(alert) {
            this.messages.push(alert)
        },
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
        },
        formatTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    },
}
</script>

<style scoped>
.chat-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message-wrapper {
    display: flex;
    align-items: flex-end; /* Align avatar with bottom of message */
    justify-content: flex-start; /* Default to left (received) */
    margin-bottom: 15px;
}

.avatar-placeholder {
    flex-shrink: 0;
    margin-right: 10px;
}

.message-bubble {
    background-color: white;
    padding: 12px 16px;
    border-radius: 18px;
    border-bottom-left-radius: 4px; /* Distinctive shape for left messages */
    max-width: 75%;
    position: relative;
    border: 1px solid #f0f0f0;
}

.message-content p {
    font-size: 0.95rem;
    line-height: 1.4;
    margin: 0;
}

.message-meta {
    margin-top: 4px;
    opacity: 0.7;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>