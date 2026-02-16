<template>
    <div>
        <div class="row" v-if="!showRegister">
            <div class="col-md-6 offset-3 mt-3">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <input type="text" v-model="username" class="form-control" placeholder="User">
                        <input type="password" v-model="password" class="form-control mt-3" placeholder="Password">
                        <button class="btn btn-success btn-sm mt-3" @click="send">Send</button>
                        <button class="btn btn-link btn-sm mt-3" @click="showRegister = true">Register</button>
                    </div>
                </div>
            </div>
        </div>
        <RegisterComponent v-else @show-login="showRegister = false" />
    </div>
</template>

<script>
import RegisterComponent from './RegisterComponent.vue'


export default {
    components: {
        RegisterComponent
    },
    data() {
        return {
            username:'admin',
            password:'12345',
            showRegister: false
        }
    },
    methods: {
        send:function(){

            const data = {
                username:this.username.trim(),
                password:this.password.trim(),
            }

            this.$axios.post('http://127.0.0.1:8000/api/login',data).then(
                (res) => {
                    console.log(res.data)
                    this.$root.tokenAuth=res.data.token ?? res.data // en FastAPI use .token, en Django le paso el texto directamente
                    this.$cookies.set('token', this.$root.tokenAuth)
                }).catch((error) =>{
                    console.error(error)
                    // this.$cookies.set('token', "token-secreto")
                })
        }
    },

}
</script>