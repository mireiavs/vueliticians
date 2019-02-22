<template>
	<div class="tables">
		<div class="least-most">
			<h2>Least Loyal (Bottom 10% of Party)</h2>
			<loader v-if="members.length === 0"></loader>
			<table v-else class="table text-center table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Number Party Votes</th>
						<th>% Party Votes</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="member in leastLoyal">
						<td><a :href="member.url" target="_blank">{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a></td>
						<td>{{ Math.round(member.total_votes*member.votes_with_party_pct/100) }}</td>
						<td>{{ member.votes_with_party_pct }}%</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="least-most">
			<h2>Most Loyal (Top 10% of Party)</h2>
			<loader v-if="members.length === 0"></loader>
			<table v-else class="table text-center table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Number Party Votes</th>
						<th>% Party Votes</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="member in mostLoyal">
						<td><a :href="member.url" target="_blank">{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a></td>
						<td>{{ Math.round(member.total_votes*member.votes_with_party_pct/100) }}</td>
						<td>{{ member.votes_with_party_pct }}%</td>
					</tr>
				</tbody>
			</table>
		</div>
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
				leastLoyal: [],
				mostLoyal: []
			}
		},
		components: {
			Loader
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
			getTenPercent(parameterToCheck, highOrLow) {
				var membersArr2 = this.members.slice(0);
				var finalMembersArr = [];
				var memberPercentage = 0;

				while (memberPercentage < 0.1) {
					var memberToInclude;
					if (highOrLow === "low") {
						var controlVotesPercentage = 100;
						var memberToInclude;
						membersArr2.forEach(member => {
							if (member[parameterToCheck] < controlVotesPercentage) {
								controlVotesPercentage = member[parameterToCheck];
								memberToInclude = member;
							}
						})
					} else if (highOrLow === "high") {
						var controlVotesPercentage = 0;
						var memberToInclude;
						membersArr2.forEach(member => {
							if (member[parameterToCheck] > controlVotesPercentage) {
								controlVotesPercentage = member[parameterToCheck];
								memberToInclude = member;
							}
						})
					}
					finalMembersArr.push(memberToInclude);
					membersArr2.splice(membersArr2.indexOf(memberToInclude), 1);

					var timesPctAppears = membersArr2.filter((member) => (member[parameterToCheck] === controlVotesPercentage)).length;

					if (timesPctAppears > 0) {
						membersArr2.forEach(member => {
							if (member[parameterToCheck] === controlVotesPercentage) {
								memberToInclude = member;
								finalMembersArr.push(memberToInclude);
								membersArr2.splice(membersArr2.indexOf(memberToInclude), 1);
							}
						})
					}
					memberPercentage = finalMembersArr.length / this.members.length;
				}
				return finalMembersArr;
			},
			getStatistics() {
				this.leastLoyal = this.getTenPercent("votes_with_party_pct", "low");
				this.mostLoyal = this.getTenPercent("votes_with_party_pct", "high");
			}
		}
	}

</script>

<style >
	.tables {
		display: flex;
		border-top: 1px solid grey;
		padding-top: 20px;
		padding-bottom: 50px;
	}

	.least-most {
		margin: 25px 25px 25px 25px;
		flex-grow: 1;
		text-align: center;
	}

</style>
