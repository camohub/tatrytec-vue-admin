<template>
    <div>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <SideBar />

                <div class="col-9">
                    <h2>Article create</h2>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

// @ is an alias to /src
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";

export default {

    name: "Article create",

    components: {
        Header,
        SideBar,
    },
};

</script>
