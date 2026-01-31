<template>
    <div class="d-flex justify-content-end my-2 me-3">
        <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
</template>
<script>

export default {
    methods: {
        logout() {
            this.$axios.post('http://127.0.0.1:8000/api/logout', {
                'token': this.$root.tokenAuth
            }).then(
                (res) => {
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