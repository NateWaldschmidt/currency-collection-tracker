import CollectionSet from "$lib/entities/collection-set.entity";
import CoinGrade from "$lib/entities/coins/coin-grade.entity";
import Coin from "$lib/entities/coins/coin.entity";
import GradingCompany from "$lib/entities/coins/grading-company.entity";
import User from "$lib/entities/user.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    UpdateDateColumn,
    ManyToOne,
    DeleteDateColumn,
} from "typeorm";

@Entity()
export default class UserCoin {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'owned', type: 'tinyint', default: 0 })
    owned!: boolean;

    @Column({ name: 'hunting', type: 'tinyint', default: 1 })
    hunting!: boolean;

    @ManyToOne(() => User, (user) => user.coins)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Coin)
    @JoinColumn({ name: 'coin_id' })
    coin!: Coin;

    @ManyToOne(() => CollectionSet, (collectionSet) => collectionSet.coins)
    @JoinColumn({ name: 'collection_id' })
    collectionSet?: CollectionSet;

    @ManyToOne(() => CoinGrade)
    @JoinColumn({ name: 'grade_id' })
    grade?: CoinGrade;

    @ManyToOne(() => GradingCompany)
    @JoinColumn({ name: 'grading_company_id' })
    gradingCompany?: GradingCompany;

    @Column({ name: 'note', type: 'varchar', length: 1000, nullable: true })
    note?: string;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;

    @DeleteDateColumn({ name: 'date_deleted', type: 'datetime' })
    dateDeleted?: Date;
}