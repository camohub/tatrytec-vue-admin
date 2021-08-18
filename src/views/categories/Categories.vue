<template>
    <div class="col-9 col-xl-5 offset-xl-1">
        <h2>Categories</h2>

		<span @click="storeOrder" v-if="this.loaded" class="btn btn-sm btn-primary editOrder">Uložiť poradie</span>

		<div id="sortableListsWrapper" v-if="this.loaded">
			<CategoriesList :categories="this.categories" :level="0" />
		</div>

		<span @click="storeOrder" v-if="this.loaded" class="btn btn-sm btn-primary editOrder">Uložiť poradie</span>
	</div>
</template>


<script>

import { ref } from "vue"
import apiRoutes from '@/router/apiRoutes'
import CategoriesList from '@/components/categories/CategoriesList'


export default {

	name: "Categories",

	data() {
		return {
			loaded: false,
		}
	},

	methods: {

		getCategories() {
			let url = apiRoutes.CATEGORIES_URL;
			axios.get( url )
				.then( response => {
					if ( response.data.error ) return this.$store.dispatch( 'alerts/setAlert', {
						'type': 'error',
						'msg': response.data.error
					});

					this.$store.dispatch('categories/setCategories', response.data.categories);
					this.loaded = true;  // Is neccessary because children mounted triggers before axios promise is filled.
				})
				.catch( error => {
					this.$store.dispatch( 'alerts/setAlert', {
						'type': 'error',
						'msg': 'Nepodarilo sa načítať kategórie.'
					});
				});
		},

		storeOrder() {
			let serialized = $('#sortableListsWrapper').find('.sortable').sortableListsToString();
			let url = apiRoutes.CATEGORIES_SORT_URL;

			serialized = serialized.replace(/no-parent/g, '0');
			url = url + serialized;

			axios.get( url + serialized )
				.then( response => {
					let data = response.data;
					console.log(data);
					if ( data.error ) return this.$store.dispatch( 'alerts/setAlert', {'type': 'error', 'msg': response.data.error});
					return this.$store.dispatch( 'alerts/setAlert', {'type': 'success', 'msg': 'Poradie kategórií bolo zmenené.'});
				})
				.catch( error => {
					return this.$store.dispatch( 'alerts/setAlert', {'type': 'error', 'msg': 'Pri ukladaní došlo k chybe.'});
				});
		}

	},

	computed: {
		categories() {
			return this.$store.state.categories.categories;
		}
	},

	created() {
		this.getCategories();
	},

	components: {
		CategoriesList
	},
};

</script>
