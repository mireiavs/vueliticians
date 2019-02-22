<template>
	<div>
		<headercomponent></headercomponent>
		<navcomponent></navcomponent>

		<router-view></router-view>
		<router-view name="memberList"></router-view>

		<footercomponent></footercomponent>
	</div>
</template>



<script>
	import navcomponent from "./components/Navcomp.vue";
	import headercomponent from "./components/Headercomp.vue";
	import footercomponent from "./components/Footercomp.vue";

	export default {
		components: {
			navcomponent,
			headercomponent,
			footercomponent
		}
	}

</script>

<style>

</style>
