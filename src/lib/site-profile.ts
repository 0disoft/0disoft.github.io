export const siteProfile = {
	name: "0disoft",
	description: "Notes on software, open source, product work, and personal projects.",
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
		{ label: "Manifesto", href: "/manifesto" },
		{ label: "Works", href: "/works" },
		{ label: "Blog", href: "/blog" },
	],
	links: [
		{
			label: "Sponsor",
			href: "https://github.com/sponsors/0disoft",
		},
	],
} as const;
