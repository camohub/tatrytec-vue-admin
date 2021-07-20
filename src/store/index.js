
import { createStore } from 'vuex'
import user from './modules/User'
import alerts from './modules/Alerts'


export default createStore({

    state: {
    },

    mutations: {
    },

    actions: {
    },

    modules: {
        user: user,
        alerts: alerts,
    }
})
