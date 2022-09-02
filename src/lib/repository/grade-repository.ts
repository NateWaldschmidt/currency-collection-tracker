import type mysql from 'mysql2';
import Grade      from "$lib/models/grade";
import Repository from "./repository";

export default class GradeRepository extends Repository<Grade> {
    /** @inheritdoc */
    public static readonly TABLE_NAME = 'cct_grades';

    /**
     * Finds all the grades that exist within the system.
     */
    public async findAll(): Promise<Grade[]> {
        const query = "SELECT * FROM cct_grades";
        const [records] = <mysql.RowDataPacket[]> await this.conn.query(query);
        return this.recordsToObject(records);
    }

    /** @inheritdoc */
    public recordToObject(record: mysql.RowDataPacket): Grade | undefined {
        // Did not find anything.
        if (!record) return undefined;

        return new Grade({
            id:          Number.parseInt(record.id),
            grade:       record.grade,
            description: record.description || null,
        });
    }
}