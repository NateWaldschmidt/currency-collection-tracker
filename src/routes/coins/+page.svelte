<script lang="ts">
    import Link from '$lib/components/inputs/link.svelte';
    import Card from '$lib/components/card.svelte';
    import { heading } from '$lib/stores/page-heading-store';
    import type { PageData } from './$types';

    heading.set('Coins')

    /** The data loaded into the page. */
    export let data: PageData;
</script>

<section class="coin-groups">
    {#each data.coinGroups as coinGroup}
        <Card tag="article">
            <Link href={`/coins/${coinGroup.urlKey}`}>
                { coinGroup.label }
            </Link>

            <!-- TODO Add images. -->
            <!-- <div class="coin-images">
                <img src="{coinGroup.getObverseImagePath()}" alt="{coinGroup.title} Obverse" />
                <img src="{coinGroup.getReverseImagePath()}" alt="{coinGroup.title} Reverse" />
            </div> -->
        </Card>
    {/each}
</section>

<style lang="scss">
    .coin-groups {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 2rem;

        max-width: var(--wrap-width);
        margin: 0 auto;
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