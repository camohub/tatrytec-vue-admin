<template>
    <div class="col-9 col-xl-5 offset-xl-1">
        <h2>Categories</h2>

		<span @click="storeOrder" v-if="this.loaded" class="btn btn-sm btn-primary editOrder">Uložiť poradie</span>

		<div id="sortableListsWrapper" v-if="this.loaded">
			<CategoriesList :categories="this.categories" :level="0" />
		</div>

		<span @click="storeOrder" v-if="this.loaded" class="btn btn-sm btn-primary editOrder">Uložiť poradie</span>
	</div>
	<Loader v-if="loading" />
</template>


<script>

import { ref } from "vue"
import apiRoutes from '@/router/apiRoutes'
import CategoriesList from '@/components/categories/CategoriesList'
import Loader from '@/components/Loader'


export default {

	name: "Categories",

	data() {
		return {
			loaded: false,
			loading: 0,
		}
	},

	methods: {

		getCategories() {
			this.loading++;
			let url = apiRoutes.CATEGORIES_URL;
			axios.get( url )
				.then( response => {
					if ( response.data.error ) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);

					this.$store.dispatch('categories/setCategories', response.data.categories);
					this.loaded = true;  // Is neccessary because children mounted triggers before axios promise is filled.
				})
				.catch( error => {
					this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa načítať kategórie.');
				})
				.then( () => this.loading-- );
		},

		storeOrder() {
			this.loading++;
			let serialized = $('#sortableListsWrapper').find('.sortable').sortableListsToString();
			let url = apiRoutes.CATEGORIES_SORT_URL;

			serialized = serialized.replace(/no-parent/g, '0');
			url = url + serialized;

			axios.get( url + serialized )
				.then( response => {
					if ( response.data.error ) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);
					return this.$store.dispatch( 'alerts/setSuccessAlert', 'Poradie kategórií bolo zmenené.');
				})
				.catch( error => {
					return this.$store.dispatch('alerts/setErrorAlert', 'Pri ukladaní došlo k chybe.');
				})
				.then( () => this.loading-- );
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
		CategoriesList, Loader
	},
};

</script>
