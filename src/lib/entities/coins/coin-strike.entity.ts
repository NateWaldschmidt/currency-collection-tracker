import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity()
export default class CoinStrike {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'label', type: 'varchar', unique: true })
    label!: string;

    @Column({ name: 'abbreviation', type: 'varchar', nullable: true })
    abbreviation?: string;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}