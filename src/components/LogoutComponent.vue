<template>
    <div class="d-flex justify-content-end mt-2 me-3">
        <button class="btn btn-primary" @click="logout">Logout</button>
    </div>
</template>
<script>
export default {
    methods: {
        logout() {
            this.$root.tokenAuth = ''
            this.$cookies.set('token', '')
        }
    },
}
</script>