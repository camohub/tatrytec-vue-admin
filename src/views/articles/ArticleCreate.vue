<template>
    <div class="col-9 col-xl-7">
        <h2>Article create</h2>

        <ArticleForm :id="this.id" />
    </div>
</template>


<script>

// @ is an alias to /src
import ArticleForm from '@/components/articles/ArticleForm'

export default {

    name: "Article create",

    data() {
        return {
            id: null,
        }
    },

    components: {
        ArticleForm
    },
};

</script>
