import * as m from "$lib/paraglide/messages";
import type { DisplayLocale } from "$lib/site-labels";
import type { WorkStatus } from "$lib/work-core";

export function getWorkStatusLabel(status: WorkStatus, locale: DisplayLocale): string {
	switch (status) {
		case "live":
			return m.work_status_live({}, { locale });
		case "building":
			return m.work_status_building({}, { locale });
		case "experimental":
			return m.work_status_experimental({}, { locale });
		case "archived":
			return m.work_status_archived({}, { locale });
	}
}
