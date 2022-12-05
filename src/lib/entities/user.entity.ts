import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import {
    Length,
    Matches,
    IsDate,
    IsEmail,
    IsInt,
    IsPhoneNumber,
    IsOptional,
} from "class-validator";
import { UniqueIn } from "$lib/server/utilities/validation/unique";

@Entity()
export default class User {
    @IsInt()
    @IsOptional()
    @PrimaryGeneratedColumn()
    id!: number;

    @Length(4, 20, { message: 'Must be between $constraint1 and $constraint2 characters.' })
    @Matches(
        /^[a-zA-Z]+[a-zA-Z0-9\-]*$/,
        { message: 'Must start with a letter and can only contain letters, numbers, and hyphens.' }
    )
    @UniqueIn(User)
    @Column({ name: 'display_name', type: 'varchar', unique: true })
    displayName!: string;

    @IsEmail(undefined, { message: 'Must be a valid email address.' })
    @IsOptional()
    @UniqueIn(User)
    @Column({ name: 'email', type: 'varchar', unique: true, nullable: true })
    email?: string;

    @IsPhoneNumber(undefined, { message: 'Must be a valid phone number.' })
    @IsOptional()
    @Column({ name: 'phone_number', type: 'int', nullable: true })
    phoneNumber?: number;

    @Column({ name: 'password', type: 'varchar' })
    password!: string;

    @IsOptional()
    @Length(1, 255, { message: 'Must be between $constraint1 and $constraint2 characters.' })
    @Column({ name: 'first_name', type: 'varchar', nullable: true })
    firstName?: string;

    @IsOptional()
    @Length(1, 255, { message: 'Must be between $constraint1 and $constraint2 characters.' })
    @Column({ name: 'last_name', type: 'varchar', nullable: true })
    lastName?: string;

    @IsDate()
    @IsOptional()
    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @IsDate()
    @IsOptional()
    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}