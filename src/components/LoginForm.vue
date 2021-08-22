<template>
    <div class="col-12 col-sm-6 offset-sm-2 col-lg-4 offset-lg-2">
        <form action="" @submit.prevent="submit">
            <h3>Login</h3>

            <div class="mb-3 alert alert-danger" v-if="errors.length">
                <div v-for="(item, index) in errors" :key="index">{{item}}</div>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" name="email" v-model="email" class="form-control" />
            </div>

            <div class="form-group">
                <label for="password">Heslo</label>
                <input type="password" name="password" v-model="password" class="form-control" />
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-sm">Prihlásiť</button>
            </div>
        </form>
    </div>
</template>



<script>

import apiRoutes from '@/router/apiRoutes';

export default {
    name: 'LoginForm',
    
    props: {
        
    },

    data() {
        return {
            email: 'aaaaaaaa@aaaaaa.aa',
            password: 'aaaaaaaa',

            errors: [],
        }
    },

    methods: {
        submit() {
            this.errors = [];

            if( !this.email || !this.password )
            {
                this.errors = ['Vyplňte prosím email a heslo.'];
                console.log(this.errors);
                return;
            }

            let url = apiRoutes.LOGIN_URL;
            let formData = {
                email: this.email,
                password: this.password,
            };
        
            axios.post(url, formData)
                .then((response) => {
                    let data = response.data;

                    if( data.errors )
                    {
                        this.errors = data.errors;
                        return;
                    }

                    this.$store.dispatch('user/setUser', data.user);
                    this.setToken(data.user.token);
                    this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Vitajte na palube ' + data.user.name});
                    this.$router.push( {name: 'Dashboard'});

                })
                .catch((respose) => {
                    console.log(respose);
                    this.errors = ['Nepodarilo sa vás prihlásiť.'];
                });
        },

        setToken(token) {
            // User can refresh the page so token has to be set 
            // in permanent storage not in vuex.
            localStorage.setItem("authToken", token);
            
            axios.defaults.headers.common = {
                'Authorization': 'Bearer ' + token
            };
        }
    },
}
</script>








<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin-bottom: 25px;
}
</style>
