import type { BlogPostBodyBlock } from "$lib/blog-post-core";

export type BlogPostAdSlotKey = "blog-inline";

export type BlogPostAdPlacement = {
	beforeHeadingIndex: number;
	slotKey: BlogPostAdSlotKey;
};

export type BlogPostRenderItem =
	| {
			kind: "block";
			key: string;
			block: BlogPostBodyBlock;
			blockIndex: number;
	  }
	| {
			kind: "ad";
			key: string;
			placement: BlogPostAdPlacement;
	  };

export const blogPostAdPlacements = [
	{ beforeHeadingIndex: 3, slotKey: "blog-inline" },
	{ beforeHeadingIndex: 7, slotKey: "blog-inline" },
] as const satisfies readonly BlogPostAdPlacement[];

export function createBlogPostRenderItems(
	blocks: readonly BlogPostBodyBlock[],
	placements: readonly BlogPostAdPlacement[] = blogPostAdPlacements,
): BlogPostRenderItem[] {
	const placementByHeadingIndex = new Map(
		placements.map((placement) => [placement.beforeHeadingIndex, placement]),
	);
	const renderItems: BlogPostRenderItem[] = [];
	let headingIndex = 0;

	blocks.forEach((block, blockIndex) => {
		if (block.kind === "heading") {
			headingIndex += 1;

			const placement = placementByHeadingIndex.get(headingIndex);

			if (placement) {
				renderItems.push({
					kind: "ad",
					key: `${placement.slotKey}-before-heading-${headingIndex}`,
					placement,
				});
			}
		}

		renderItems.push({
			kind: "block",
			key: `${block.kind}-${blockIndex}`,
			block,
			blockIndex,
		});
	});

	return renderItems;
}
