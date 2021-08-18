export default {

	namespaced: true,


	state: () => ({
		categories: null
	}),


	mutations: {

		SET_CATEGORIES(state, data)
		{
			state.categories = data;
		},
	},


	actions: {

		setCategories(context, data)
		{
			context.commit('SET_CATEGORIES', data);
		},

		removeCategory(context, id)
		{
			context.commit('REMOVE_CATEGORY', id);
		},
	},


	getters: {

	}

}