<script lang="ts">
    /** The link to where this anchor should take the user. */
    export let href: string | undefined = undefined;
    /** The type of button to display. This does nothing if the href is specified. */
    export let type: 'button' | 'submit' = 'button';
    /** A prop that is used on buttons that don't have an href for disabling */
    export let disabled: boolean | undefined = undefined;

    /** These are conditionally loaded depending on the input type. */
    const conditionalProps: {[key: string]: any} = {};

    // Button only props.
    if (!href) {
        if (disabled) conditionalProps.disabled = disabled;
        if (type !== undefined) conditionalProps.type = type;
    }
</script>

{#if href}
    <a {href} {...conditionalProps}><slot /></a>
{:else}
    <button {type} {...conditionalProps} on:click><slot /></button>
{/if}

<style lang="scss" scoped>
    a, button {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0.25rem 0.75rem;

        border: 1px solid var(--color-neutral);
        border-radius: var(--border-radius);

        color: var(--color-neutral);
        background-color: var(--color-neutral-light);

        font-family: var(--font-primary);
        font-size: 0.875rem;
        text-decoration: none;

        &:not(:disabled) {
            cursor: pointer;

            &:hover {
                background-color: var(--color-neutral);

                color: white;
            }
        }
    }
</style>