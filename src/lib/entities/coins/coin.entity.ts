import Mint from "$lib/entities/coins/mint.entity";
import CoinGroup from "$lib/entities/coins/coin-group.entity";
import CoinStrike from "$lib/entities/coins/coin-strike.entity";
import CoinVariety from "$lib/entities/coins/coin-variety.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from "typeorm"

@Entity()
export default class Coin {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'url_key', type: 'varchar', unique: true })
    urlKey!: string;

    @ManyToOne(() => CoinStrike, (strike) => strike.id, { eager: true })
    strike!: CoinStrike;

    @ManyToOne(() => CoinGroup, (group) => group.id, { eager: true })
    @JoinColumn({ name: 'coin_group_id' })
    group!: CoinGroup;

    @Column({ name: 'year', type: 'int', nullable: true})
    year?: number;

    @ManyToOne(() => Mint, (mint) => mint.id, { nullable: true, eager: true })
    @JoinColumn({ name: 'mintmark_mint_id' })
    mintMark?: Mint;

    @Column({ name: 'additional_title', type: 'varchar', nullable: true})
    additionalTitle?: string;

    @ManyToMany(() => CoinVariety)
    @JoinTable()
    varieties?: CoinVariety[];

    @ManyToOne(() => Mint, (mint) => mint.id, { nullable: true, eager: true })
    mint?: Mint;

    @Column({
        name: 'denomination',
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
    denomination!: number;

    @Column({ name: 'mintage', type: 'int', nullable: true })
    mintage?: number;

    @Column({
        name: 'diameter',
        type: 'int',
        transformer: {
            to (value: number) {
                return value * 100;
            },
            from (value: number) {
                return value / 100;
            },
        },
        nullable: true,
    })
    diameter?: number;

    // TODO Composition.

    @Column({ name: 'obverse_image_filename', type: 'varchar', nullable: true })
    obverseImageFilename?: string;

    @Column({ name: 'reverse_image_filename', type: 'varchar', nullable: true })
    reverseImageFilename?: string;

    @CreateDateColumn({ name: 'date_created', type: 'datetime' })
    dateCreated!: Date;

    @UpdateDateColumn({ name: 'date_updated', type: 'datetime' })
    dateUpdated!: Date;

    /**
     * Combines the coin's year and mint mark if the coin has a mint mark.
     */
    getYearMintMark(): string {
        let yearMintMark = this.year?.toString();

        if (this.mintMark) {
            if (this.mintMark.mark) {
                yearMintMark += `-${this.mintMark.mark}`;
            }
        }

        return yearMintMark || '';
    }

    /**
     * Formatted as GroupLabel Year-MintMark AdditionalTitle.
     */
    getFullTitle(): string {
        return `${this.group.label} ${this.getYearMintMark()} ${this.additionalTitle || ''}`;
    }


    /**
     * Adds commas to the mintage.
     */
    getHumanMintage(): string {
        return this.mintage?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '';
    }
}