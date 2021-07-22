
<template>
    <div id="alerts-wrapper">
        <div v-for="(item, index) in alerts" 
            :key="index"
            :class="{
                alert: true, 
                'alert-danger': item.type == 'error', 
                'alert-success': item.type == 'success', 
                'alert-info': item.type != 'success' && item.type != 'error' 
            }" 
            role="alert">
            {{item.msg}}
            <button v-if="!item.important" @click.prevent="remove(item.id)" type="button" class="close">×</button>
        </div>
    </div>
</template>




<script>

export default {
    name: 'Header',

    props: {
        
    },

    computed: {
        alerts() {
            return this.$store.state.alerts.alerts;
        }
    },

    methods: {
        remove(id) {
            this.$store.dispatch('alerts/removeAlert', id);
        }
    },

    components: {
        
    },
}
</script>



<style scoped lang="scss">

@import '@/assets/variables.scss';

#alerts-wrapper {
    position: fixed;
	bottom: 10px;
	right: 10px;
	width: 100%;
	max-width: 350px;
	z-index: 10000;

	.alert {
		padding: 2rem 1.5rem;
		color: #fff;
		box-shadow: $box-shadow-1;

		&.alert-info {
			background-color: $blue;
			border-color: darken($blue, 10%);
		}

		&.alert-success {
			background-color: $green;
			border-color: darken($green, 10%);
		}

		&.alert-danger {
			background-color: $red;
			border-color: darken($red, 10%);
		}

		.close {
			color: #fff;
		}
	}
}    
</style>