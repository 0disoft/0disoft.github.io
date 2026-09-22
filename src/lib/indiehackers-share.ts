export type IndiehackersSharePlatform =
	| "telegram"
	| "line"
	| "whatsapp"
	| "x"
	| "reddit"
	| "facebook"
	| "threads"
	| "bluesky"
	| "linkedin"
	| "weibo";

export type IndiehackersSharePayload = {
	title: string;
	url: string;
};

export type IndiehackersShareLink = {
	href: string;
	platform: IndiehackersSharePlatform;
};

const PLATFORMS: readonly IndiehackersSharePlatform[] = [
	"telegram",
	"line",
	"whatsapp",
	"x",
	"reddit",
	"facebook",
	"threads",
	"bluesky",
	"linkedin",
	"weibo",
];

export function buildIndiehackersShareLinks(payload: IndiehackersSharePayload): IndiehackersShareLink[] {
	const url = payload.url.trim();
	const title = payload.title.trim();

	if (!url) {
		throw new Error("Indiehackers share URL is required");
	}

	return PLATFORMS.map((platform) => ({
		platform,
		href: buildIndiehackersShareHref(platform, { title, url }),
	}));
}

function buildIndiehackersShareHref(
	platform: IndiehackersSharePlatform,
	payload: IndiehackersSharePayload,
): string {
	const url = encodeURIComponent(payload.url);
	const title = encodeURIComponent(payload.title);

	switch (platform) {
		case "telegram":
			return `https://t.me/share/url?url=${url}&text=${title}`;
		case "line":
			return `https://social-plugins.line.me/lineit/share?url=${url}&text=${title}`;
		case "whatsapp":
			return `https://wa.me/?text=${encodeURIComponent([payload.title, payload.url].filter(Boolean).join(" "))}`;
		case "x":
			return `https://x.com/intent/tweet?text=${title}&url=${url}`;
		case "reddit":
			return `https://www.reddit.com/submit?url=${url}&title=${title}`;
		case "facebook":
			return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
		case "threads":
			return `https://www.threads.net/intent/post?text=${title}&url=${url}`;
		case "bluesky":
			return `https://bsky.app/intent/compose?text=${encodeURIComponent([payload.title, payload.url].filter(Boolean).join(" "))}`;
		case "linkedin":
			return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
		case "weibo":
			return `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
	}
}
