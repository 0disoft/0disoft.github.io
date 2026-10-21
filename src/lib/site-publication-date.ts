const publicationCalendar = new Intl.DateTimeFormat("en-US", {
	timeZone: "Asia/Seoul",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
});

export function getPublicationCalendarDate(now: Date): string {
	const parts = publicationCalendar.formatToParts(now);
	const value = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)!.value;
	return `${value("year").padStart(4, "0")}-${value("month")}-${value("day")}`;
}

export function getPublicationStartDate(date: string): Date {
	return new Date(`${date}T00:00:00+09:00`);
}
