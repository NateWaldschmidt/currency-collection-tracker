import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity()
export default class Mint {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url_key', type: 'varchar', unique: true })
    urlKey!: string;

    @Column({ name: 'mark', type: 'varchar', nullable: true })
    mark?: string;

    @Column({ name: 'city', type: 'varchar' })
    city!: string;

    @Column({ name: 'state', type: 'varchar' })
    state!: string;

    @Column({ name: 'date_opened', type: 'date', nullable: true })
    dateOpened?: Date;

    @Column({ name: 'date_closed', type: 'date', nullable: true })
    dateClosed?: Date;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}