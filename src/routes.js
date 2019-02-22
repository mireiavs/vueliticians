import Home from "./components/Home.vue"
import Senatetext from "./components/Senatetext.vue"
import Housetext from "./components/Housetext.vue"
import Memberlist from "./components/Memberlist.vue"
import Attendance from "./views/Attendance.vue"
import Loyalty from "./views/Loyalty.vue"


export const routes = [
	{
		path: "/",
		component: Home
	},
	{
		path: "/senate-data",
		components: {
			default: Senatetext,
			memberList: Memberlist
		}
	},
	{
		path: "/house-data",
		components: {
			default: Housetext,
			memberList: Memberlist
		}
	},
	{
		path: "/senate-attendance",
		component: Attendance
	},
	{
		path: "/house-attendance",
		component: Attendance
	},
	{
		path: "/senate-loyalty",
		component: Loyalty
	},
	{
		path: "/house-loyalty",
		component: Loyalty
	}
]
