export default {

    namespaced: true,


    state: () => ({
        alerts: []
    }),


    mutations: {

        SET_ALERT(state, data) 
        {
            state.alerts.push(data);
        },
        DELETE_ALERT(state, id) 
        {
            let index = state.alerts.findIndex(item => item.id == id && item.type == 'success');
            state.alerts.splice(index, 1);
         }
    },


    actions: {

        setAlert(context, data) 
        {
            data.id = context.dispatch('getId');
            context.commit('SET_ALERT', data);  // data has to be in format {type: 'xxx', 'msg': 'xxx', 'id': 'alertId123456789'}

            setTimeout( (id, context) => {
                context.commit('DELETE_ALERT', id);
            }, 7000, data.id, context);
        },

        setErrorAlerts(context, errors) 
        {
            errors.forEach(msg => { 
                context.dispatch('setAlert', {'type': 'error', 'msg': msg}); 
            });
        },

        getId() {
            return 'alertId' + (Math.random() * 1000000000);
        }
    },

    
    getters: {

    }

}