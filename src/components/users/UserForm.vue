<template>
    <div>
        <form v-if="this.article" @submit.prevent="storeArticle($event)">

            <div class="form-group">
                <label for="meta_desc">Meno</label>
                <input name="name" v-model="this.user.name" type="text" class="form-control" id="name" aria-describedby="name">
                <small v-if="formErrors.name" class="text-danger">{{formErrors.meta_desc[0]}}</small>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input name="email" v-model="this.user.email" type="text" class="form-control" id="email" aria-describedby="email">
                <small v-if="formErrors.email" class="text-danger">{{formErrors.meta_desc[0]}}</small>
            </div>

            <div class="form-group">
                <input type="submit" class="btn btn-md btn-primary" value="Uložiť">
            </div>
            
        </form>

        <form @submit.prevent="" id="tinymceImageForm" class="d-none">
            <input ref="image" @change="this.storeImage($event, this.filePickerCallback);" type="file" name="image" id="tinymceImage">
            <input type="submit" value="Uložiť">
        </form>
    </div>
</template>


<script>

// @ is an alias to /src
import { ref } from "vue"
import apiRoutes from "@/router/apiRoutes"
import Editor from '@tinymce/tinymce-vue'
import css from '@/utils/tinymce-custom.js'
import router from '@/router'

export default {

    name: "Article form",

    props: ['id'],

    data() {
        return {
            user: null,
            selectRoles: [],
            formErrors: {},
        }
    },

    methods: {

        createArticle() {
            this.user = {
                name: '',
            }
        },

        getUser() {
            axios.get( apiRoutes.USER_EDIT_URL + this.id )
                .then( response => {
                    if( response.data.error ) return this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': response.data.error});
                    this.article = response.data.user;
                })
                .catch( response => {
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa načítať profil.'});
                });
        },
        
        getSelectRoles() {
            axios( apiRoutes.USERS_ROLES_SELECT_URL )
                .then( response => {
                    this.selectCategories = response.data.selectCategories;
                })
                .catch( error => {
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa načítať uživetľské role.'});
                });
        },

        storeUser(e) {
            let url = apiRoutes.USER_STORE_URL + (this.article.id ? this.article.id : '');
            axios.post( url, this.article )
                .then( response => {
                    if(response.data.error) return this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': response.data.error});
                    else this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Prrofil bol uložený.'});
                    if( !this.id ) router.push( {name: 'User edit', params: {id: response.data.id}} );
                })
                .catch( error => {
                    console.log(error);
                    if ( error.response?.data?.errors ) {
                        this.formErrors = error.response.data.errors;
                    }

                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Pri ukladaní došlo k chybe.'});
                });
        },

        storeImage(e, filePickerCallback) {

            let url = apiRoutes.USER_IMAGE_ADD_URL;
            let headers = {'Content-Type': 'multipart/form-data'};
            let formData = new FormData();
            formData.append("image", this.$refs.image.files[0]);

            axios.post(url, formData, headers)
                .then( response => {
                    let data = response.data;
                    if( data.error ) return this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': data.error});

                    let webUrl = apiRoutes.API_URL_SHORT;
                    filePickerCallback(webUrl + data.filePath);
                })
                .catch( error => {
                    let data = error.response.data;
                    console.log(data);
                    let msg = 'Pri ukladaní obrázku došlo k chybe.';
                    if( data.errors.image ) msg += '<br>' + data.errors.image[0];
                    this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': msg});
                });
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
        Editor
    },
};

</script>
