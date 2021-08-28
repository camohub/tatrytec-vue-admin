<template>
    <div class="col-sm-3 col-md-2">
        <a :ref="bars" id="bars" @click.prevent="toggleSideBar" class="d-block d-sm-none"><font-awesome-icon icon="bars" /> Menu</a>

        <ul id="sideBar">

            <li><router-link :to="{name: 'Dashboard'}">Dashboard</router-link></li>
            <li><a href="#" @click.prevent="logout()">Logout</a></li>

            <h3>Articles</h3>
            <li><router-link :to="{name: 'Articles'}">Articles</router-link></li>
            <li><router-link :to="{name: 'Article create'}">Create article</router-link></li>

            <h3>Categories</h3>
            <li><router-link :to="{name: 'Categories'}">Categories</router-link></li>
            <li><router-link :to="{name: 'Category create'}">Create category</router-link></li>

            <h3>Users</h3>
            <li><router-link :to="{name: 'Users'}">Users</router-link></li>
            <li><router-link :to="{name: 'User create'}">Create user</router-link></li>

        </ul>
    </div>
</template>


<script>

import { ref } from "vue"

// fa font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faBars)

export default {
    name: 'SideBar',

    methods: {

        logout() {
            this.$store.dispatch('user/removeUser');
            this.$store.dispatch('alerts/setAlert', {type: 'primary', msg: 'Boli ste hodený cez palubu. Ahoj.'});
            this.$router.push({name: 'Login'});
        },

        toggleSideBar() {
            $('#sideBar').slideToggle();
        }
    },

    components: {
        'font-awesome-icon': FontAwesomeIcon
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import '@/assets/variables.scss';

#sideBar {

    margin-bottom: 50px;
    padding: 0;

    @media(max-width: 575px) {
        display: none;
        text-align: center;
        margin-top: 14px;
        margin-bottom: 14px;
    }

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

        &.router-link-active {
             color: #555;
        }
    }
}

#bars {
    padding: 0 14px 14px 0;
    color: $vue-green;
}
</style>
