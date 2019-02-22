<template>
	<div>
		<div class="attendance">
			<div class="tables-text">
				<h2>Attendance</h2>
				<p>The Constitution specifies that a majority of members constitutes a quorum to do business in each house. Representatives and senators rarely force the presence of a quorum by demanding quorum calls; thus, in most cases, debates continue even if a majority is not present.</p>

				<p>The Senate uses roll-call votes; a clerk calls out the names of all the senators, each senator stating "aye" or "no" when his or her name is announced. The House reserves roll-call votes for the most formal matters, as a roll-call of all 435 representatives takes quite some time; normally, members vote by electronic device. In the case of a tie, the motion in question fails. In the Senate, the Vice President may (if present) cast the tiebreaking vote.</p>
			</div>
			<Ataglance></Ataglance>
		</div>
		<Attendancetables></Attendancetables>
	</div>
</template>

<script>
	import Ataglance from "../components/Ataglance.vue"
	import Attendancetables from "../components/Attendancetables.vue"

	export default {
		components: {
			Ataglance,
			Attendancetables
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
