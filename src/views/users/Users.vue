<template>
	<div class="col-9 col-md-10 col-xl-8">
		<h2>Users</h2>

		<UsersDataTable />
	</div>
</template>


<script>

// @ is an alias to /src
import UsersDataTable from "@/components/users/UsersDataTable.vue";

export default {

    name: "Users",

    components: {
		UsersDataTable
    },
};

</script>
