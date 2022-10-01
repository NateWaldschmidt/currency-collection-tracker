<script lang="ts">
    /** The component type for this Cell. */
    export let tag: 'td'|'th' = 'td';
    /** How the cell should be aligned. */
    export let alignment: 'left'|'center'|'right' = 'left';
    /** The index for the column for this cell. */
    export let columnIndex: number;
    /** The direction for headers currently being sorted. */
    export let direction: false|'asc'|'desc'|undefined = undefined;
</script>

<svelte:element
this={tag}
class="table-cell align-{ alignment }"
data-col-index="{columnIndex}">
    {#if tag === 'th'}
        <button
        on:click>
            <slot />
            {#if direction !== false}
                <span class="direction-icon { direction }">{ direction || 'None' }</span>
            {/if}
        </button>
    {:else}
        <slot />
    {/if}
</svelte:element>

<style lang="scss">
    .table-cell {
        padding: 0.25rem 0.5rem;

        button {
            cursor: pointer;

            width: 100%;
            border: none;
            
            background-color: transparent;

            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
        }
    }
    .align-left {
        &, & > button {
            text-align: left;
        }
    }
    .align-center {
        &, & > button {
            text-align: center;
        }
    }
    .align-right {
        &, & > button {
            text-align: right;
        }
    }
</style>