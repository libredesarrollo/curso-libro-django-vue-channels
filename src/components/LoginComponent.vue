<template>
    <div>
        <div class="row">
            <div class="col-md-6 offset-3 mt-3">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <input type="text" v-model="username" class="form-control" placeholder="User">
                        <input type="password" v-model="password" class="form-control mt-3" placeholder="Password">
                        <button class="btn btn-success btn-sm mt-3" @click="send">Send</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
const axios = require('axios')

export default {
    data() {
        return {
            username:'admin',
            password:'12345'
        }
    },
    methods: {
        send:function(){

            const data = {
                username:this.username.trim(),
                password:this.password.trim(),
            }

            axios.post('http://127.0.0.1:8000/api/login',data).then(
                (res) => {
                    console.log(res)
                    this.$root.tokenAuth=res.data
                    this.$cookies.set('token', this.$root.tokenAuth)
                }).catch((error) =>{
                    console.error(error)
                })
        }
    },

}
</script>