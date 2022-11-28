import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity()
export default class CoinGroup {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url_key', type: 'varchar', unique: true })
    urlKey!: string;

    @Column({ name: 'label', type: 'varchar', unique: true })
    label!: string;

    @Column({ name: 'obverse_image_filename', type: 'varchar', nullable: true })
    obverseImageFilename?: string;

    @Column({ name: 'reverse_image_filename', type: 'varchar', nullable: true })
    reverseImageFilename?: string;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}