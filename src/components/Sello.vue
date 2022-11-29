<template>
	<template v-if="!load">
		<form @:submit.prevent="newfiles">
			<input type="file" accept=".pdf" name="filePdf" required /><br />
			<input type="file" placeholder="registre el sello" required /><br />
			<button type="submit">Sellar</button>
		</form>
	</template>
	<template v-else>
		<h1>cargando</h1>
	</template>
	
</template>

<script>
	import watermark from "@/helpers/appSellar";
	var FileSaver = require("file-saver");
	export default {
		data() {
			return {
				load: false,
			};
		},
		methods: {
			async newfiles(event) {
				// console.log('event', event.ta)
				if (event.target) {
					this.load = true;
					const file = event.target[0].files;
					const sello = event.target[1].files[0];

					this.loadPDF(file, sello);
				}
			},
			async loadPDF(files, sello) {
				console.log('loadPDF')
				const { status, file, fileName } = await watermark(files, sello);
				if (status) {
					this.load = false;
					const blob = new Blob([file], { type: "application/pdf" });
					FileSaver.saveAs(blob, fileName);
				} else {
					this.load = false;
				}
			},
		},
	};
</script>
