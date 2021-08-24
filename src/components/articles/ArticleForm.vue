<template>
    <div>
        <form v-if="this.article" @submit.prevent="storeArticle($event)">

            <div class="form-group">
                <label for="meta_desc">Meta desc</label>
                <input name="meta_desc" v-model="this.article.meta_desc" type="text" class="form-control" id="meta_desc" aria-describedby="meta_desc">
                <small v-if="formErrors.meta_desc" class="text-danger">{{formErrors.meta_desc[0]}}</small>
            </div>

            <div class="form-group">
                <label for="title">Titulok</label>
                <input name="title" v-model="article.title" type="text" class="form-control" id="title" aria-describedby="title">
                <small v-if="formErrors.title" class="text-danger">{{formErrors.title[0]}}</small>
            </div>                        

            <div class="form-group">
                <label for="perex">Perex</label>
                <Editor name="perex" 
                    v-model="this.article.perex" 
                    :init="this.tinyInit" 
                    api-key="4hwg3k2s1gzjocmcfx4b8h0xncj2s0af92t6i1czkxed8uvz"
                    class="form-control tinymce" 
                    id="perex" 
                    aria-describedby="perex" 
                    rows="4"></Editor>
                    <small v-if="formErrors.perex" class="text-danger">{{formErrors.perex[0]}}</small>
            </div>

            <div class="form-group">
                <label for="content">Text</label>
                <Editor name="content" 
                    v-model="this.article.content" 
                    :init="this.tinyInit" 
                    api-key="4hwg3k2s1gzjocmcfx4b8h0xncj2s0af92t6i1czkxed8uvz"
                    class="form-control" 
                    id="content" 
                    aria-describedby="content" 
                    rows="25"></Editor>
                    <small v-if="formErrors.content" class="text-danger">{{formErrors.content[0]}}</small>
            </div>

            <div class="form-group">
                <label for="content">Kategórie</label>
                <select name="categories" 
                    v-model="article.categories" 
                    id="categories" 
                    multiple 
                    class="form-control col-md-5" 
                    v-bind:size="this.selectSize">
                    <option v-for="(category, key) in selectCategories" 
                        :key="key" 
                        v-bind:value="key.substr(3)">{{category}}</option>
                </select>
                <small v-if="formErrors.categories" class="text-danger">{{formErrors.categories[0]}}</small>
            </div>

            <div class="form-group">
                <input type="submit" class="btn btn-md btn-primary" value="Uložiť článok">
            </div>
            
        </form>

        <form @submit.prevent="" id="tinymceImageForm" class="d-none">
            <input ref="image" @change="this.storeImage($event, this.filePickerCallback);" type="file" name="image" id="tinymceImage">
            <input type="submit" value="Uložiť">
        </form>
    </div>

	<Loader v-if="loading" />
</template>


<script>

// @ is an alias to /src
import { ref } from "vue"
import router from '@/router'
import apiRoutes from "@/router/apiRoutes"
import Editor from '@tinymce/tinymce-vue'
import Loader from '@/components/Loader'

