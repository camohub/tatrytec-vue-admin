<template>
	<ul :class="{'sortable': level == 0}">
		<li  v-for="category in categories"
			 :key="category.id"
			 :id="'menuItem_' + category.id"
			 :data-module="category.module?.id ? category.module?.id : 0"
		>
			<div>
				{{category.name}}
				<a v-if="category.slug != 'najnovsie'"
					@click.prevent="this.deleteCategory($event, category.id)"
					class="ignore action text-danger"
					title="Delete">
					<font-awesome-icon icon="trash" />
				</a>

				<router-link v-if="category.slug != 'najnovsie'" :to="{name: 'Category edit', params: { id: category.id}}" class="ignore action">
					<font-awesome-icon icon="pencil-alt" title="Edit" />
				</router-link>

				<a v-if="category.slug != 'najnovsie'"
					@click.prevent="this.toggleVisibility($event, category.id)"
					:class="{'ignore': true, 'action': true, 'text-success': category.visible, 'text-danger': !category.visible}"
					title="Visible/Hidden">
					<font-awesome-icon icon="eye" />
				</a>
			</div>

			<CategoriesList v-if="category.all_children?.length" :categories="category.all_children" :level="1 + level" />
		</li>
	</ul>
</template>


<script>

// @ is an alias to /src
import 'jquery-sortable-lists'
import apiRoutes from "@/router/apiRoutes"
import CategoriesList from "@/components/categories/CategoriesList"
// fa font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPencilAlt, faTrash, faEye)


export default {

	name: "Categories",

	props: [
		'categories', 'level'
	],

	data() {
		return {

		}
	},

	methods: {
		deleteCategory(e, id) {

			if( !confirm('Naozaj chcete kategóriu zmazať?') ) return;

			let url = apiRoutes.CATEGORY_DELETE_URL + id;
			axios(url)
				.then( response => {
					if( response.data.error ) return this.$store.dispatch('alerts/setErrorAlert', response.data.error);

					this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Kategória bola zmazaná.'});
					this.removeElement(e.target);
				})
				.catch( error => {
					this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': 'Nepodarilo sa zmazať kategóriu.'});
				});
		},


		toggleVisibility(e, id) {
			let url = apiRoutes.CATEGORY_VISIBILITY_URL + id;

			axios.get(url)
				.then( response => {
					if ( response.data.error ) return this.$store.dispatch('alerts/setAlert', {'type': 'error', 'msg': response.data.error});

					this.$store.dispatch('alerts/setAlert', {'type': 'success', 'msg': 'Viditeľnosť kategórie bola zmenená.'});
					$(e.target).closest('a').toggleClass('text-danger').toggleClass('text-success');
				})
				.catch(function( error ) {
					showAlert('Pri ukladaní údajov došlo k chybe.', 'error');
				});
		},


		removeElement(target) {
			target = $(target);
			let ul = target.closest('ul');
			target.closest('li').remove();
			if( !ul.find('li').length )  // Has to be after li.remove()
			{
				ul.closest('li').find('.s-l-opener').remove();
				ul.remove();
			}
		}
	},

	created() {
		this.dataCategories = this.categories;
	},

	mounted() {
		let sortableList = $('.sortable');

		if( sortableList.hasClass('mounted') ) return;

		sortableList.sortableLists({
			placeholderCss: {
				'background-color': '#fffdc7', 'border': '2px solid #fff'
			},
			hintCss: {
				'background-color': '#c1ffc0', 'border': '2px solid #fff'
			},
			ignoreClass: 'ignore',
			insertZone: 80,
			opener: {
				active: true,
				as: 'html',  // or "class" or skip if using background-image url
				close: '<i class="c7">&minus;</i>', // or 'fa fa-minus' or './imgs/Remove2.png'
				open: '<i class="c3">&plus;</i>', // or 'fa fa-plus' or './imgs/Add2.png'
				openerCss: {
					'margin-bottom': '7px',
					'margin-right': '7px',
					'cursor': 'pointer'
				}
			}
		});

		sortableList.addClass('mounted');
	},

	components: {
		CategoriesList,
		'font-awesome-icon': FontAwesomeIcon,
	},
};

</script>