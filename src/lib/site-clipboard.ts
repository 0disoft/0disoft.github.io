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
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	document.body.append(textarea);
	textarea.select();
	const copied = document.execCommand("copy");
	textarea.remove();

	if (!copied) {
		throw new Error("Clipboard copy failed");
	}
}
