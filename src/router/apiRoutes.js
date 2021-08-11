
let API_URL_SHORT = 'http://localhost:8000';
let API_URL = API_URL_SHORT + '/';


export default {

    API_URL_SHORT: API_URL_SHORT,

    API_URL: API_URL,

    LOGIN_URL:API_URL + 'api/vue-admin/login',
    
    AUTH_CHECK_URL: API_URL + 'api/auth-check',
    
    ARTICLES_URL: API_URL + 'api/articles',
    
    ARTICLE_VISIBILITY_URL: API_URL + 'api/article/visibility/',
    
    ARTICLE_EDIT_URL: API_URL + 'api/article/edit/',
    
    ARTICLE_STORE_URL: API_URL + 'api/article/store/',
    
    ARTICLE_DELETE_URL: API_URL + 'api/article/delete/',
    
    ARTICLE_IMAGE_ADD_URL: API_URL + 'api/images/add/',
    
    CATEGORIES_URL: API_URL + 'api/categories',

}