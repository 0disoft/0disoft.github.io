export const DEFAULT_BLOG_SHARE_PLATFORMS = [
	"telegram",
	"line",
	"whatsapp",
	"x",
	"reddit",
] as const;

export type BlogSharePlatform = (typeof DEFAULT_BLOG_SHARE_PLATFORMS)[number];

export type BlogSharePayload = {
	title: string;
	text?: string;
	url: string;
};

export type BlogShareLink = {
	href: string;
	platform: BlogSharePlatform;
};

type BlogShareOptions = {
	platforms?: readonly BlogSharePlatform[];
};

export function buildBlogShareLinks(
	payload: BlogSharePayload,
	options: BlogShareOptions = {},
): BlogShareLink[] {
	const url = normalizeRequiredShareUrl(payload.url);
	const platforms = options.platforms?.length ? options.platforms : DEFAULT_BLOG_SHARE_PLATFORMS;

	return platforms.map((platform) => ({
		platform,
		href: buildBlogShareHref(platform, { ...payload, url }),
	}));
}

export function buildBlogShareHref(platform: BlogSharePlatform, payload: BlogSharePayload): string {
	const url = normalizeRequiredShareUrl(payload.url);
	const title = normalizeShareText(payload.title);

	switch (platform) {
		case "telegram":
			return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
		case "line":
			return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
		case "whatsapp":
			return `https://wa.me/?text=${encodeURIComponent([title, url].filter(Boolean).join(" "))}`;
		case "x":
			return `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
		case "reddit":
			return `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
		default: {
			const exhaustiveCheck: never = platform;
			return exhaustiveCheck;
		}
	}
}

function normalizeShareText(value: string): string {
	return value.trim();
}

function normalizeRequiredShareUrl(value: string): string {
	const url = value.trim();

	if (!url) {
		throw new Error("Blog share URL is required");
	}

	return url;
}
