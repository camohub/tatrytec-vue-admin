
export default {

    namespaced: true,

    state: () => ({
        user: null
    }),


    mutations: {

        setUser(state, data) 
        {
            state.user = data
        }
    },


    actions: {

        setUser(context, data) 
        {
            context.commit('setUser', data);
        },

        removeUser({ commit }) 
        {
            localStorage.removeItem("authToken");
            commit("setUser", null);
            console.log('removeUser');
        },
    },


    getters: {

        isLoggedIn(state) 
        {
            return !!state.user;
        },

        getUser(state) 
        {
            return state.user;
        }
    },

}