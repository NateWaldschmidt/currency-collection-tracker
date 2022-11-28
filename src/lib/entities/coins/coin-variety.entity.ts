import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CoinVariety {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'label', type: 'varchar', unique: true })
    label!: string;

    @Column({ name: 'description', type: 'varchar', unique: true })
    description!: string;
}