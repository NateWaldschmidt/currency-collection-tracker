<script lang="ts">
    import MaxContainer from '$lib/layouts/max-container.svelte';
    import type Coin from '$lib/models/coin';
    import { heading } from '$lib/stores/page-heading-store';
    import type { PageData } from './$types';

    export let data: PageData;

    /** The coin that corresponds to the ID in the route. */
    const coin: Coin = data.coin;

    heading.set(coin.getFullTitle())
</script>

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