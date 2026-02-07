<template>

    
  <div class="container">
    <LoginComponent v-if="tokenAuth == ''" />

    <template v-else>

      <!-- no auth -->
      <LogoutComponent />
      <template v-if="roomIdSelected == ''">
        <!-- room selected -->
        <RoomsComponent />
      </template>
      <template v-else>
        <MessageComponent />
      </template>

    </template>
  </div>
</template>

<script>
import MessageComponent from '@/components/MessageComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue';
import LogoutComponent from '@/components/LogoutComponent.vue';
import RoomsComponent from './components/RoomsComponent.vue';

export default {
  mounted() {
    this.tokenAuth = this.$cookies.get('token') ?? ''
  },
  data() {
    return {
      tokenAuth: '',
      roomIdSelected: ''
    }
  },
  computed: {
    tokenAuthRest: function () {
      const res = this.tokenAuth.split('_')
      return res[0] + ' ' + res[1]
    }
  },
  name: 'App',
  components: {
    MessageComponent,
    LoginComponent,
    LogoutComponent,
    RoomsComponent
  }
}
</script>
