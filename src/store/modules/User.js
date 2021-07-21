let authToken = localStorage.getItem('authToken');
let storageUser = localStorage.getItem('user');

if( true ) {
    
}


export default {

    namespaced: true,

    state: () => ({
        user: null
    }),

    mutations: {
        setUser(state, data) {
            state.user = data
        }
    },

    actions: {
        setUser(context, data) {
            context.commit('setUser', data);
        }
    },

    getters: {
        isLoggedIn(state) {
            return !!state.user;
        },

        getUser(state) {
            return state.user;
        }
    },

}