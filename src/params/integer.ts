import type { ParamMatcher } from "@sveltejs/kit";

/** Matches routes that are integers. */
export const match: ParamMatcher = function(param) {
    return /^\d+$/.test(param);
}