<template>
    <div class="col-9 col-md-6 col-xl-5 offset-xl-1">
        <h2>User edit</h2>

        <UserForm :id="this.id" />
    </div>
</template>


<script>

import { ref } from "vue"
import apiRoutes from '@/router/apiRoutes'
import UserForm from '@/components/users/UserForm'


export default {

    name: "User edit",

    props: ['id'],

    components: {
        UserForm
    },
};

</script>
