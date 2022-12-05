import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import * as bcrypt from 'bcrypt';
import 'dotenv/config'

/** What to include in the token's payload. */
export interface TokenPayload {
    /** The user's ID. */
    id: number,
    /** The expiration date/time. */
    exp: number,
    /** The user's unique email address. */
    email?: string,
    /** The user's unique display name. */
    displayName: string,
    /** The user's first name. */
    firstName?: string,
    /** The user's last name. */
    lastName?: string,
}

export default class Auth {
    /**
     * Generates a token to be used when authenticating a user.
     * 
     * @param payload The payload to include in the token.
     * @returns 
     */
    public static createToken(payload: TokenPayload): string {
        // Ensures the access token is set.
        if (!process.env['ACCESS_TOKEN_SECRET']) {
            throw new ReferenceError('Secret access token cannot be found.');
        }

        return jwt.sign(payload, process.env['ACCESS_TOKEN_SECRET'])
    }

    /**
     * Creates the cookie for the token.
     * 
     * @param token The token or the Token's payload.
     * @param expiration When this cookie should expire.
     * @returns The cookie.
     */
    public static createTokenCookie(token: string | TokenPayload, expiration: number): string {
        return cookie.serialize(
            'token',
            typeof token === 'string' ? token : this.createToken(token), // Handles if the token needs to be created.
            {
                httpOnly: true,
                path: '/',
                expires: new Date(expiration),
            }
        )
    }

    /**
     * Hashes the plain text user passwords.
     * 
     * @returns The hashed password.
     */
     public static async hashUserPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}