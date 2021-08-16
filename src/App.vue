<template>
    <div>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <SideBar />
                <router-view></router-view>
            </div>
        </div>
        <Alerts />
    </div>
</template>


<script>

import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import Alerts from "@/components/Alerts.vue";

export default {

    components: {
        Alerts, Header, SideBar
    }
}
</script>


<style lang="scss">

html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    h2 {
        margin-bottom: 20px;
    }
}

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

div.table-responsive {
    padding-top: 4px;
    margin-bottom: 50px;
}

#articlesDataTable_length {
    select {
        margin-left: 7px;
        margin-right: 7px;
    }
}

label {
    font-weight: bold;
}

.form-group .text-danger {
    display: inline-block;
    margin-top: 7px;
    font-weight: bold;
}

</style>
