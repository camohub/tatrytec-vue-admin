<template>
    <div class="col-sm-9 col-xl-7">
        <h2>Article edit</h2>

        <ArticleForm :id="this.id" />
    </div>
</template>


<script>

// @ is an alias to /src
import ArticleForm from '@/components/articles/ArticleForm'

export default {

    name: "Article edit",

    props: ['id'],

    components: {
        ArticleForm
    },

};

</script>
