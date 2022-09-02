<script lang="ts">
    export let tag: 'div'|'section'|'article' = 'div';
</script>

<svelte:element id="wrap-container" this={tag}>
    <slot />
</svelte:element>

<style lang="scss">
    #wrap-container {
        margin: 0.5rem auto;
        max-width: var(--wrap-width);
    }
</style>