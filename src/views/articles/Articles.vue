<template>
    <div class="col-sm-9 col-md-10 col-xl-8">
        <h2>Articles</h2>

        <ArticlesDataTable />
    </div>
</template>


<script>

// @ is an alias to /src
import ArticlesDataTable from '@/components/articles/ArticlesDataTable.vue';

export default {

    name: "Articles",

    components: {
        ArticlesDataTable,
    }
};

</script>