<script lang="ts">
    /** The URL of where we are heading. */
    export let href: string;
    /** The size for the text of the link. Undefined will be regular. */
    export let size: 'sm'|'xs'|'lg'|undefined = undefined;
    /** The weight for the link's text. */
    export let weight: 'light'|'reg'|'bold'|'black' = 'reg';
</script>

<a {href} class="font-{ size } font-weight-{ weight }">
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

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;

            width: 0;
            height: 0.1rem;
            border-radius: var(--border-radius-lg);

            background-color: var(--color-neutral-font);
            opacity: 0;

            transition:
                opacity ease 200ms,
                width ease 200ms;
        }

        &:hover::after,
        &:focus::after {
            opacity: 1;
            width: 100%;
        }
    }
</style>