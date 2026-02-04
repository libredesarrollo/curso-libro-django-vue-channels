<template>
    <div>
        <div class="row">
            <div class="col-md-6 offset-3 mt-3">
                <div class="card">
                    <div class="card-header">
                        Register
                    </div>
                    <div class="card-body">
                        <input type="text" v-model="username" class="form-control" placeholder="User">
                        <input type="password" v-model="password" class="form-control mt-3" placeholder="Password">
                        <button class="btn btn-success btn-sm mt-3" @click="send">Register</button>
                        <button class="btn btn-link btn-sm mt-3" @click="$emit('show-login')">Login</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>


export default {
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        send:function(){

            const data = {
                username:this.username.trim(),
                password:this.password.trim(),
            }

            this.$axios.post('http://127.0.0.1:8000/api/register',data).then(
                (res) => {
                    console.log(res.data)
                    this.$emit('show-login')
                }).catch((error) =>{
                    console.error(error)
                    // this.$cookies.set('token', "token-secreto")
                })
        }
    },

}
</script>