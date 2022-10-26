<script lang="ts">
    import type Coin from '$lib/models/coin';
    import type CoinGroup from '$lib/models/coin-group';
    import Table, {type TableColumn} from '$lib/components/table/table.svelte'
    import { heading } from '$lib/stores/page-heading-store';
    import type { PageData } from './$types';

    /** Data loaded into the page. */
    export let data: PageData;

    /** The Groups of Coins. */
    const coinGroup: CoinGroup = data.coinGroup;
    /** The coins apart of this group. */
    const coins: Coin[] = data.coins;

    heading.set(coinGroup.title)

    /** The columns to be rendered in the table.*/
    let tableColumns: TableColumn[] = [{
            headerCell: { label: 'Strike' },
            dataCell: { dataKey: 'strike.title' },
        }, {
            headerCell: { label: 'Year' },
            dataCell: { dataKey: 'year' },
            render: (_: any, coin: Coin) => coin.getFullTitle(),
        }, {
            headerCell: { label: 'Mintage' },
            dataCell: { dataKey: 'mintage' },
            alignment: 'right',
            render: (_: any, coin: Coin) => coin.getMintageString(),
        }, {
            headerCell: { label: 'Diameter' },
            dataCell: { dataKey: 'diameter' },
            alignment: 'right',
            render: (_: any, coin: Coin) => coin.getDiameterString(),
        }, {
            headerCell: { label: 'Weight' },
            dataCell: { dataKey: 'composition.weight' },
            alignment: 'right',
            render: (_: any, coin: Coin) => '0', //TODO Implement
        },
    ];
</script>

<!-- The table for the coins. -->
<Table data={coins} columns={tableColumns} />