<template>
    <form v-if="this.category" @submit.prevent="storeCategory($event)">
        <div class="form-group">
            <label for="name">Názov</label>
            <input name="meta_desc" v-model="category.name" type="text" class="form-control" id="meta_desc" aria-describedby="meta_desc">
            <small v-if="formErrors.name" class="text-danger">{{formErrors.name[0]}}</small>
        </div>

        <div class="form-group">
            <label for="content">Nadradená kategória</label>
            <select name="categories"
                v-model="category.parent_id"
                id="categories"
                class="form-control"
                v-bind:size="this.selectSize">
                <option value></option>
                <option v-for="(category, key) in selectCategories"
                    :key="key"
                    v-bind:value="key.substr(3)">{{category}}</option><!-- substr() needs to remove id_ prefix -->
            </select>
            <small v-if="formErrors.parent_id" class="text-danger">{{formErrors.parent_id[0]}}</small>
        </div>

        <div class="form-group">
            <input type="submit" class="btn btn-md btn-primary" value="Uložiť kategóriu">
        </div>
    </form>
    <Loader v-if="loading" />
</template>


<script>

// @ is an alias to /src
import { ref } from "vue"
import router from '@/router'
import apiRoutes from "@/router/apiRoutes"
import Loader from '@/components/Loader'

export default {

    name: "Category form",

    props: ['id'],

    data() {
        return {
            category: null,
            selectCategories: [],
            formErrors: {},
            loading: 0,
        }
    },

    methods: {

        createCategory() {
            this.category = {
                name: '',
                parent_id: null,
            }
        },

        getCategory() {
            this.loading++;
            axios.get( apiRoutes.CATEGORY_EDIT_URL + this.id )
                .then( response => {
                    if( response.data.error ) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);
                    this.category = response.data.category;
                })
                .catch( response => {
                    this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa načítať kategóriu.');
                })
                .then( () => this.loading-- );
        },
        
        getSelectCategories() {
            this.loading++;
            axios( apiRoutes.CATEGORIES_SELECT_URL )
                .then( response => {
                    console.log(response.data.selectCategories);
                    this.selectCategories = response.data.selectCategories;
                })
                .catch( error => {
                    this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa načítať kategórie.');
                })
                .then( () => this.loading-- );
        },

        storeCategory(e) {
            this.loading++;
            let url = apiRoutes.CATEGORY_STORE_URL + (this.category.id ? '/' + this.category.id : '');
            axios.post( url, this.category )
                .then( response => {
                    if(response.data.error) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);
                    else this.$store.dispatch('alerts/setSuccessAlert', 'Kategória bola uložená.');

                    this.formErrors = {};
                    if( !this.id ) router.push( {name: 'Category edit', params: {id: response.data.id}} );
                })
                .catch( error => {
                    console.log(error);
                    if ( error.response?.data?.errors ) this.formErrors = error.response.data.errors;
                    else this.formErrors = {};

                    this.$store.dispatch('alerts/setErrorAlert', 'Pri ukladaní došlo k chybe.');
                })
                .then( () => this.loading-- );
        },
    },

    computed: {
        selectSize() {
            return Object.keys(this.selectCategories).length + 1;  // + 1 for prompt
        },
    },

    created () {
        if( this.id ) this.getCategory();
        else this.createCategory();

        this.getSelectCategories();
    },

    components: {
        Loader
    },
};

</script>
