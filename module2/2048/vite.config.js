import { defineConfig } from "vite";
import StimulusHMR from 'vite-plugin-stimulus-hmr'

export default {
	plugins: [
		StimulusHMR(),
	],
	server: {
		port: 3000,
	}
};