import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'display_name', type: 'varchar', unique: true })
    displayName!: string;

    @Column({ name: 'email', type: 'varchar', unique: true, nullable: true })
    email?: string;

    @Column({ name: 'phone_number', type: 'int', nullable: true })
    phoneNumber?: number;

    @Column({ name: 'password', type: 'varchar' })
    password!: string;

    @Column({ name: 'first_name', type: 'varchar' })
    firstName!: string;

    @Column({ name: 'last_name', type: 'varchar', nullable: true })
    lastName?: string;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}