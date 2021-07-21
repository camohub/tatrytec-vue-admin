<template>
    <div>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <SideBar />

                <div class="col-9">
                    <h2>Articles</h2>

                    <DataTable id="articlesDataTable"
                        :data="articles"
                        :class="'table-bordered table-stripped table-hover'"
                    >
                    </DataTable>



                    

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
import DataTable from '@/components/DataTable.vue';
import apiRoutes from "@/router/apiRoutes";

export default {

    name: "Articles",

    data() {
        return {
            articles: [],

            columnDefs: [
                { field: 'id', sortable: true },
                { field: 'title', sortable: true },
                { field: 'visible', sortable: true },
                { field: 'created_at', sortable: true },
                { field: 'user.name', sortable: true },
            ],

            rowData: null
        }
    },

    methods: {
        getArticles() {
            let user = this.$store.getters['user/getUser'];

            axios.get( apiRoutes.ARTICLES_URL )            
                .then((response) => {
                    let data = response.data;

                    if( data.errors )
                    {
                        this.$store.dispatch('alerts/setErrorAlerts', data.errors);
                        return;
                    }

                    this.articles = this.rowData = data.articles;
                    console.log(this.rowData);

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
        DataTable,
    },
    
    beforeMount() {
        this.getArticles();
    },

    mounted() {

        this.getArticles();
    },
};

</script>


<style lang="scss" scoped>


</style>