<template>
	<h1>Sello CCC</h1>
	<Sello />
</template>

<script>
	import Sello from "@/components/Sello.vue";
	export default {
		name: "App",
		components: {
			Sello,
		},
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
