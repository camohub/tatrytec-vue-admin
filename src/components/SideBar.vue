<template>
    <ul class="col-3 col-md-2" id="sideBar">

        <li><router-link to="/">Dashboard</router-link></li>
        <li><a href="#" @click.prevent="logout()">Logout</a></li>

        <h3>Articles</h3>
        <li><router-link to="/articles">Articles</router-link></li>
        <li><router-link to="/article/create">Create article</router-link></li>

        <h3>Categories</h3>
        <li><router-link to="/categories">Categories</router-link></li>
        <li><router-link to="/create/category">Create category</router-link></li>

        <h3>Users</h3>
        <li><router-link to="/users">Create categories</router-link></li>

    </ul>
</template>

<script>

export default {
    name: 'SideBar',

    props: {
        
    },

    methods: {

        logout() {
            this.$store.dispatch('user/removeUser');
            this.$store.dispatch('alerts/setAlert', {type: 'primary', msg: 'Boli ste hodený cez palubu. Ahoj.'});
            this.$router.push({name: 'Login'});
        }
    },

    components: {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '@/assets/variables.scss';

#sideBar {

    li {
        list-style-type: none;
    }

    h3 {
        margin: 50px 0 20px;
        font-size: 1.2rem;
        color: $vue-green;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        color: #999;
    }
}
</style>
