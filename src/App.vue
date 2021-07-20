<template>
    <div>
        <router-view></router-view>
        <Alerts />
    </div>
</template>


<script>

import Alerts from "@/components/Alerts.vue";

export default {

    components: {
        Alerts,
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
</style>
