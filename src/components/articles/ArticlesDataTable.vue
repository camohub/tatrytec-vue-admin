
<template>
    <div class="table-responsive">
        <table :id="id" class="table table-striped table-bordered table-hover nowrap" style="width:100%;">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Created</th>
                    <th>Visible</th>
                    <th>Author</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="article in articles" :key="article.id">
                    <td>{{article.id}}</td>
                    <td>{{article.title}}</td>
                    <td :data-order="article.created_at">{{getCreatedAt(article.created_at)}}</td>
                    <td :class="article.visible ? 'text-success' : 'text-danger'">{{article.visible ? 'visible' : 'hidden'}}</td>
                    <td>{{article.user.name}}</td>
                    <td class="actions">
                        <router-link :to="{name: 'Article edit', params: { id: article.id}}" class="action"><font-awesome-icon icon="pencil-alt" /></router-link>
                        <a href="#" @click.prevent="toggleVisibility(article.id)" class="action"><font-awesome-icon icon="eye" /></a> 
                        <a href="#" @click.prevent="deleteArticle(article.id, $event)" class="action text-danger deleteBtn"><font-awesome-icon icon="trash" /></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Loader v-if="loading" />
</template>


<script>

import apiRoutes from "@/router/apiRoutes"
//Bootstrap and jQuery libraries
//import 'jquery/dist/jquery.min.js';
import $ from 'jquery'
//Datatable Modules
//import "datatables.net-dt/js/dataTables.dataTables"
//import "datatables.net-dt/css/jquery.dataTables.min.css"

import "datatables.net-bs4/css/dataTables.bootstrap4.css"
//import "datatables.net-bs4/js/dataTables.bootstrap4.js"
import 'datatables.net-bs4'

// fa font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPencilAlt, faTrash, faEye)

import Loader from '@/components/Loader'


export default {

    name: 'ArticlesDataTable',

    data() {
        return {
            id: "articlesDataTable",
            articles: [],
            dataTableObject: null,
            loading: 0,
        }
    },

    computed: {
        issetArticles() {
            return this.articles.length > 0;
        }
    },

    methods: {

        getArticles() {
            this.loading++;
            axios.get( apiRoutes.ARTICLES_URL ) 
                .then((response) => {
                    this.articles = response.data.articles;

                    this.$nextTick(function() {
                        this.setDataTable();
                    });
                })
                .catch( error => {
                    console.log(error);
                    this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa načítať články.');
                })
                .then( () => this.loading-- );
        },

        toggleVisibility(id) {
            this.loading++;
            axios.get( apiRoutes.ARTICLE_VISIBILITY_URL + id )
                .then( response => {

                    if( response.data.error ) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);

                    this.getArticles();
                    this.$store.dispatch('alerts/setSuccessAlert', 'Viditeľnosť článku bola zmenená.');
                })
                .catch( error => {
                    console.log(error);
                    this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa zmeniť viviteľnosti článku.');
                })
                .then( () => this.loading-- )
        },

        deleteArticle(id, e) {
            this.loading++;
            axios.get( apiRoutes.ARTICLE_DELETE_URL + id )
                .then( response => {

                    if( response.data.error ) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);

                    this.dataTableObject.row( $(e.target).closest('tr') ).remove().draw();
                    this.$store.dispatch('alerts/setSuccessAlert', 'Článok bol vymazaný.');
                })
                .catch( response => {
                    console.log(response);
                    this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa vymazať článok.');
                })
                .then( () => this.loading-- );
        },

        setDataTable() {
            var table = $('#'+this.id);

            if( this.dataTableObject ) return this.dataTableObject.draw();

            this.dataTableObject = table.DataTable({
                "pageLength": 10,
                "order": [[0, table.data('sort')]],
                "aoColumnDefs": [
                    {
                        "bSortable": false,
                        "aTargets": [-1] // gets last column and turns off sorting
                    }
                ],
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Slovak.json",
                }
            });

            // This is a bug in datatables-bs4 v3.2.x
            /*this.dataTableObject.on('draw', function(e) {
                $(this).closest('.dataTables_wrapper')
                    .removeClass('form-inline')
                    .find('.col-xs-12').addClass('col-12');
            });*/
        },

        getCreatedAt(timestamp) {
            let date = new Date(timestamp * 1000);
            let day = date.getDate() + 1;
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hours = ('0' + date.getHours()).substr(-2);
            let minutes = ('0' + date.getMinutes()).substr(-2);
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
        },

    },
    
    // Hook
    created() {

        this.getArticles();
    },

    components: {
        'font-awesome-icon': FontAwesomeIcon, Loader
    },
}
</script>


<style scoped>

table.dataTable {
    border-collapse: collapse !important;
}

</style>