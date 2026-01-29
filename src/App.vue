<template>
  <div class="container">
    <MessageComponent />

  </div>

</template>

<script>
import MessageComponent from '@/components/MessageComponent.vue'

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
    MessageComponent
  }
}
</script>
