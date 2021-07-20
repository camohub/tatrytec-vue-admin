import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'





router.beforeEach((to, from, next) => {

    if (to.name !== 'Login' && !store.getters['user/isLoggedIn']) 
    {
        next({ name: 'Login' });
        return;
    }

    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    
    next()
})


createApp(App).use(store).use(router).mount('#app')
