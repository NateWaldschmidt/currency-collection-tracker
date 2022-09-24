<script lang="ts">
    import { page } from '$app/stores';

    /** The URL of where we are heading. */
    export let href: string;
    /** The size for the text of the link. Undefined will be regular. */
    export let size: 'sm'|'xs'|'lg'|undefined = undefined;
    /** The weight for the link's text. */
    export let weight: 'light'|'reg'|'bold'|'black' = 'reg';
</script>

<a {href} class="font-{ size } font-weight-{ weight } { $page.url.pathname == href ? 'active' : '' }">
    <slot></slot>
</a>

<style lang="scss">
    :root {
        font-size: var(--font-size);
    }
    // The different font size classes.
    $sizeClasses: 'xs', 'sm', 'lg';
    // Loops the sizes to create each of the necessary classes.
    @each $size in $sizeClasses {
        .font-#{$size} {
            font-size: var(--font-size-#{$size});
        }
    }
    $weightClassSuffixes: 'light', 'reg', 'bold', 'black';
    @each $weight in $weightClassSuffixes {
        .font-weight-#{$weight} {
            font-weight: var(--font-weight-#{$weight});
        }
    }

    a {
        position: relative;

        color: var(--color-neutral-font);
        padding: 0.125rem;
        text-decoration: none;

        &:hover, &.active {
            text-decoration: underline;
        }
    }
</style>