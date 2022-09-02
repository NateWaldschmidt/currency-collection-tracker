import Joi from 'joi';
import BaseModel from './base-model';

/** The Model for Users Within the System */
export default class User extends BaseModel<User> {
    /** The most basic permission level for a user. */
    public static readonly PERMISSION_LEVEL_BASIC = 'basic';
    /** A permission level for a user who has additional access. */
    public static readonly PERMISSION_LEVEL_PRO = 'pro';
    /** Permission for an admin user. */
    public static readonly PERMISSION_LEVEL_ADMIN = 'admin';
    /** All of the permission levels available to users. */
    public static readonly PERMISSION_LEVELS = [
        this.PERMISSION_LEVEL_BASIC,
        this.PERMISSION_LEVEL_PRO,
        this.PERMISSION_LEVEL_ADMIN,
    ];

    /** The identifier for the user. */
    public id?: number;
    /** The user's first name. */
    public firstName?: string;
    /** The user's last name. */
    public lastName?: string;
    /** A mobile phone number optionally provided by the user. */
    public mobilePhoneNumber?: string;
    /** The email address which can be used for signing in. */
    public email?: string;
    /** A public name that can be used to sign in for the user. */
    public displayName?: string;
    /** The password a user inputted, this will be undefined most of the time. */
    public password?: string;
    /** The hashed password for this user. */
    public hashedPassword?: string;
    /** What level of permission that the user has. */
    public permissionLevel?: string;
    /** The date that this user was created. */
    public dateCreated?: Date;
    /** The date that this user was last updated on. */
    public dateUpdated?: Date;

    /**
     * @inherit
     */
    public getSchema(): Joi.ObjectSchema<any> {
        return Joi.object({
            id:                Joi.number()
                                  .integer()
                                  .min(1)
                                  .required(),
            firstName:         Joi.string()
                                  .min(1)
                                  .max(255)
                                  .trim()
                                  .allow(null),
            lastName:          Joi.string()
                                  .min(1)
                                  .max(255)
                                  .trim()
                                  .allow(null),
            mobilePhoneNumber: Joi.number()
                                  .min(7)
                                  .max(15)
                                  .allow(null),
            email:             Joi.string()
                                  .email(),
            displayName:       Joi.string()
                                  .alphanum()
                                  .min(4)
                                  .max(24)
                                  .trim(),
            password:          Joi.string(),
            permissionLevel:   Joi.string(),
        });
    }

    /**
     * Simply validates if the permission level exists within the array of valid permission levels.
     * 
     * @param permissionLevel The permission level to be validated.
     * @returns True if the permission level is valid.
     */
    public static validatePermissionLevel(permissionLevel: string): boolean {
        // Checks if the passed permission level is valid or not.
        if (!User.PERMISSION_LEVELS.includes(permissionLevel)) {
            throw 'The permission level is invalid.';
        }

        return true;
    }
}