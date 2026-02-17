<template>
    <div class="login-container">
        <div class="row justify-content-center" v-if="!showRegister">
    
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <h3 class="font-weight-bold text-dark">Login</h3>
                            <p class="text-muted">Please enter your credentials</p>
                        </div>
                        
                        <div class="form-group mb-3">
                            <label class="text-muted small mb-1">User</label>
                            <input type="text" v-model="username" class="form-control form-control-lg rounded-pill" placeholder="Enter username">
                        </div>
                        
                        <div class="form-group mb-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="text-muted small mb-1">Password</label>
                                <a href="#" class="small text-primary text-decoration-none">Forgot Password?</a>
                            </div>
                            <input type="password" v-model="password" class="form-control form-control-lg rounded-pill" placeholder="Enter password">
                        </div>

                        <div class="form-check mb-4">
                            <input class="form-check-input" type="checkbox" id="rememberMe">
                            <label class="form-check-label text-muted small" for="rememberMe">
                                Remember Me
                            </label>
                        </div>

                        <button class="btn btn-primary btn-lg btn-block w-100 rounded-pill shadow-sm" @click="send">Login</button>
                        
                        <div class="text-center mt-4">
                            <span class="text-muted small">Don't have an account? </span>
                            <button class="btn btn-link btn-sm p-0 align-baseline font-weight-bold" @click="showRegister = true">Create One</button>
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

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa; /* Light background for contrast */
}

.card {
    border-radius: 1rem;
    overflow: hidden; /* Ensure content respects border radius */
}

.form-control {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    font-size: 0.9rem;
}

.form-control:focus {
    box-shadow: none;
    border-color: #0d6efd;
    background-color: #fff;
}

.btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.btn-primary:hover {
    background-color: #0b5ed7;
    border-color: #0a58ca;
}
</style>