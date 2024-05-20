<template>
    <div class="d-flex justify-content-end mt-2 me-3">
        <button class="btn btn-primary" @click="logout">Logout</button>
    </div>
</template>
<script>

const axios = require('axios')

export default {
    methods: {
        logout() {
            axios.post('http://127.0.0.1:8000/api/logout', {
                'token': this.$root.tokenAuth
            }).then(
                (res) => {
                    console.log(res.data)
                    this.$root.tokenAuth = ''
                    this.$cookies.set('token', '')
                }).catch((error) => {
                    console.error(error)
                    this.$root.tokenAuth = ''
                    this.$cookies.set('token', '')
                })

        }
    },
}
</script>