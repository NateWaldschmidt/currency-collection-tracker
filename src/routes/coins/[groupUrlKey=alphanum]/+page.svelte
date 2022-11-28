<script lang="ts">
    import Table, { type TableColumn } from '$lib/components/table/table.svelte'
    import { heading } from '$lib/stores/page-heading-store';
    import type { PageData } from './$types';

    /** Data loaded into the page. */
    export let data: PageData;

    /** The Groups of Coins. */
    const coinGroup = data.coinGroup;
    /** The coins apart of this group. */
    const coins = data.coins;

    heading.set(coinGroup.label)

    /** The columns to be rendered in the table.*/
    let tableColumns: TableColumn[] = [{
            headerCell: { label: 'Strike' },
            dataCell: { dataKey: 'strike.label' },
        }, {
            headerCell: { label: 'Year' },
            dataCell: { dataKey: 'year' },
            // render: (_: any, coin) => coin.getFullTitle(),
        }, {
            headerCell: { label: 'Mintage' },
            dataCell: { dataKey: 'mintage' },
            alignment: 'right',
            // render: (_: any, coin) => coin.getMintageString(),
        }, {
            headerCell: { label: 'Diameter' },
            dataCell: { dataKey: 'diameter' },
            alignment: 'right',
            // render: (_: any, coin) => coin.getDiameterString(),
        }, {
            headerCell: { label: 'Weight' },
            dataCell: { dataKey: 'composition.weight' },
            alignment: 'right',
            // render: (_: any, coin) => '0', // TODO Implement
        },
    ];
</script>

<!-- The table for the coins. -->
<Table data={coins} columns={tableColumns} />