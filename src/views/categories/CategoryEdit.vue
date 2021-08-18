<template>
    <div class="col-9 col-md-6 col-xl-5 offset-xl-1">
        <h2>Category edit</h2>

		<CategoryForm :id="this.id" />
	</div>
</template>


<script>

import { ref } from "vue"
import apiRoutes from '@/router/apiRoutes'
import CategoryForm from '@/components/categories/CategoryForm'


export default {

	name: "Category edit",

	data() {
		return {
			id: null,
		}
	},

	methods: {

	},

	computed: {
	},

	created() {
		this.id = this.$route.params.id
	},

	components: {
		CategoryForm
	},
};

</script>
