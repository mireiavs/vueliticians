<template>
	<div class="wrapper">
		<div class="container-fluid main-text">
			<h2>Senators</h2>
			<p>First convened in 1789, the composition and powers of the Senate are established in Article One of the U.S. Constitution. Each state is represented by two senators, regardless of population, who serve staggered six-year terms. The Senate has several exclusive powers not granted to the House, including consenting to treaties as a precondition to their ratification and consenting to or confirming appointments of Cabinet secretaries, federal judges, other federal executive officials, military officers, regulatory officials, ambassadors, and other federal uniformed officers, as well as trial of federal officials impeached by the House.</p>
		</div>
		<div>{{members}}</div>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		mapActions
	} from 'vuex'

	export default {
		created() {
			this.getData();
		},
		computed: {
			...mapState([
				"members"
			])
		},
		methods: {
			...mapActions([
				"getData"
			])
		}
	}

</script>

<style>

</style>
