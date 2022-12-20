<script lang="ts">
    import { heading } from '$lib/stores/page-heading-store';
    import type { PageData } from './$types';

    heading.set('Collection')

    export let data: PageData;
</script>

<section>
    <h2>Coins being Hunted</h2>
    <ul>
        {#each data.coins as coin}
            {#if coin.hunting}
                <li>
                    { `${coin.coin.getFullTitle()}` }
                    <span><!-- TODO Add an icon to show if this coin is owned. --></span>
                    <span><!-- TODO Add an icon to show if this coin exists at all for the user. --></span>
                    <dl>
                        <dt>Mintage</dt>
                        <dd>{ coin.coin.getHumanMintage() }</dd>

                        <dt>Grade</dt>
                        <dd>{ coin.grade ? coin.grade.label : 'Un-Graded' }</dd>

                        <dt>Set</dt>
                        <dd>{ coin.collection ? coin.collection.label : 'Unassigned' }</dd>
                    </dl>
                </li>
            {/if}
        {/each}
    </ul>
</section>

<section>
    <h2>My Coins</h2>
    <ul>
        {#each data.coins as coin}
            {#if coin.owned}
                <li>
                    { `${coin.coin.getFullTitle()}` }
                    <span><!-- TODO Add an icon to show if this coin is owned. --></span>
                    <span><!-- TODO Add an icon to show if this coin exists at all for the user. --></span>
                    <dl>
                        <dt>Mintage</dt>
                        <dd>{ coin.coin.getHumanMintage() }</dd>

                        <dt>Grade</dt>
                        <dd>{ coin.grade ? coin.grade.label : 'Un-Graded' }</dd>

                        <dt>Set</dt>
                        <dd>{ coin.collection ? coin.collection.label : 'Unassigned' }</dd>
                    </dl>
                </li>
            {/if}
        {/each}
    </ul>
</section>

<style lang="scss">
</style>