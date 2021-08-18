
import { createStore } from 'vuex'
import user from './modules/User'
import alerts from './modules/Alerts'
import categories from './modules/Categories'


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
        categories: categories,
    }
})
