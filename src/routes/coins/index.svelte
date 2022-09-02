<script context="module">
    /** @type {import('./__types/[slug]').Load} */
    export async function load({ params, fetch, session, stuff }) {
        const coinGroups = await fetch('/api/coins/groups');

        return {
            props: {
                coinGroups: (await coinGroups.json())?.data,
            }
        };
    }
</script>

<script lang="ts">
    import DefaultLayout from '$lib/layouts/default.svelte';
    import type CoinGroup from '$lib/models/coin-group';

    /** The Groups of Coins. */
    export let coinGroups: CoinGroup[];
</script>

<DefaultLayout heading={"Coins"}>
    <section>
        {#each coinGroups as coinGroup}
            <article>
                <img src="#" alt="{coinGroup.title} Obverse" class="obverse-img" />
                <img src="#" alt="{coinGroup.title} Reverse" class="reverse-img" />
                <a href="/coins/groups/{ coinGroup.id?.toString() }">{ coinGroup.title }</a>
            </article>
        {/each}
    </section>
</DefaultLayout>

<style lang="scss">
    section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 2rem;

        max-width: var(--wrap-width);
        margin: 0 auto;
    }
    article {
        display: grid;
        grid-template-columns: 1fr 1fr;

        width: 20rem;

        & > a {
            margin-top: 0.5rem;
        }
    }
</style>