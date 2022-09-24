import type { ParamMatcher } from "@sveltejs/kit";

/** Matches routes that are alpha numeric with underscores. */
export const match: ParamMatcher = function(param) {
    return /^[a-zA-Z][a-zA-Z0-9\-]*$/.test(param);
}