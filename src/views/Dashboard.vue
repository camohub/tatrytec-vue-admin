<template>
    <div>
        <Header />
    </div>
    <h2>Dashboard</h2>
</template>


<script>

// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {

    name: "Dashboard",

    methods: {
        test() {
            console.log(this.$store.getters['user/getUser']);
        },
        
        testSet() {
            this.$store.dispatch('user/setUser', {'name': 'ccccccccc', 'surname': 'dddddddddddddd'});
        }
    },

    components: {
        Header
    },
};

</script>
