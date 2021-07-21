
<template>
    <div class="table-responsive">
        <table :class="classes" :id="id"></table>
    </div>
</template>


<script>

export default {

    name: 'DataTable',

    props: {
        id: String,
        data: Array,
        fields: Object,
        class: String,
    },

    computed: {
        classes() {
            return 'table ' + this.class;
        }
    },

    components: {

    },

    mounted() {
        var data = [
            [
                "Tiger Nixon",
                "System Architect",
                "Edinburgh",
                "5421",
                "2011/04/25",
                "$3,120"
            ],
            [
                "Garrett Winters",
                "Director",
                "Edinburgh",
                "8422",
                "2011/07/25",
                "$5,300"
            ]
        ];
		$(document).ready( function () {
			$('#'+this.id).DataTable({
				data: data,
			});
		});
	},
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
