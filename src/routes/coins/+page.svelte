<script lang="ts">
    import Link from '$lib/components/inputs/link.svelte';
    import { heading } from '$lib/stores/page-heading-store';
    import type { PageData } from './$types';

    heading.set('Coins');

    /** The data loaded into the page. */
    export let data: PageData;
</script>

<section class="coin-groups">
    {#each data.coinGroups as coinGroup}
        <Link href={`/coins/${coinGroup.urlKey}`}>
            { coinGroup.label }
        </Link>
    {/each}
</section>

<style lang="scss">
    .coin-groups {
        display: grid;
        grid-template-columns: repeat(auto-fit, min(15rem, 100%));
        grid-gap: 0.5rem;
        justify-content: center;

        & > :global(*) {
            padding: 0.5rem 0;
            border-radius: var(--border-radius-lg);
            text-align: center;
            background-color: var(--color-neutral-light);
        }
    }

    // .coin-images {
    //     display: flex;
    //     gap: 0.5rem;

    //     margin-top: 0.5rem;
    //     padding: 0.5rem;
    //     border-radius: var(--border-radius);

    //     background-color: white;

    //     img {
    //         aspect-ratio: 1/1;
    //         width: 10rem;
    //         max-width: 10rem;
    //     }
    // }
</style>