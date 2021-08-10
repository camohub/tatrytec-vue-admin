<template>
    <div>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <SideBar />

                <div class="col-9 col-xl-7">
                    <h2>Article edit <span v-if="this.article"> - {{this.article.title}}</span></h2>

                    <form v-if="this.article">

                        <div class="form-group">
                            <label for="meta_desc">Meta desc</label>
                            <input name="meta_desc" v-model="this.article.meta_desc" type="text" class="form-control" id="meta_desc" aria-describedby="meta_desc">
                        </div>

                        <div class="form-group">
                            <label for="title">Title</label>
                            <input name="title" v-model="article.title" type="text" class="form-control" id="title" aria-describedby="title">
                        </div>                        

                        <div class="form-group">
                            <label for="perex">Perex</label>
                            <textarea name="perex" v-model="this.article.perex" type="text" class="form-control" id="perex" aria-describedby="perex" rows="5"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="content">Text</label>
                            <textarea name="content" v-model="this.article.content" type="text" class="form-control" id="content" aria-describedby="content" rows="25"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="content">Kategórie</label>
                            <select name="categories" 
                                v-model="article.categoriesIds" 
                                id="categories" 
                                multiple 
                                class="form-control col-md-5" 
                                v-bind:size="this.selectSize">
                                <option v-for="(category, key) in selectCategories" 
                                    :key="key" 
                                    v-bind:value="key">{{category}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <input type="submit" class="btn btn-md btn-primary" value="Uložiť článok">
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

// @ is an alias to /src
import Header from "@/components/Header.vue"
import SideBar from "@/components/SideBar.vue"

import apiRoutes from "@/router/apiRoutes"

export default {

    name: "Article edit",

    data() {
        return {
            article: null,
            selectCategories: [1,2,3,4,5,6,7,8,9],
            a: 'aaaaaa'
        }
    },

    methods: {

        getArticle() {
            axios.get( apiRoutes.ARTICLE_EDIT_URL + this.$route.params.id )
                .then( response => {
                    console.log(response);
                    this.article = response.data.article;
                    this.selectCategories = response.data.selectCategories;
                })
                .catch( response => {
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa načítať článok.'});
                });
        },
    },

    computed: {
        selectSize() {
            return Object.keys(this.selectCategories).length;
        },
    },

    created () {
        this.getArticle();
    },

    components: {
        Header, SideBar,
    },
};

</script>
