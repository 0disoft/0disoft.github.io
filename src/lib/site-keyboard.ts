export type KeyboardFocusDirection = 1 | -1;
export type KeyboardFocusBoundary = "first" | "last";

export type KeyboardFocusIntent =
	| { kind: "adjacent"; direction: KeyboardFocusDirection }
	| { kind: "boundary"; boundary: KeyboardFocusBoundary };

type KeyboardModifierPolicy = {
	shiftKey?: boolean;
};

type AdjacentFocusOptions = {
	missing?: "by-direction" | "first";
};

export function isModifiedKeyEvent(
	event: Pick<KeyboardEvent, "altKey" | "ctrlKey" | "metaKey" | "shiftKey">,
	policy: KeyboardModifierPolicy = {},
): boolean {
	return (
		event.altKey || event.ctrlKey || event.metaKey || (policy.shiftKey === true && event.shiftKey)
	);
}

export function isEditableKeyboardTarget(target: EventTarget | null): boolean {
	if (typeof HTMLElement === "undefined" || !(target instanceof HTMLElement)) {
		return false;
	}

	return (
		target.matches("input, textarea, select, [contenteditable='true']") || target.isContentEditable
	);
}

export function isWithinKeyboardTarget(target: EventTarget | null, selector: string): boolean {
	return (
		typeof HTMLElement !== "undefined" &&
		target instanceof HTMLElement &&
		Boolean(target.closest(selector))
	);
}

export function getKeyboardFocusIntent(key: string): KeyboardFocusIntent | null {
	switch (key.toLowerCase()) {
		case "arrowright":
		case "arrowdown":
			return { kind: "adjacent", direction: 1 };
		case "arrowleft":
		case "arrowup":
			return { kind: "adjacent", direction: -1 };
		case "home":
			return { kind: "boundary", boundary: "first" };
		case "end":
			return { kind: "boundary", boundary: "last" };
		default:
			return null;
	}
}

export function resolveAdjacentFocusIndex(
	targetCount: number,
	currentIndex: number,
	direction: KeyboardFocusDirection,
	options: AdjacentFocusOptions = {},
): number | null {
	if (targetCount <= 0) {
		return null;
	}

	if (currentIndex < 0) {
		return options.missing === "first" || direction === 1 ? 0 : targetCount - 1;
	}

	return (currentIndex + direction + targetCount) % targetCount;
}

export function resolveBoundaryFocusIndex(
	targetCount: number,
	boundary: KeyboardFocusBoundary,
): number | null {
	if (targetCount <= 0) {
		return null;
	}

	return boundary === "first" ? 0 : targetCount - 1;
}
