<script lang="ts">
    import Coin from '$lib/models/coin';
    import type CoinGroup from '$lib/models/coin-group';
    import Table from '$lib/components/table.svelte'
    import { heading } from '$lib/stores/page-heading-store';
    import type { PageData } from './$types';
    import { session } from '$app/stores';

    /** Data loaded into the page. */
    export let data: PageData;

    /** The Groups of Coins. */
    const coinGroup: CoinGroup = data.coinGroup;
    /** The coins apart of this group. */
    const coins: Coin[] = data.coins;

    heading.set(coinGroup.title)

    /** A way to filter the different coins being displayed by their strike type. */
    let filterStrikeId = [1];
</script>

<!-- Strike Filters -->
<div class="toggle-controls">
    <div class="toggle-box">
        <input type="checkbox" id="filter-business" name="strike-filter" value={1} bind:group={filterStrikeId} />
        <label for="filter-business">Business</label>
    </div>
    <div class="toggle-box">
        <input type="checkbox" id="filter-proof" name="strike-filter" value={2} bind:group={filterStrikeId} />
        <label for="filter-proof">Proof</label>
    </div>
</div>

<Table
pageSizes={[5, 10, 25, 50, 100]}
columns={[{
        title: 'Strike',
        dataKey: 'strike.title',
        headingAlignment: 'left',
        dataAlignment: 'left',
        sortable: true,
    }, {
        title: 'Year',
        dataKey: 'year',
        headingAlignment: 'left',
        dataAlignment: 'left',
        sortable: true,
        render: (_, coin) => `<a href="/coins/${coin.id}">${coin.getFullTitle()}</a>`,
    }, {
        title: 'Mintage',
        dataKey: 'mintage',
        headingAlignment: 'right',
        dataAlignment: 'right',
        footAlignment: 'right',
        sortable: true,
        render: (_, coin) => coin.getMintageString(),
        renderFoot: (data) => Coin.getMintageString(data.reduce((prevMintage, currCoin) => prevMintage + (currCoin.mintage || 0), 0)),
    }, {
        title: 'Diameter',
        dataKey: 'diameter',
        headingAlignment: 'right',
        dataAlignment: 'right',
        sortable: true,
        render: (_, coin) => coin.getDiameterString(),
    }, {
        title: 'Weight',
        dataKey: 'composition.weight',
        headingAlignment: 'right',
        dataAlignment: 'right',
        sortable: true,
        render: (_, coin) => coin.getWeightString(),
    }, {
        title: 'Add',
        dataKey: 'id',
        headingAlignment: 'center',
        dataAlignment: 'center',
        sortable: false,
        render: (_, coin) => $session.user ? `<button><img src="/icons/plus-circle.svg" alt="Add Coin" width="16" height="16" /></button>` : '',
    }
]}
data={coins}
></Table>

<style lang="scss">
    .toggle-controls {
        display: flex;
        justify-content: center;
        gap: 0.75rem;

        margin: 0.5rem 0;
    }

    .toggle-box {
        & > [type=checkbox] {
            display: none;
            
            &:checked + label {
                &::after {
                    background-color: var(--color-primary);
                }
            }
        }
        label {
            position: relative;
            cursor: pointer;
            user-select: none;

            display: flex;
            justify-content: center;

            padding: 0 0.25rem;

            box-sizing: border-box;

            &::after {
                content: "";

                position: absolute;
                top: 100%;

                width: 100%;
                height: 0.15rem;
                border-radius: var(--border-radius-lg);
                background-color: var(--color-neutral);
            }
        }
    }
</style>