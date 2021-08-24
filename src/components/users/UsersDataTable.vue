
<template>
    <div class="table-responsive">
        <table :id="id" class="table table-striped table-bordered table-hover nowrap" style="width:100%;">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Active</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td :data-sort="user.created_at">{{getCreatedAt(user.created_at)}}</td>
                    <td :class="user.deleted_at ? 'text-danger' : 'text-success'">{{user.deleted_at ? 'deleted' : 'active'}}</td>
                    <td class="actions">
                        <router-link :to="{name: 'User edit', params: {id: user.id}}" class="action"><font-awesome-icon icon="pencil-alt" /></router-link>
                        <a href="#" @click.prevent="toggleDelete(user.id)" class="action"><font-awesome-icon icon="eye" /></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Loader v-if="loading" />
</template>


<script>

import apiRoutes from "@/router/apiRoutes"
//import $ from 'jquery'
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

    name: 'UsersDataTable',

    data() {
        return {
            id: "usersDataTable",
            users: [],
            dataTableObject: null,
            loading: 0,
        }
    },

    methods: {

        getUsers() {
            this.loading++;
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
                })
                .then(() => this.loading--);
        },

        toggleDelete(id) {
            this.loading++;
            axios.get( apiRoutes.USER_TOGGLE_DELETE_URL + id )
                .then( response => {

                    if( response.data.error ) return this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': response.data.error});

                    this.getUsers();
                    this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Viditeľnosť uživateľa bola zmenená.'});
                })
                .catch( response => {
                    console.log(response);
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa zmeniť viviteľnosti uživateľa.'});
                })
                .then( () => this.loading-- );
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

            this.dataTableObject.on('draw', function(e) {
                $(this).closest('.dataTables_wrapper')
                    .removeClass('form-inline')
                    .find('.col-xs-12').addClass('col-12');
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
        'font-awesome-icon': FontAwesomeIcon, Loader
    },
}
</script>


<style scoped>

table.dataTable {
    border-collapse: collapse !important;
}

</style>