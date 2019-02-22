<template>
	<div>
		<Loader v-if="members.length == 0"></Loader>
		<div class="container-fluid main-text" v-else>
			<div class="filters">
				<div class="party-filter">
					<p>Filter by Party: </p>
					<label><input type="checkbox" name="party" value="D" v-model="selectedParties"> Democrat </label>
					<label><input type="checkbox" name="party" value="R" v-model="selectedParties"> Republican </label>
					<label><input type="checkbox" name="party" value="I" v-model="selectedParties"> Independent </label>
				</div>
				<div class="state-filter">
					<p>Filter by State:</p>
					<select id="state-filter" v-model="selectedState">
						<option value="">All states</option>
						<option v-for="state in orderedStates" :value=state> {{ state }} </option>
					</select>
				</div>
			</div>
			<table class="table text-center table-striped" v-if="filteredMembers.length !== 0">
				<thead>
					<tr>
						<th>Name</th>
						<th>Party Affiliation</th>
						<th>State</th>
						<th>Years in Office</th>
						<th>% of Votes with Party</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="member in filteredMembers">
						<td><a :href="member.url" target="_blank">{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a></td>
						<td>{{ member.party }}</td>
						<td>{{ member.state }}</td>
						<td>{{ member.seniority }}</td>
						<td>{{ member.votes_with_party_pct }}%</td>
					</tr>
				</tbody>
			</table>
			<p class="no-members" v-else>
				Sorry, there are no members that meet these criteria.</p>
		</div>
	</div>
</template>

<script>
	import Loader from "./Loader.vue"
	import {mapState} from 'vuex'
	import {mapActions} from 'vuex'

	export default {
		created() {
			if (this.$route.path.includes("senate")) {
				this.getDataSenate();
			} else if (this.$route.path.includes("house")) {
				this.getDataHouse();
			}
		},
		beforeUpdate() {
			if (this.$route.path.includes("senate")) {
				this.getDataSenate();
			} else if (this.$route.path.includes("house")) {
				this.getDataHouse();
			}
		},
		data() {
			return {
				selectedParties: [],
				selectedState: ""
			}
		},
		components: {
			Loader
		},
		computed: {
			orderedStates() {
				var states = [];
				this.members.forEach(member => {
					if (!states.includes(member.state)) {
						states.push(member.state);
					}
				});
				return states.sort();
			},
			filteredMembers() {
				return this.members.filter(member => {
					var filterParty = this.selectedParties.includes(member.party) || this.selectedParties.length == 0;
					var filterState = this.selectedState == member.state || this.selectedState === "";
					return filterParty && filterState;
				});
			},
			members() {
				if (this.$route.path.includes("senate")) {
					return this.membersSenate;
				} else if (this.$route.path.includes("house")) {
					return this.membersHouse;
				}
			},
			...mapState([
				"membersSenate", "membersHouse"
			])
		},
		methods: {
			...mapActions([
				"getDataSenate", "getDataHouse"
			])
			//			getData() {
			//							if (this.$route.path.includes("senate")) {
			//								var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
			//							} else if (this.$route.path.includes("house")) {
			//								var url = "https://api.propublica.org/congress/v1/113/house/members.json";
			//							}
			//				fetch(url, {
			//						headers: {
			//							"X-API-Key": "jmVgidrA236zStXzcxshkOG8NskSEWXqCjw2TOlN"
			//						}
			//					})
			//					.then(dataFromPP => dataFromPP.json())
			//					.then(ppObject => {
			//						this.members = ppObject.results[0].members;
			//					})
			//					.catch(error => console.log(error))
			//			}
		}
	}

</script>

<style scoped>
	.party-filter {
		display: flex;
	}

	.filters p {
		margin-right: 25px;
	}

	.party-filter label {
		margin-right: 15px;
	}

	.party-filter input {
		margin-right: 5px;
	}

	.filters {
		display: flex;
		justify-content: space-between;
	}

	.state-filter {
		display: flex;
		align-items: center;
	}

	.state-filter select {
		margin-bottom: 16px;
	}

	.no-members {
		text-align: center;
		font-weight: bold;
	}

	.member-list tr td:first-child {
		width: 270px;
	}

	.table {
		margin-bottom: 50px;
	}

</style>
