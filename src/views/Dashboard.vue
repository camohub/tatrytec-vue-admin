<template>
    <div>
        <Header />
    </div>
    <div class="container-fluid">
        <div class="row">
            <SideBar />

            <div class="col-9">
                <h2>Dashboard</h2>
            </div>        
        </div>
    </div>
</template>


<script>

// @ is an alias to /src
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";

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
        Header,
        SideBar,
    },
};

</script>
