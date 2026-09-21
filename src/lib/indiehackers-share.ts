export type IndiehackersSharePlatform = "x" | "facebook" | "linkedin" | "telegram";

export type IndiehackersSharePayload = {
	title: string;
	url: string;
};

export type IndiehackersShareLink = {
	href: string;
	platform: IndiehackersSharePlatform;
};

const PLATFORMS: readonly IndiehackersSharePlatform[] = ["x", "facebook", "linkedin", "telegram"];

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
		case "x":
			return `https://x.com/intent/tweet?text=${title}&url=${url}`;
		case "facebook":
			return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
		case "linkedin":
			return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
		case "telegram":
			return `https://t.me/share/url?url=${url}&text=${title}`;
	}
}
