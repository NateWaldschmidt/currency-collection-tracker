<script lang="ts">
    import stringKeyValue from '$lib/utilities/object-string-key';
    import Input from '$lib/components/inputs/input.svelte';
    import Button from '$lib/components/inputs/button.svelte';

    /** A generic type for this table. */
    type Generic = $$Generic;

    /** A function for rendering the data in the table. */
    interface renderFunction {
        (cellValue: string|number, rowData: Generic): string;
    }
    interface renderFootFunction {
        (data: Generic[]): string;
    }
    /** The structure of what to pass into columns. */
    interface column {
        /** The key or index within the data for this column. */
        dataKey: string,
        /** The heading to be displayed at the top of the table. */
        title: string|number,
        /** Whether this column should be sortable. */
        sortable: boolean,
        /** The alignment for the heading in this column. */
        headingAlignment?: 'left'|'right'|'center',
        /** The alignment for the data cells in this column. */
        dataAlignment?:  'left'|'right'|'center',
        /** The alignment for the foot cells in this column. */
        footAlignment?:  'left'|'right'|'center',
        /** If there is something special to render for the data. */
        render?: renderFunction,
        /** Allows using a custom render function for the data in the foot of the table. */
        renderFoot?: renderFootFunction,
    }

    /** All of the column data. */
    export let columns: column[];
    /** The data that is going to be used within the table. */
    export let data: Generic[];
    /** The page currently being displayed. */
    export let page = 0;
    /** The sizes for pages. */
    export let pageSizes: number[];
    /** The index of the page size to be used. */
    export let pageSizeIndex = 1;
    /** The current size of a page. */
    $: pageSize = pageSizes[pageSizeIndex];
    /** The maximum page. */
    $: maxPage = Math.floor(data.length / pageSize);
    
    /**
     * Handles the sorting of columns based on clicking of the tables headers.
     * 
     * @param this The <th> element that detected the click.
     */
    function sortColumn(this: HTMLTableCellElement): void {
        /** The index of the column being sorted. */
        const columnIndex = Number.parseInt(this.getAttribute('data-col-index') || '0');
        /** The direction to sort the column. */
        const direction = this.getAttribute('data-dir');

        // Sets the attribute for the direction of the column.
        this.setAttribute('data-dir', direction === 'asc' ? 'desc' : 'asc');

        // Sorts the data.
        data = data.sort((a, b) => {
            // Does formatting for easier sorting.
            [a, b] = [a, b].map((val) => {
                let value = stringKeyValue(val, columns[columnIndex].dataKey);
                if (typeof val === 'string') value = value.toLowerCase(); 
                if (!value) value = 0;
                return value;
            });

            // Determines order based on the values.
            if (a < b) {
                return direction === 'asc' ? 1 : -1;
            } else if ( a > b) {
                return direction === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    function nextPage(): void {
        page = page+1 >= maxPage ? maxPage : page+1;
    }

    function prevPage(): void {
        page = page-1 <= 0 ? 0 : page-1;
    }
</script>

<div class="table-top-controls">
    <Input
    label={'Page Size'}
    id={'page-size'}
    name={'page-size'}
    type={'dropdown'}
    bind:value={pageSizeIndex}
    >
        {#each pageSizes as size, index}
            <option value="{ index }">{ size }</option>
        {/each}
    </Input>
</div>
<table>
    <thead>
        <!-- Loops to add the headers for each of the columns. -->
        {#each columns as col, index}
            <th
            on:click={sortColumn}
            on:keypress={sortColumn}
            class="{`ta-${col.headingAlignment || 'left'}`}"
            data-col-index={index}
            data-dir=""
            tabindex="0"
            >
                { col.title }
            </th>
        {/each}
    </thead>
    <tbody>
        <!-- Loops all the data as individual rows in the table. -->
        {#each data as _, index}
            {#if index >= page * pageSize && index < page * pageSize + pageSize}
                <tr>
                    <!-- Loops all the columns. -->
                    {#each columns as col}
                        <!-- The value for this cell. -->
                        {@const cellValue = stringKeyValue(data[index], col.dataKey)}
                        <td class={`ta-${col.dataAlignment || 'left'}`}>
                            <!-- Renders the value or if a custom render function is supplied. -->
                            {#if col.render !== undefined}
                                {@html col.render(cellValue, data[index])}
                            {:else}
                                { cellValue }
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/if}
        {/each}
    </tbody>
    <tfoot>
        {#each columns as col}
            <td class={`ta-${col.footAlignment || 'left'}`}>
                {#if col.renderFoot !== undefined}
                    {@html col.renderFoot(data) }
                {/if}
            </td>
        {/each}
    </tfoot>
</table>
<div class="table-bottom-controls">
    <div class="page-controls">
        <Button on:click={prevPage}>Previous</Button>
        <p class="page-number">{ page + 1 }</p>
        <Button on:click={nextPage}>Next</Button>
    </div>
</div>

<style lang="scss">
    .table-top-controls, .table-bottom-controls {
        max-width: var(--wrap-width);
        margin: 0 auto;
    }

    .page-controls {
        display: grid;
        grid-template-columns: 2fr 0.5fr 2fr;
        gap: 0.25rem;
        align-items: center;

        max-width: 15rem;
    }
    .page-number {
        margin: 0;
        text-align: center;
    }

    table {
        width: 100%;
        max-width: var(--wrap-width);
        margin: 0 auto;

        thead, tfoot, :global(tr) {
            display: grid;
            grid-template-columns: repeat(6, 1fr);

            border-radius: 3px;

            :global(td.span-all) {
                grid-column: 1 / -1;
            }
        }
        thead, tfoot {
            background-color: var(--color-primary);
        }
        tr:nth-child(even) {
            background-color: var(--color-primary-light);
        }

        th {
            cursor: pointer;
            user-select: none;
        }
        th, td {
            padding: 0.25rem 0.5rem;
        }

        .ta-left {
            text-align: left;
        }
        .ta-right {
            text-align: right;
        }
        .ta-center {
            text-align: center;
        }
    }
</style>