<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    
    /** @type {import('./__types/[slug]').Load} */
    export const load: Load = async function ({ params, fetch, session, stuff }) {
        const coin = await (await fetch(`/api/coins/${params.coinId}`)).json();

        return {
            props: {
                coin: new Coin(coin.data),
            }
        }
    }
</script>
<script lang="ts">
    import BaseLayout from '$lib/layouts/base.svelte';
    import MaxContainer from '$lib/layouts/max-container.svelte';
    import Coin from '$lib/models/coin';

    /** The coin that corresponds to the ID in the route. */
    export let coin: Coin;

    const crumbs = [
        {link: '/coins', title: 'Coins'},
        {link: `/coins/groups/${coin.groupId}}`, title: 'Group'},
    ];
</script>

<BaseLayout heading={ coin.getFullTitle() } crumbs={ crumbs }>
    <MaxContainer tag={"article"}>
        <!-- Coin Images -->
        <section id="coin-image-container">
            <!-- Obverse Image -->
            <img src="" alt={ `${coin.getFullTitle()} Obverse` } />
            <!-- Reverse Image -->
            <img src="" alt={ `${coin.getFullTitle()} Reverse` } />
        </section>

        <!-- Coin Information Card -->
        <section id="coin-information">
            <article>
                <h2>Mintage</h2>
                <p>{ coin.getMintageString() }</p>
            </article>
            <article>
                <h2>Diameter</h2>
                <p>{ coin.getDiameterString() }</p>
            </article>
            <article>
                <h2>Weight</h2>
                <p>{ coin.getWeightString() }</p>
            </article>
        </section>
    </MaxContainer>
</BaseLayout>

<style lang="scss">
    #coin-image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img {
            width: 100%;
            max-width: 20rem;
            height: 100%;
            max-height: 20rem;
        }
    }

    #coin-information {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        margin: 0.5rem 0;
        padding: 0.5rem;
        border-radius: var(--border-radius-lg);

        background-color: orange;

        article {
            text-align: center;

            h2, p {
                margin: 0;
            }
        }
    }
</style>