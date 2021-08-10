import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apiRoutes from "./router/apiRoutes";



//let $ = require( 'jquery' );
window.$ = window.jQuery = require('jquery');
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'



// Axios perform checkAuth() call on every
// page load and set up storage.user if authCheck is true.
import axios from "axios"
window.axios = axios;
axios.defaults.withCredentials = true;

let authToken = localStorage.getItem('authToken');        
axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + authToken
};


/**
 * This axios request checks if token in storage is valid. 
 * If it is valid it set up the user in storage.user and 
 */
axios.get( apiRoutes.AUTH_CHECK_URL )
    .then(response => {
        //console.log(response);

        if( response.data.user )
        {
            let user = response.data.user;
            if( user ) 
            {
                store.dispatch('user/setUser', user);
            }
        }
        else
        {
            router.push({"name": "Login"});
        }
    })
    .catch(response => {
        //console.log(response);
        router.push({'name': 'Login'});
    })
    .then(response => {
        //console.log(response);

        // Has to be here otherwise it redirests to login 
        // before auth check is done.
        router.beforeEach((to, from, next) => {

            if (to.name !== 'Login' && !store.getters['user/isLoggedIn']) 
            {
                next({ name: 'Login' });
                return;
            }
            
            next();
        })
    });


createApp(App).use(store).use(router).mount('#app');