<template>
    <div>
        <Header />

        <div class="container-fluid pb-5">
            <div class="row">
                <SideBar />
                <router-view></router-view>
            </div>
        </div>

        <Alerts />
    </div>
</template>


<script>

import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";
import Alerts from "@/components/Alerts.vue";

export default {

    components: {
        Alerts, Header, SideBar
    }
}
</script>


<style lang="scss">

html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    h2 {
        margin-bottom: 20px;
    }

    a {
        text-decoration: none;
    }
}

/***************************************************************/
/*** DATATABLES ************************************************/
/***************************************************************/

div.table-responsive {
    padding-top: 4px;
    padding-right: 3px;
    margin-bottom: 50px;
}

table.dataTable {
    border-collapse: collapse !important;
}

.dataTable .actions {
    min-width: 80px;
    text-align: right;

    .action {
        margin-left: 12px;
    }
}

.dataTables_length select {
    margin-left: 7px;
    margin-right: 7px;
}

/************************************************************/
/*** FORMS **************************************************/
/************************************************************/

form {
    max-width: 1000px;
}

label {
    font-weight: bold;
}

.form-group .text-danger {
    display: inline-block;
    margin-top: 7px;
    font-weight: bold;
}

/**********************************************************/
/*** SORTABLE LISTS ***************************************/
/**********************************************************/

#sortableListsWrapper {
    margin: 14px 0 14px 0;
    padding: 2px;
    border: 2px solid #FAFAFA;
}

#sortableListsWrapper ul.sortable,
#s-l-base {
    margin-left: 0;
    list-style-type: none;
}

#sortableListsWrapper ul,
#s-l-base ul {
    padding: 0;
    margin: 0 0 0 80px;
    color: #375f8e;
    list-style-type: none;

    &.sortable {
         margin-left: 0;
    }
}

#sortableListsWrapper ul li,
#s-l-base li {
    background-color: #fff;
    font-weight: bold;
}

#sortableListsWrapper ul li div,
#s-l-base div {
    padding: 14px 14px 14px 20px;
    background-color: #FAFAFA;
    border: 1px solid #fff;
    border-radius: 3px;
}

#sortableListsWrapper .action,
#s-l-base .action {
    float: right;
    margin-left: 12px;
}

</style>
