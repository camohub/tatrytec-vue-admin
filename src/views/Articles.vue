<template>
    <div>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <SideBar />

                <div class="col-9">
                    <h2>Articles</h2>

                    <ul>
                        <li v-for="(article, index) in articles" :key="index">{{article.title}}</li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>


<script>

// @ is an alias to /src
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";

import apiRoutes from "@/router/apiRoutes"
import axios from "axios";

export default {

    name: "Articles",

    data() {
        return {
            articles: [],
        }
    },

    methods: {
        getArticles() {

            axios.get( apiRoutes.ARTICLES_URL )
                .then((response) => {
                    let data = response.data;

                    if( data.errors )
                    {
                        this.$store.dispatch('alerts/setErrorAlerts', data.errors);
                        return;
                    }

                    this.articles = data.articles;
                })
                .catch((respose) => {
                    console.log(respose);
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa načítať články.'});
                });
        }
    },

    components: {
        Header,
        SideBar,
    },

    mounted() {
        this.getArticles();
    },
};

</script>
