export async function copyTextToClipboard(text: string) {
	if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			return;
		} catch {
			// Some embedded browsers expose the API but deny write permission.
		}
	}

	if (typeof document === "undefined") {
		throw new Error("Clipboard is not available");
	}

	const textarea = document.createElement("textarea");
	const activeElement = document.activeElement as HTMLElement | null;
	const selection = document.getSelection();
	const ranges = selection
		? Array.from({ length: selection.rangeCount }, (_, index) =>
				selection.getRangeAt(index).cloneRange(),
			)
		: [];
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	try {
		(activeElement?.closest("dialog[open]") ?? document.body).append(textarea);
		textarea.select();
		if (!document.execCommand("copy")) {
			throw new Error("Clipboard copy failed");
		}
	} finally {
		textarea.remove();
		if (activeElement?.isConnected) activeElement.focus({ preventScroll: true });
		selection?.removeAllRanges();
		for (const range of ranges) selection?.addRange(range);
	}
}
