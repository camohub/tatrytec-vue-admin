<template>
    <form v-if="this.user" @submit.prevent="storeUser($event)">

        <div class="form-group">
            <label for="meta_desc">Meno</label>
            <input name="name" v-model="this.user.name" type="text" class="form-control" id="name" aria-describedby="name">
            <small v-if="formErrors.name" class="text-danger">{{formErrors.name[0]}}</small>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input name="email" v-model="this.user.email" type="text" class="form-control" id="email" aria-describedby="email">
            <small v-if="formErrors.email" class="text-danger">{{formErrors.email[0]}}</small>
        </div>

        <div class="form-group">
            <label for="password">Heslo</label>
            <input name="password" v-model="this.user.password" type="password" class="form-control" id="pasword" aria-describedby="password">
            <small v-if="formErrors.password" class="text-danger">{{formErrors.password[0]}}</small>
        </div>

        <div class="form-group">
            <label for="password_confirmation">Zopakujte heslo</label>
            <input name="password_confirmation" v-model="this.user.password_confirmation" type="password" class="form-control" id="pasword_confirmation" aria-describedby="password_confirmation">
            <small v-if="formErrors.password_confirmation" class="text-danger">{{formErrors.password_confirmation[0]}}</small>
        </div>

        <div class="form-group">
            <label for="content">Role</label>
            <select name="roles"
                    v-model="user.roles"
                    id="roles"
                    multiple
                    class="form-control col-md-5"
                    v-bind:size="this.selectSize">
                <option v-for="role in selectRoles"
                        :key="role.id"
                        v-bind:value="role.id">{{role.name}}</option>
            </select>
            <small v-if="formErrors.roles" class="text-danger">{{formErrors.roles[0]}}</small>
        </div>

        <div class="form-group">
            <input type="submit" class="btn btn-md btn-primary" value="Uložiť">
        </div>
    </form>

    <Loader v-if="loading" />
</template>


<script>

// @ is an alias to /src
import { ref } from "vue"
import { mapActions } from 'vuex'
import apiRoutes from "@/router/apiRoutes"
import router from '@/router'
import Loader from '@/components/Loader'


export default {

    name: "User form",

    props: ['id'],

    data() {
        return {
            user: null,
            selectRoles: [],
            formErrors: {},
            loading: 0,
        }
    },

    methods: {

        ...mapActions('alerts', ['setErrorAlert', 'setSuccessAlert']),

        createUser() {
            this.user = {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                roles: [],
            }
        },

        getUser() {
            this.loading++;
            axios.get( apiRoutes.USER_EDIT_URL + this.id )
                .then( response => {
                    if( response.data.error ) return this.setErrorAlert(response.data.error);
                    this.user = response.data.user;
                })
                .catch( response => {
                    this.setErrorAlert('Nepodarilo sa načítať profil.');
                })
                .then( () => this.loading-- );
        },

        storeUser(e) {
            this.loading++;
            let url = apiRoutes.USER_STORE_URL + (this.user.id ? '/' + this.user.id : '');
            axios.post( url, this.user )
                .then( response => {
                    if(response.data.error) return this.setErrorAlert(response.data.error);
                    else this.setSuccessAlert('Profil bol uložený.');

                    this.formErrors = {};
                    if( !this.id ) router.push( {name: 'User edit', params: {id: response.data.id}} );
                })
                .catch( error => {
                    console.log(error);
                    if ( error.response?.data?.errors ) this.formErrors = error.response.data.errors;
                    else this.formErrors = {};

                    this.setErrorAlert('Pri ukladaní došlo k chybe.');
                })
                .then( () => this.loading-- );
        },

        getSelectRoles() {
            this.loading++;
            axios( apiRoutes.USERS_ROLES_SELECT_URL )
                .then( response => {
                    this.selectRoles = response.data.selectRoles;
                })
                .catch( error => {
                    this.setErrorAlert('Nepodarilo sa načítať uživetľské role.');
                })
                .then( () => this.loading-- );
        },
    },

    computed: {
        selectSize() {
            return Object.keys(this.selectRoles).length;
        },
    },

    created () {
        if( this.id ) this.getUser();
        else this.createUser();

        this.getSelectRoles();
    },

    components: {
        Loader
    }
};

</script>
