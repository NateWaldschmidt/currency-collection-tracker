import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity()
export default class Material {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'label', type: 'varchar', unique: true })
    label!: string;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}