export default {

    namespaced: true,


    state: () => ({
        alerts: []
    }),


    mutations: {

        setAlert(state, data) 
        {
            state.alerts.push(data);
        },
    },


    actions: {

        setAlert(context, data) 
        {
            context.commit('setAlert', data);  // data has to be in format {type: 'xxx', 'msg': 'xxx'}
        },

        setErrorAlerts(context, errors) 
        {
            console.log(errors);
            errors.forEach(msg => { 
                context.dispatch('setAlert', {'type': 'error', 'msg': msg}); 
            });
        }
    },

    
    getters: {

    }

}