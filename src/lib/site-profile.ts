export const siteProfile = {
	name: "0disoft",
	description: "Stories of indie hackers, investors, and creators around the world.",
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
		{ label: "Indiehackers", href: "/indiehackers" },
		{ label: "Investors", href: "/investors" },
		{ label: "Creators", href: "/creators" },
	],
	links: [
		{
			label: "Sponsor",
			href: "https://github.com/sponsors/0disoft",
		},
	],
} as const;
