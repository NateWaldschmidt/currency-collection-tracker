import UserCoin from "$lib/entities/coins/user-coin.entity";
import User from "$lib/entities/user.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm"

@Entity()
export default class Collection {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'label', type: 'varchar' })
    label!: string;

    @Column({ name: 'description', type: 'varchar', length: 1000, nullable: true })
    description?: string;

    @ManyToOne(() => User, (user) => user.collectionSets)
    user!: User;

    @OneToMany(() => UserCoin, (coin) => coin.collection)
    coins?: UserCoin[];

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;
}