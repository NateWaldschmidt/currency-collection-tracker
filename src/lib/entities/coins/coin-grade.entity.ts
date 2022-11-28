import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CoinGrade {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'label', type: 'varchar', unique: true })
    label!: string;
}