export default {

    name: "Article form",

    props: ['id'],

    data() {
        return {
            article: null,
            selectCategories: [],
            formErrors: {},
            loading: 0,

            tinyApiKey: '4hwg3k2s1gzjocmcfx4b8h0xncj2s0af92t6i1czkxed8uvz',
            tinyInit: {
                themes: "modern",
                entity_encoding: "raw",
                relative_urls: false,  // ie. if true file manager produce urls like ../../../../wrong.jpg
                content_css: "/tinymce-custom.css",
                image_advtab: true,
                image_class_list: [
                    { title: 'None', value: '' },
                    { title: 'Bootstrap fluid', value: 'img-fluid' },
                    { title: 'Left', value: 'fL' },
                    { title: 'Right', value: 'fR' },
                    { title: 'Gallery', value: 'gallery' }
                ],
                plugins: [
                    "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                    "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking",
                    "save table contextmenu directionality emoticons template paste textcolor"
                ],
                style_formats: [
                    { title: "Headers", items: [
                        { title: "Header 1", format: "h2"},
                        { title: "Header 2", format: "h3"},
                        { title: "Header 3", format: "h4"}
                    ]},
                    { title: "Inline", items: [
                        { title: "Bold", icon: "bold", format: "bold"},
                        { title: "Italic", icon: "italic", format: "italic"},
                        { title: "Underline", icon: "underline", format: "underline"},
                        { title: "Strikethrough", icon: "strikethrough", format: "strikethrough"},
                        { title: "Superscript", icon: "superscript", format: "superscript"},
                        { title: "Subscript", icon: "subscript", format: "subscript"},
                        { title: "Code", icon: "code", format: "code"}
                    ]},
                    { title: "Blocks", items: [
                        { title: "Paragraph", format: "p"},
                        { title: "Blockquote", format: "blockquote"},
                        { title: "Div", format: "div"},
                        { title: "Pre", format: "pre"}
                    ]}
                ],

                toolbar: "insertfile undo redo | styleselect | bold italic " +
                    "| alignleft aligncenter alignright alignjustify " +
                    "| bullist numlist | link image | media fullpage " +
                    "| forecolor backcolor",

                //file_browser_callback: function (field_name, url, type, win)  // version 4
                file_picker_callback: this.fileHandler,

            }
        }
    },

    methods: {

        createArticle() {
            this.article = {
                title: '',
                meta_desc: '',
                perex: '',
                content: '',
                categories: [],
            }
        },

        getArticle() {
            this.loading++;
            axios.get( apiRoutes.ARTICLE_EDIT_URL + this.id )
                .then( response => {
                    if( response.data.error ) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);
                    this.article = response.data.article;
                })
                .catch( response => {
                    this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa načítať článok.');
                })
                .then( () => this.loading-- );
        },
        
        getSelectCategories() {
            this.loading++;
            axios( apiRoutes.CATEGORIES_SELECT_URL )
                .then( response => {
                    this.selectCategories = response.data.selectCategories;
                })
                .catch( error => {
                    this.$store.dispatch('alerts/setErrorAlert', 'Nepodarilo sa načítať kategórie.');
                })
                .then( () => this.loading-- );
        },

        storeArticle(e) {
            this.loading++;
            let url = apiRoutes.ARTICLE_STORE_URL + (this.article.id ? '/' + this.article.id : '');
            axios.post( url, this.article )
                .then( response => {
                    if(response.data.error) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);
                    else this.$store.dispatch('alerts/setSuccessAlert', 'Článok bol uložený.');

                    this.formErrors = {};
                    if( !this.id ) router.push( {name: 'Article edit', params: {id: response.data.id}} );
                })
                .catch( error => {
                    console.log(error);
                    if ( error.response?.data?.errors ) this.formErrors = error.response.data.errors;
                    else this.formErrors = {};

                    this.$store.dispatch('alerts/setErrorAlert', 'Pri ukladaní došlo k chybe.');
                })
                .then( () => this.loading-- );
        },

        storeImage(e, filePickerCallback) {
            this.loading++;
            let url = apiRoutes.ARTICLE_IMAGE_ADD_URL;
            let headers = {'Content-Type': 'multipart/form-data'};
            let formData = new FormData();
            formData.append("image", this.$refs.image.files[0]);

            axios.post(url, formData, headers)
                .then( response => {
                    let data = response.data;
                    if( data.error ) return this.$store.dispatch('alerts/setErrorAlert', data.error);

                    let webUrl = apiRoutes.API_URL_SHORT;
                    filePickerCallback(webUrl + data.filePath);
                })
                .catch( error => {
                    let data = error.response.data;
                    console.log(data);
                    let msg = 'Pri ukladaní obrázku došlo k chybe.';
                    if( data.errors.image ) msg += '<br>' + data.errors.image[0];
                    this.$store.dispatch('alerts/setErrorAlert', msg);
                })
                .then( () => this.loading-- );
        },

        fileHandler(callback, value, meta) {
            if(meta.filetype == 'image')
            {
                this.filePickerCallback = callback;
                this.$refs.image.click();
            }
        },

        filePickerCallback: null,  // Filled by TinyMCE
    },

    computed: {
        selectSize() {
            return Object.keys(this.selectCategories).length;
        },
    },

    created () {
        if( this.id ) this.getArticle();
        else this.createArticle();

        this.getSelectCategories();
    },

    components: {
        Editor, Loader
    },
};

</script>
