/// <reference types="@sveltejs/kit" />
import { type TokenPayload}  from '$lib/utilities/auth';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			user?: TokenPayload | null,
		}
		// interface Platform {}
		// interface Session {}
		// interface Stuff {}
	}
}
