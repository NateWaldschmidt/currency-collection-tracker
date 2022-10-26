import type mysql2 from 'mysql2';
import Auth        from '$lib/server/utilities/auth';
import User        from "$lib/models/user"
import Repository  from "$lib/server/repository/repository";

export default class UserRepository extends Repository<User> {
    /** The user's table name. */
    readonly tableName: string = 'cct_users';

    /**
     * Creates a single User record within the database. This does not perform validation on the values.
     * 
     * @param user 
     */
    public async create(user: User): Promise<void> {
        /** The query that is to be run to insert into the database. */
        let query = ` INSERT INTO ${this.tableName} (
            first_name,
            last_name,
            password,
            display_name,
            email,
            mobile_phone
        ) VALUES (?, ?, ?, ?, ?, ?)`;

        // Sets the hashed password for this user.
        user.hashedPassword = user.password ? await Auth.hashUserPassword(user.password) : undefined;

        // Appends the values to the placeholders array.
        let placeholders: any[] = [
            user.firstName || null,
            user.lastName || null,
            user.hashedPassword,
            user.displayName || null,
            user.email || null,
            user.mobilePhoneNumber || null,
        ];

        query += ';';

        // Inserts into the User table the new User record.
        await this.conn.query(query, placeholders);
    }

    /**
     * Queries for the user with the passed in ID.
     * 
     * @param id 
     * @returns 
     */
    public async findById(id: number): Promise<User|void> {
        /** The query to be run to find the user's by ID. */
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?;`;
        /** All of the users found with this ID. Should be only one but this will be an array. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(query, [id]));
        /** Gets the one and only user. If there is no users found this will be undefined. */
        const userRecord = rows[0];

        // Handles when there is no user to be found.
        if (!userRecord) return;

        return UserRepository.userRecordToUser(userRecord);
    }

    /**
     * Queries for the user with their email.
     * 
     * @param email
     * @returns
     */
    public async findByEmail(email?: string): Promise<User|void> {
        // Catches when the email is not provided.
        if (!email) return; 

        /** The query for finding the user. */
        const query = `SELECT * FROM ${this.tableName} WHERE email = ?;`;
        /** The rows found from this query. */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(query, [email]));
        /** Gets the user record found with that email. */
        const userRecord = rows[0];

        // If there is no user found, nothing to be returned;
        if (!userRecord) return;

        // Converts the database rows to a User object.
        return UserRepository.userRecordToUser(userRecord);
    }

    /**
     * Finds a user using their unique display name.
     * 
     * @param displayName 
     * @returns 
     */
    public async findByDisplayName(displayName?: string): Promise<User|void> {
        // Catches missing display name.
        if (!displayName) return;

        /** The query for fidning the user by display name. */
        const query = `SELECT * FROM ${this.tableName} WHERE display_name = ?;`;
        /** The rows found from the query */
        const [rows] = (<mysql2.RowDataPacket[]> await this.conn.query(query, [displayName]));
        /** The single user record found with the query. */
        const userRecord = rows[0];

        // There were no users with that display name.
        if (!userRecord) return;

        // Converts the database record to a User object.
        return UserRepository.userRecordToUser(userRecord);
    }

    /**
     * Updates the user passed in using the ID property.
     * 
     * @param user 
     */
    public async update(user: User): Promise<void> {
        await this.conn.query(`
            UPDATE ${this.tableName}
                SET first_name   = ?,
                SET last_name    = ?,
                SET password     = ?,
                SET display_name = ?,
                SET email        = ?,
                SET mobile_phone = ?
            WHERE id = ?;
        `, [
            user.firstName || null,
            user.lastName || null,
            user.hashedPassword || null,
            user.displayName || null,
            user.email || null,
            user.mobilePhoneNumber || null,
            user.id || null,
        ]);
    }

    /**
     * Deletes the passed ID's record from the database.
     * 
     * @param id
     */
    public async delete(id: number): Promise<void> {
        await this.conn.query(`DELETE FROM ${this.tableName} WHERE id = ?;`, [id]);
    }

    /**
     * Takes the full user record and returns back the User object.
     * 
     * @param userRecord 
     * @returns 
     */
    private static userRecordToUser(userRecord: { [key: string]: string; }): User {
        /** The user that is going to be returned. */
        const user = new User();
        // Sets all of the fields for the user.
        user.id                = Number(userRecord.id);
        user.firstName         = userRecord.first_name;
        user.lastName          = userRecord.last_name;
        user.hashedPassword    = userRecord.password;
        user.displayName       = userRecord.display_name;
        user.email             = userRecord.email;
        user.mobilePhoneNumber = userRecord.mobile_phone;
        const dateCreatedParts = String(userRecord.date_created).split('-');
        user.dateCreated       = new Date(
            parseInt(dateCreatedParts[0]),
            parseInt(dateCreatedParts[1]) - 1,
            parseInt(String(dateCreatedParts[2]).substr(0,2))
        );
        const dateUpdatedParts = String(userRecord.date_updated).split('-');
        user.dateUpdated       = new Date(
            parseInt(dateUpdatedParts[0]),
            parseInt(dateUpdatedParts[1]) - 1,
            parseInt(String(dateUpdatedParts[2]).substr(0,2))
        );

        return user;
    }
}