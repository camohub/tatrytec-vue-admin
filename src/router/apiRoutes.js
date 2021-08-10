
let API_URL = 'http://localhost:8000/';


let LOGIN_URL = API_URL + 'api/vue-admin/login';

let AUTH_CHECK_URL = API_URL + 'api/auth-check';

let ARTICLES_URL = API_URL + 'api/articles';

let ARTICLE_VISIBILITY_URL = API_URL + 'api/article/visibility/';

let ARTICLE_EDIT_URL = API_URL + 'api/article/edit/';

let ARTICLE_DELETE_URL = API_URL + 'api/article/delete/';

let CATEGORIES_URL = API_URL + 'api/categories';




export default {

    LOGIN_URL: LOGIN_URL,

    ARTICLES_URL: ARTICLES_URL,

    ARTICLE_VISIBILITY_URL: ARTICLE_VISIBILITY_URL,

    ARTICLE_DELETE_URL: ARTICLE_DELETE_URL,

    CATEGORIES_URL: CATEGORIES_URL,

    AUTH_CHECK_URL: AUTH_CHECK_URL,

}