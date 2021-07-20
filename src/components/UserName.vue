<template>
    <div id="userName">
        <span v-if="isLoggedIn">@{{user.name}}</span>
        <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    </div>
</template>



<script>

export default {
    
    name: 'UserName',
    
    props: {
        
    },

    computed: {

        user() {
            return this.$store.getters['user/getUser'];
        },

        isLoggedIn() {
            return this.$store.getters['user/isLoggedIn'];
        }

    },

    components: {

    },


}

</script>



<style>
#userName {
    text-align: right;
}    
</style>