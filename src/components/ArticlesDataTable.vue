
<template>
    <div class="table-responsive">
        <table :id="id" class="table table-striped table-bordered table-hover nowrap" width="100%;">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Created</th>
                    <th>Visible</th>
                    <th>User</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="article in articles" :key="article.id">
                    <td>{{article.id}}</td>
                    <td>{{article.title}}</td>
                    <td data-order='{{article.created_at}}'>{{getCreatedAt(article.created_at)}}</td>
                    <td :class="article.visible ? 'text-success' : 'text-danger'">{{article.visible ? 'visible' : 'hidden'}}</td>
                    <td>{{article.user.name}}</td>
                    <td class="actions">
                        <router-link to="/article/edit" class="action"><font-awesome-icon icon="pencil-alt" /></router-link> 
                        <a href="#" @click.prevent="toggleVisibility(article.id)" class="action"><font-awesome-icon icon="eye" /></a> 
                        <a href="#" @click.prevent="deleteArticle(article.id, $event)" class="action text-danger deleteBtn"><font-awesome-icon icon="trash" /></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>

import apiRoutes from "@/router/apiRoutes"
//Bootstrap and jQuery libraries
//import 'jquery/dist/jquery.min.js';
import $ from 'jquery'
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
//import "datatables.net-dt/css/jquery.dataTables.min.css"


import 'bootstrap/dist/css/bootstrap.min.css'
import "datatables.net-bs4/css/dataTables.bootstrap4.css"
import "datatables.net-bs4/js/dataTables.bootstrap4.js"

// fa font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPencilAlt, faTrash, faEye)


export default {

    name: 'ArticlesDataTable',

    data() {
        return {
            id: "articlesDataTable",
            articles: [],
            dataTableObject: null,
            dataTableDeleteRow: null,
        }
    },

    computed: {
        issetArticles() {
            return this.articles.length > 0;
        }
    },

    methods: {

        getArticles() 
        {
            axios.get( apiRoutes.ARTICLES_URL ) 
                .then((response) => {
                    this.articles = response.data.articles;

                    this.$nextTick(function() {
                        this.setDataTable();
                    });
                })
                .catch((response) => {
                    console.log(response);
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa načítať články.'});
                });
        },

        toggleVisibility(id) 
        {
            axios.get( apiRoutes.ARTICLE_VISIBILITY_URL + id )
                .then( response => {

                    if( response.data.error ) return this.$store.dispatch('alerts/setAlert', response.data.error);

                    this.getArticles();
                    this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Viditeľnosť článku bola zmenená.'});
                })
                .catch( response => {
                    console.log(response);
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa zmeniť viviteľnosti článku.'});
                }); 
        },

        deleteArticle(id, e) 
        {
            axios.get( apiRoutes.ARTICLE_DELETE_URL + id )
                .then( response => {

                    if( response.data.error ) return this.$store.dispatch('alerts/setAlert', response.data.error);

                    this.dataTableObject.row( $(e.target).closest('tr') ).remove().draw();
                    this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Článok bol vymazaný.'});
                })
                .catch( response => {
                    console.log(response);
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa vymazať článok.'});
                }); 
        },

        setDataTable() 
        {
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
        },

        getCreatedAt(timestamp) 
        {
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
        'font-awesome-icon': FontAwesomeIcon,
    },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
table.dataTable {
    border-collapse: collapse !important;
}

.actions {
    min-width: 80px;
    text-align: right;
}

.action {
    margin-left: 7px;
}

</style>
