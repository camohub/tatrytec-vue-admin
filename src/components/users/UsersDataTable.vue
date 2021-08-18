
<template>
	<div class="table-responsive">
        <table :id="id" class="table table-striped table-bordered table-hover" style="width:100% !important;">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created</th>
                    <th>Active</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td data-order='{{user.created_at}}'>{{getCreatedAt(user.created_at)}}</td>
                    <td :class="user.deleted_at ? 'text-danger' : 'text-success'">{{user.deleted_at ? 'deleted' : 'active'}}</td>
                    <td class="actions">
                        <router-link :to="'/user/edit/' + user.id" class="action"><font-awesome-icon icon="pencil-alt" /></router-link>
                        <a href="#" @click.prevent="toggleDelete(user.id)" class="action"><font-awesome-icon icon="eye" /></a>
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
import "datatables.net-dt/css/jquery.dataTables.min.css"


import 'bootstrap/dist/css/bootstrap.min.css'
//import "datatables.net-bs4/css/dataTables.bootstrap4.css"
//import "datatables.net-bs4/js/dataTables.bootstrap4.js"

//import 'datatables.net-bs4'

// fa font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPencilAlt, faTrash, faEye)


export default {

    name: 'UsersDataTable',

    data() {
        return {
            id: "usersDataTable",
            users: [],
            dataTableObject: null,
        }
    },

    computed: {
        issetArticles() {
            return this.articles.length > 0;
        }
    },

    methods: {

        getUsers() {
            axios.get( apiRoutes.USERS_URL )
                .then((response) => {
            	console.log(response.data);
					if( response.data.error ) return this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': response.data.error});

                    this.users = response.data.users;

                    this.$nextTick(function() {
                        this.setDataTable();
                    });
                })
                .catch((response) => {
                    console.log(response);
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa načítať uživateľov.'});
                });
        },

        toggleDelete(id) {
            axios.get( apiRoutes.ARTICLE_VISIBILITY_URL + id )
                .then( response => {

                    if( response.data.error ) return this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': response.data.error});

                    this.getArticles();
                    this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Viditeľnosť uživateľa bola zmenená.'});
                })
                .catch( response => {
                    console.log(response);
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa zmeniť viviteľnosti uživateľa.'});
                }); 
        },

        setDataTable() {
            var table = $('#'+this.id);

            if( this.dataTableObject ) return this.dataTableObject.draw();

            this.dataTableObject = table.DataTable({
            	'responsive': true,
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
        this.getUsers();
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
	width: 100%;
}

.actions {
    min-width: 80px;
    text-align: right;
}

.action {
    margin-left: 12px;
}

</style>
