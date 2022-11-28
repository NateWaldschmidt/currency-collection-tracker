import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity()
export default class GradingCompany {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url_key', type: 'varchar', unique: true })
    urlKey!: string;

    @Column({ name: 'name', type: 'varchar' })
    name!: string;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}