<template>
	<nav class="navbar navbar-expand-sm">
		<ul class="navbar-nav navigation">
			<li class="nav-item"><router-link to="/" class="nav-link" exact>Home</router-link></li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Congress 113</a>
				<ul class="dropdown-menu">
					<li><router-link to="senate-data" class="dropdown-item">Senate</router-link></li>
					<li><router-link to="house-data" class="dropdown-item">House</router-link></li>
				</ul>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Attendance</a>
				<ul class="dropdown-menu">
					<li><router-link to="senate-attendance" class="dropdown-item">Senate</router-link></li>
					<li><router-link to="house-attendance" class="dropdown-item">House</router-link></li>
				</ul>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Party Loyalty</a>
				<ul class="dropdown-menu">
					<li><router-link to="senate-loyalty" class="dropdown-item">Senate</router-link></li>
					<li><router-link to="house-loyalty" class="dropdown-item">House</router-link></li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script>
//	export default {
//		data() {
//			return {}
//		}
//
//	}
</script>

<style>
.navigation {
	background-color: #e2e1a7;
	width: 100%;
	padding-left: 50px;
}
.navbar {
	padding: 0;
}
.navigation li a {
	color: black;
}

.navigation li a:hover {
	color: black;
	background-color: #88b0b040;
}
</style>
