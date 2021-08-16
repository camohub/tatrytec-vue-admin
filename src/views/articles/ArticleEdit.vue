<template>
    <div class="col-9 col-xl-7">
        <h2>Article edit</h2>

        <ArticleForm :id="this.id" />
    </div>
</template>


<script>

// @ is an alias to /src
import ArticleForm from '@/components/articles/ArticleForm'

export default {

    name: "Article edit",

    data() {
        return {
            id: null,
        }
    },

    created () {
        this.id = this.$route.params.id
    },

    components: {
        ArticleForm
    },

};

</script>
