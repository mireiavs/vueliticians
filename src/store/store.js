import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		membersSenate: [],
		membersHouse: []
	},
	mutations: {
		fetch_members_senate(state, membersSenate) {
			state.membersSenate = membersSenate
		},
		fetch_members_house(state, membersHouse) {
			state.membersHouse = membersHouse
		}		
	},
	actions: {
		getDataSenate({	commit }) {
			var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
			fetch(url, {
					headers: {
						"X-API-Key": "jmVgidrA236zStXzcxshkOG8NskSEWXqCjw2TOlN"
					}
				})
				.then(dataFromPP => dataFromPP.json())
				.then(ppObject => {
					commit("fetch_members_senate", ppObject.results[0].members)
				})
				.catch(error => console.log(error))
		},
		getDataHouse({ commit }) {
			var url = "https://api.propublica.org/congress/v1/113/house/members.json";
			fetch(url, {
					headers: {
						"X-API-Key": "jmVgidrA236zStXzcxshkOG8NskSEWXqCjw2TOlN"
					}
				})
				.then(dataFromPP => dataFromPP.json())
				.then(ppObject => {
					commit("fetch_members_house", ppObject.results[0].members)
				})
				.catch(error => console.log(error))
		}
	}
})
