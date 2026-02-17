<template>
    <div class="d-flex justify-content-end my-3 me-3">
        <button class="btn btn-outline-danger btn-sm rounded-pill px-3 shadow-sm" @click="logout">
            <i class="fas fa-sign-out-alt mr-1"></i> Logout
        </button>
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