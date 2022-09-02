import type mysql     from 'mysql2';
import GradingCompany from "$lib/models/grading-company";
import Repository     from "./repository";

/** The repository for interacting with Grading Company database records. */
export default class GradingCompanyRepository extends Repository<GradingCompany> {
    /** The table name for Grading Companies. */
    public static readonly TABLE_NAME = 'cct_grading_companies';

    /**
     * Queries for a particular Grading Company using it's unique ID.
     * 
     * @param id The grading company's ID.
     */
    public async findById(id: number): Promise<GradingCompany | void> {
        // The grading company found.
        const [rows] = (<mysql.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${GradingCompanyRepository.TABLE_NAME} WHERE id = ? LIMIT 1;`,
            [id]
        ));
        return this.recordToObject(rows[0]);
    }

    /**
     * Queries for all the Grading Companies within the database.
     */
    public async findAll(): Promise<GradingCompany[]> {
        // The grading company found.
        const [rows] = (<mysql.RowDataPacket[]> await this.conn.query(
            `SELECT * FROM ${GradingCompanyRepository.TABLE_NAME};`
        ));
        return this.recordsToObject(rows);
    }

    /**
     * @inheritDoc
     */
    public recordToObject(record: mysql.RowDataPacket): GradingCompany | undefined {
        // Did not find anything.
        if (!record) return undefined;

        return new GradingCompany({
            id:         Number.parseInt(record.id),
            name:       record.name,
            dateOpened: record.date_opened ? new Date(record.date_opened) : null,
            dateClosed: record.date_closed ? new Date(record.date_closed) : null,
        });
    }
}