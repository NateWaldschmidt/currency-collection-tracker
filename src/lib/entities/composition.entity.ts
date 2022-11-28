import Material from "$lib/entities/material.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from "typeorm"

@Entity()
export default class Composition {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'label', type: 'varchar', unique: true })
    label!: string;

    @Column({
        name: 'weight',
        type: 'int', 
        transformer: {
            to (value: number) {
                return value * 100;
            },
            from (value: number) {
                return value / 100;
            },
        },
    })
    weight!: number;

    @Column({ name: 'description', type: 'varchar' })
    description?: string;

    // TODO Add the compositions.
    // @ManyToMany(() => Material)
    // @JoinTable()
    // composition!: Material[];

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}