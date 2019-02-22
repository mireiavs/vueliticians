<template>
	<div class="at-a-glance-table">
		<h2>{{chamber}} at a glance</h2>
		<loader v-if="members.length === 0"></loader>
		<table v-else class="table text-center table-striped">
			<thead>
				<tr>
					<th>Party</th>
					<th>Number of Reps</th>
					<th>% Voted with Party</th>
				</tr>
			</thead>
			<tbody id="at-a-glance">
				<tr v-for="party in parties">
					<td>{{ party.name }}</td>
					<td>{{ party.numberOfReps }}</td>
					<td>{{ party.avgVoteswParty || 0 }}%</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td>Total</td>
					<td>{{ totalReps() }}</td>
					<td>{{ totalAvgVotes() }}%</td>
				</tr>
			</tfoot>
		</table>
	</div>

</template>

<script>
	import Loader from "./Loader.vue"

	export default {
		created() {
			this.getData();
		},
		beforeUpdate() {
			this.getData();
		},
		data() {
			return {
				members: [],
				parties: [{
					name: "Democrats",
				}, {
					name: "Republicans"
				}, {
					name: "Independents"
				}],
			}
		},
		components: {
			Loader
		},
		computed: {
			chamber() {
				if (this.$route.path.includes("senate")) {
					return "Senate"
				} else if (this.$route.path.includes("house")) {
					return "House"
				}
			}
		},
		methods: {
			getData() {
				if (this.$route.path.includes("senate")) {
					var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
				} else if (this.$route.path.includes("house")) {
					var url = "https://api.propublica.org/congress/v1/113/house/members.json";
				}
				fetch(url, {
						headers: {
							"X-API-Key": "jmVgidrA236zStXzcxshkOG8NskSEWXqCjw2TOlN"
						}
					})
					.then(dataFromPP => dataFromPP.json())
					.then(ppObject => {
						this.members = ppObject.results[0].members;
						this.getStatistics();
					})
					.catch(error => console.log(error))
			},
			getPartyList(party) {
				return this.members.filter(member => member.party === party);
			},
			getAvgVotesWithParty(party) {
				var partyList = this.getPartyList(party);
				var total = 0;
				partyList.forEach(member =>
					total = total + member.votes_with_party_pct
				);
				return Math.round(total / partyList.length * 100) / 100;
			},
			getStatistics() {
				this.parties[0].numberOfReps = this.getPartyList("D").length;
				this.parties[1].numberOfReps = this.getPartyList("R").length;
				this.parties[2].numberOfReps = this.getPartyList("I").length;
				this.parties[0].avgVoteswParty = this.getAvgVotesWithParty("D");
				this.parties[1].avgVoteswParty = this.getAvgVotesWithParty("R");
				this.parties[2].avgVoteswParty = this.getAvgVotesWithParty("I");
			},
			totalReps() {
				return this.parties.reduce((total, party) => {
					return total + party.numberOfReps;
				}, 0);
			},
			totalAvgVotes() {
				var partiesWithMembers = this.parties.filter(party =>
					party.numberOfReps > 0);
				return Math.round(partiesWithMembers.reduce((total, x) => {
					return total + x.avgVoteswParty;
				}, 0) / partiesWithMembers.length * 100) / 100;
			}
		}
	}

</script>

<style>
	.at-a-glance-table {
		text-align: center;
		margin: 25px 25px 25px 25px;
	}

</style>
