<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';

    /** @type {import('./__types/[slug]').Load} */
    export const load: Load = async function({ fetch }) {
        const coinGroupsResponse = await fetch('/api/coins/groups');
        const coinGroups = await coinGroupsResponse.json();

        return {
            props: {
                coinGroups: coinGroups.data.map((group: CoinGroupJson) => new CoinGroup(group))
            }
        };
    }
</script>

<script lang="ts">
    // JS/ TS Files
    import CoinGroup, { type CoinGroupJson } from '$lib/models/coin-group';
    // Components
    import BaseLayout from '$lib/layouts/base.svelte';
    import Link from '$lib/components/inputs/link.svelte';
    import Card from '$lib/components/card.svelte';

    /** The Groups of Coins. */
    export let coinGroups: CoinGroup[];
</script>

<BaseLayout heading={"Coins"}>
    <section class="coin-groups">
        {#each coinGroups as coinGroup}
            <Card tag="article">
                <Link href={`/coins/groups/${coinGroup.id?.toString()}`}>
                    { coinGroup.title }
                </Link>

                <div class="coin-images">
                    <img src="{coinGroup.getObverseImagePath()}" alt="{coinGroup.title} Obverse" />
                    <img src="{coinGroup.getReverseImagePath()}" alt="{coinGroup.title} Reverse" />
                </div>
            </Card>
        {/each}
    </section>
</BaseLayout>

<style lang="scss">
    .coin-groups {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 2rem;

        max-width: var(--wrap-width);
        margin: 0 auto;
    }

    .coin-images {
        display: flex;
        gap: 0.5rem;

        margin-top: 0.5rem;
        padding: 0.5rem;
        border-radius: var(--border-radius);

        background-color: white;

        img {
            aspect-ratio: 1/1;
            width: 10rem;
            max-width: 10rem;
        }
    }
</style>