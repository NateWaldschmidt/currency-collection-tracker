/// <reference types="@sveltejs/kit" />
import { type TokenPayload}  from '$lib/server/utilities/auth';
import mysql from 'mysql2/promise';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			user?:      TokenPayload,
			connection: mysql.Connection,
		}
		interface Session {
			user?: TokenPayload,
		}
	}
}
