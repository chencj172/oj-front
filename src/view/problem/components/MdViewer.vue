<template>
	<Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
	import { Viewer } from "@bytemd/vue-next";
	import gfm from "@bytemd/plugin-gfm";
    import math from '@bytemd/plugin-math-ssr';
	import highlight from "@bytemd/plugin-highlight";
	import "bytemd/dist/index.css";
	import "highlight.js/styles/default.css";
	import "github-markdown-css/github-markdown-light.css";
	// import "github-markdown-css/github-markdown-dark.css";

	const plugins = [
		gfm(), 
        math(), 
		highlight()
	];

	interface Props {
		value : string;
	}

	const props = withDefaults(defineProps<Props>(), {
		value: () => {
			return "";
		},
	});
</script>
