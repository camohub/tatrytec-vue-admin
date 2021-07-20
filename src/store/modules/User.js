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
            console.log('isLoggedIn getter from User');
            console.log(!!state.user);
            return !!state.user;
        },

        getUser(state) {
            return state.user;
        }
    }

}