<template>
  <div class="container">
    
    <LoginComponent v-if="tokenAuth == ''" />

    <template v-else >
      <MessageComponent />
      <LogoutComponent />
    </template>
    {{ tokenAuth }}
  </div>

</template>

<script>
import MessageComponent from '@/components/MessageComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue';
import LogoutComponent from '@/components/LogoutComponent.vue';

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
    LogoutComponent
  }
}
</script>
