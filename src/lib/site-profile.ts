export const siteProfile = {
	name: "0disoft",
	description: "Launch notes, failed experiments, and the tools I actually use.",
	origin: "https://0disoft.github.io",
	sourceRepository: "https://github.com/0disoft/0disoft.github.io",
	author: {
		name: "0disoft",
		url: "https://github.com/0disoft",
		sameAs: ["https://github.com/0disoft"],
	},
	publisher: {
		name: "0disoft",
		url: "https://0disoft.github.io",
	},
	navigation: [
		{ label: "Blog", href: "/blog" },
		{ label: "Projects", href: "/projects" },
		{ label: "About", href: "/about" },
		{ label: "Uses", href: "/uses" },
	],
	links: [
		{
			label: "Sponsor",
			href: "https://github.com/sponsors/0disoft",
		},
	],
} as const;
