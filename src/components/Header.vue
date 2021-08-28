<template>
    <div class="container-fluid" id="header">
        <div class="row">
            <h1 class="col-12 col-sm-9">
                <img src="../assets/logo.png" alt="" class="img-responsive" />
                tatrytec.eu vue admin
            </h1>
            
            <div class="col-12 col-sm-3">
                <UserName />
            </div>
        </div>
    </div>
</template>

<script>

import UserName from '@/components/UserName.vue';

export default {
    name: 'Header',

    props: {
        
    },

    components: {
        UserName,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#header {

    @media(max-width: 575px) {
        margin-bottom: 14px;
    }

    background-color: #000;
    color: #fff;
    margin-bottom: 50px;
    border-bottom: 30px solid #41b883;

    h1 {
        padding: 40px 20px 20px;
        margin: 0;
    }

    img {
        max-height: 2.5rem;
    }
}

#userName {
    padding: 40px 20px 20px;
}
</style>
