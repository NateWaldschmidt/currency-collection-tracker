<script context="module" lang="ts">
    export interface TableHeaderCell {
        label?: string,
        alignment?: 'left'|'center'|'right',
    }
    export interface TableDataCell {
        /** The key for the data to be shown in this cell. */
        dataKey?: string,
        alignment?: 'left'|'center'|'right',
    }
    export interface TableFooterCell {
        alignment?: 'left'|'center'|'right',
    }
    /** Exists for use with the Generic. */
    export type RowData = any;
    export interface TableColumn {
        headerCell?: TableHeaderCell,
        dataCell?: TableDataCell,
        footerCell?: TableFooterCell,
        /** Settings this option will override the option chosen for the data, header, and footer cells. */
        alignment?: 'left'|'center'|'right',
        visible?: boolean,
        /** Whether to order this column, if false this column does not have order functionality. */
        order?: {
            /** The direction to order this column. */
            direction?: 'asc'|'desc',
            /** If multiple columns, this determines which is first. */
            order?: number,
        } | false,
        /** How to render this data in the cell. */
        render?: (cellData: any, rowData: RowData) => string,
    }
</script>

<script lang="ts">
    import Cell from '$lib/components/table/cell.svelte';
    import MaxContainer from '$lib/layouts/max-container.svelte';
    import stringKeyValue from '$lib/utilities/object-string-key';

    /** A generic type for this table. */
    type Generic = $$Generic<RowData>;

    /** The data to be rendered into the table. */
    export let data: Generic[] = [];

    /** The columns to be rendered into the table. */
    export let columns: TableColumn[] = [];

    /** Get the data for a cell from the data. */
    function getCellData(dataRow: Generic, cell?: TableDataCell): any {
        /** If the cell for the column doesn't exist, just render nothing. */
        if (!cell || !cell.dataKey) return '';
        
        // The data for this cell.
        return stringKeyValue(dataRow, cell.dataKey);
    }

    function order(columnIndex: number): void {
        // Non-sortable.
        const columnOrder = columns[columnIndex].order
        if (columnOrder === false) return;

        /** The direction of this column currently. */
        let direction = columnOrder?.direction;

        // Default direction.
        if (!direction || direction === 'desc') {
            direction = 'asc';
        } else if (direction === 'asc') {
            direction = 'desc';
        }

        // Set all the columns order to undefined.
        columns.forEach((column) => column.order = undefined);

        // Sorts the data.
        data = data.sort((a, b) => {
            const cellAData = getCellData(a, columns[columnIndex].dataCell)
            const cellBData = getCellData(b, columns[columnIndex].dataCell)

            // Determines order based on the values.
            if (cellAData < cellBData) {
                return direction === 'asc' ? -1 : 1;
            } else if ( cellAData > cellBData) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        // Set the direction.
        columns[columnIndex].order = {
            direction: direction,
        }
    }
</script>

<MaxContainer>
    <table style="--num-cols: {columns.length};">
        <thead>
            <tr>
                <!-- Render each of the column header cells. -->
                {#each columns as column, columnIndex}
                    <Cell
                    tag="th"
                    alignment={column.alignment || column.headerCell?.alignment}
                    {columnIndex}
                    direction={column.order !== false ? column.order?.direction : false}
                    on:click={() => order(columnIndex)}>
                        { column.headerCell?.label || '' }
                    </Cell>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data as rowData}
                <tr>
                    {#each columns as column, columnIndex}
                        {@const cellData = getCellData(rowData, column.dataCell)}
                        {@const alignment = column.alignment || column.dataCell?.alignment}
                        <slot name="cell" {column} {cellData} {columnIndex} {alignment}>
                            <Cell {columnIndex} {alignment}>
                                { column.render ? column.render(cellData, rowData) : cellData }
                            </Cell>
                        </slot>
                    {/each}
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <slot name="footer">
                <tr></tr>
            </slot>
        </tfoot>
    </table>
</MaxContainer>

<style lang="scss">
    table {
        width: 100%;
        margin: 0 auto;

        tr {
            display: grid;
            grid-template-columns: repeat(var(--num-cols), 1fr);

            border-radius: var(--border-radius);
        }
        thead > tr, tfoot > tr {
            position: sticky;
            background-color: var(--color-primary);
        }
        tr:nth-child(even) {
            background-color: var(--color-primary-bg);
        }
    }
</style>