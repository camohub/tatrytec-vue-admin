export default {

    namespaced: true,

    state: () => ({
        user: {
            'name': 'aaaaaaaaaaaaaaa',
            'surname': 'bbbbbbbbbbbbbbb'
        }
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