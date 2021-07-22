
<template>
    <div class="table-responsive">
        <table :id="id" :class="classes"></table>
    </div>
</template>


<script>

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

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

    created() {
        
        let id = this.id;
        let data = this.data;
        let fields = this.fields;

		$(document).ready( function () {
			let dataTable = $('#'+id).DataTable({
				data: data,
                columns: fields,
			});

            console.log(dataTable);
		});
	},
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
