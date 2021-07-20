<template>
    <div>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <LoginForm />
            </div>
        </div>
    </div>
</template>


<script>

// @ is an alias to /src
import Header from "@/components/Header.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {

    name: "Login",

    components: {
        Header,
        LoginForm,
    },
};

</script>
