<template>
    <div class="row justify-content-center">

            <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-body p-5">
                    <div class="text-center mb-4">
                        <h3 class="font-weight-bold text-dark">Create Account</h3>
                        <p class="text-muted">Start your journey with us</p>
                    </div>

                    <div class="form-group mb-3">
                        <label class="text-muted small mb-1">Username</label>
                        <input type="text" v-model="username" class="form-control form-control-lg rounded-pill" placeholder="Choose a username">
                    </div>

                    <div class="form-group mb-4">
                        <label class="text-muted small mb-1">Password</label>
                        <input type="password" v-model="password" class="form-control form-control-lg rounded-pill" placeholder="Create a password">
                    </div>

                    <button class="btn btn-success btn-lg btn-block w-100 rounded-pill shadow-sm" @click="send">Sign Up</button>
                    
                    <div class="text-center mt-4">
                        <span class="text-muted small">Already have an account? </span>
                        <button class="btn btn-link btn-sm p-0 align-baseline font-weight-bold" @click="$emit('show-login')">Login here</button>
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

<style scoped>
.card {
    border-radius: 1rem;
    overflow: hidden;
}

.form-control {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    font-size: 0.9rem;
}

.form-control:focus {
    box-shadow: none;
    border-color: #198754; /* Success color */
    background-color: #fff;
}

.btn-success {
    background-color: #198754;
    border-color: #198754;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.btn-success:hover {
    background-color: #157347;
    border-color: #146c43;
}
</style>