<template>
    <div class="col-9 col-md-6 col-xl-5 offset-xl-1">
        <h2>Category create</h2>

		<CategoryForm />
	</div>
</template>


<script>

import { ref } from "vue"
import apiRoutes from '@/router/apiRoutes'
import CategoryForm from '@/components/categories/CategoryForm'


export default {

	name: "Category create",

	data() {
		return {

		}
	},

	methods: {

	},

	computed: {
	},

	created() {
	},

	components: {
		CategoryForm
	},
};

</script>
