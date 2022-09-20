<script lang="ts">
    /** The HTML tag for the card. */
    export let tag: string = "div";
</script>

<svelte:element this={tag} class="card">
    <slot></slot>
</svelte:element>

<style lang="scss">
    .card {
        max-width: 14rem;
        padding: 0.75rem;
        border-radius: var(--border-radius-lg);

        background-color: var(--color-neutral-light);
        box-shadow: 2px 2px 25px -18px rgba(133,133,133,1);
    }
</style>