<template>
    <div class="col-sm-9 col-md-6 col-xl-5 offset-xl-1">
        <h2>User create</h2>

		<UserForm />
	</div>
</template>


<script>

import { ref } from "vue"
import apiRoutes from '@/router/apiRoutes'
import UserForm from '@/components/users/UserForm'


export default {

	name: "User create",

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
		UserForm
	},
};

</script>
