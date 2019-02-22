<template>
	<div>
		<Senatetext></Senatetext>
		<Memberlist></Memberlist>
	</div>

</template>


<script>
	import Senatetext from "../components/Senatetext.vue"
	import Memberlist from "../components/Memberlist.vue"

	export default {
		data() {
			return {

			}
		},
		components: {
			Senatetext,
			Memberlist
		}
	}

</script>

<style>

</style>
