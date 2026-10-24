import { fileURLToPath } from "node:url";
import saylo, { loadProjectConfig } from "@0disoft/saylo-vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		saylo(loadProjectConfig(fileURLToPath(new URL("./saylo.config.json", import.meta.url)))),
	],
	server: { watch: { ignored: ["**/build/**", "**/.playwright-cli/**"] } },
	build: { rolldownOptions: { checks: { pluginTimings: false } } },
});
