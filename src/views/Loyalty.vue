<template>
	<div>
		<div class="attendance">
			<div class="tables-text">
				<h2>Party Loyalty</h2>
				<p>Those who consider themselves to be strong partisans, strong Democrats and strong Republicans respectively, tend to be the most faithful in voting for their party's nominee for office and legislation that backs their party's agenda. </p>
			</div>
			<Ataglance></Ataglance>
		</div>
		<Loyaltytables></Loyaltytables>
	</div>
</template>

<script>
	import Ataglance from "../components/Ataglance.vue"
	import Loyaltytables from "../components/Loyaltytables.vue"

	export default {
		components: {
			Ataglance,
			Loyaltytables
		}
	}

</script>

<style>
	.attendance,
	.loyalty {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}

	.tables-text {
		max-width: 50%;
		padding-left: 15px;
		margin-top: 25px
	}

</style>
