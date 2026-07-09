import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
			strategy: ["url", "cookie", "globalVariable", "baseLocale"],
		}),
	],
	server: {
		watch: {
			ignored: ["**/build/**", "**/.playwright-cli/**"],
		},
	},
	build: {
		rolldownOptions: {
			checks: {
				pluginTimings: false,
			},
		},
	},
});
