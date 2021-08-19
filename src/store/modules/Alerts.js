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
		REMOVE_ALERT(state, id)
		{
			let index = state.alerts.findIndex( item => item.id == id );
			if ( index > - 1 ) state.alerts.splice( index, 1 );
		},
		TIMEOUT_REMOVE_ALERT(state, id)
		{
			let index = state.alerts.findIndex(item => item.id == id && item.type == 'success');
			if( index > -1 ) state.alerts.splice(index, 1);
		}
	},


	actions: {

		setAlert(context, data)
		{
			data.id = 'alertId' + parseInt((Math.random() * 10000000000));
			context.commit('SET_ALERT', data);  // data has to be in format {type: 'xxx', 'msg': 'xxx', 'id': 'alertId123456789'}

			setTimeout( (id, context) => {
				context.commit('TIMEOUT_REMOVE_ALERT', id);
			}, 7000, data.id, context);
		},

		setSuccessAlert(context, msg)
		{
			let data = {
				id: 'alertId' + parseInt((Math.random() * 10000000000)),
				type: 'success',
				msg: msg,
			}
			context.commit('SET_ALERT', data);  // data has to be in format {type: 'xxx', 'msg': 'xxx', 'id': 'alertId123456789'}

			setTimeout( (id, context) => {
				context.commit('TIMEOUT_REMOVE_ALERT', id);
			}, 7000, data.id, context);
		},

		setErrorAlert(context, msg)
		{
			let data = {
				id: 'alertId' + parseInt((Math.random() * 10000000000)),
				type: 'error',
				msg: msg,
			}
			context.commit('SET_ALERT', data);  // data has to be in format {type: 'xxx', 'msg': 'xxx', 'id': 'alertId123456789'}

			setTimeout( (id, context) => {
				context.commit('TIMEOUT_REMOVE_ALERT', id);
			}, 7000, data.id, context);
		},

		setErrorAlerts(context, errors)
		{
			errors.forEach(msg => {
				context.dispatch('setAlert', {'type': 'error', 'msg': msg});
			});
		},

		removeAlert(context, id)
		{
			context.commit('REMOVE_ALERT', id);
		},
	},


	getters: {

	}

}