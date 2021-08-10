<template>
    <div>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <SideBar />

                <div class="col-9 col-md-10">
                    <h2>Articles</h2>

                    <ArticlesDataTable />
                </div>
            </div>
        </div>
    </div>
</template>


<script>

// @ is an alias to /src
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import ArticlesDataTable from '@/components/articles/ArticlesDataTable.vue';

export default {

    name: "Articles",

    data() {
        return {}
    },

    methods: {

    },

    components: {
        Header,
        SideBar,
        ArticlesDataTable,
    }
};

</script>


<style lang="scss" scoped>


</style>