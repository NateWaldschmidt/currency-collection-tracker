<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    
    /** @type {import('./__types/[slug]').Load} */
    export const load: Load = async function({ params, fetch, session, stuff }) {
        // Checks that the user is an admin.
        // TODO Change this to use a const.
        // if (session.user?.permissionLevel !== 'admin') return { status: 403 }

        const mints = await fetch('/api/mints');
        const strikes = await fetch('/api/coin-strikes');
        const coinGroups = await fetch('/api/coins/groups');
        const coinCompositions = await fetch('/api/coins/compositions');

        return {
            props: {
                mints: (await mints.json()).data,
                strikes: (await strikes.json()).data,
                coinGroups: (await coinGroups.json())?.data,
                coinCompositions: (await coinCompositions.json())?.data,
            }
        };
    }
</script>

<script lang="ts">
    import BaseLayout from '$lib/layouts/base.svelte';
    import Input from '$lib/components/inputs/input.svelte';
    import Button from '$lib/components/inputs/button.svelte';
    import type UsMint from '$lib/models/us-mint';
    import type CoinStrike from '$lib/models/coin-strike';
    import type CoinGroup from '$lib/models/coin-group';
    import type CoinComposition from '$lib/models/coin-compositions';

    /** The U.S. Mints. */
    export let mints: UsMint[];
    /** The different coin strikes. */
    export let strikes: CoinStrike[];
    /** The Groups of Coins. */
    export let coinGroups: CoinGroup[];
    /** The Compositions for Coins. */
    export let coinCompositions: CoinComposition[];

    /**
     * Sends requests to create coins.
     * 
     * @param e
     */
    async function createCoin(e: SubmitEvent) {
        /** Used for sending the request for coin creation. */
        const xhr = new XMLHttpRequest();
        /** Gets the form data from the form. */
        const formData = new FormData(<HTMLFormElement> e.target);

        xhr.addEventListener('load', () => {
            if (xhr.status == 201) {
                console.log('Success');
            } else {
                console.log(xhr.responseText);
            }
        });

        xhr.open('POST', '/api/coins');
        xhr.send(formData);
    }
</script>

<BaseLayout heading={"Add Coins"}>
    <form on:submit|preventDefault={createCoin}>
        <!-- The year the coin was marked. -->
        <Input
        label={'Year'}
        type ={'number'}
        id   ={'year'}
        name ={'year'}
        min  ={0}
        max  ={new Date().getFullYear()+1}
        />

        <!-- The Mint that produced the coin. -->
        <Input
        label={'Mint'}
        type ={'dropdown'}
        id   ={'mint-id'}
        name ={'mint-id'}
        value={mints[0].id}
        >
            {#each mints as mint}
                <option value={mint.id}>
                    { `(${mint.mark}) ${mint.city}` }
                </option>
            {/each}
        </Input>

        <!-- The coin's mint mark. -->
        <Input
        label={'Mint Marked'}
        type ={'checkbox'}
        id   ={'mint-marked'}
        name ={'mint-marked'}
        />

        <!-- The group the coin belongs to. -->
        <Input
        label={'Group'}
        type ={'dropdown'}
        id   ={'group-id'}
        name ={'group-id'}
        value={coinGroups[0].id}
        >
            {#each coinGroups as group}
                <option value={group.id}>
                    { `($${group.denomination?.toFixed(2)}) ${group.title}` }
                </option>
            {/each}
        </Input>

        <!-- An additional title for the coin. -->
        <Input
        label={'Additional Title'}
        type ={'text'}
        id   ={'additional-title'}
        name ={'additional-title'}
        />

        <!-- The strike for the coin. -->
        <Input
        label={'Strike'}
        type ={'dropdown'}
        id   ={'strike-id'}
        name ={'strike-id'}
        value={mints[0].id}
        >
            {#each strikes as strike}
                <option value={strike.id}>
                    { strike.title }
                </option>
            {/each}
        </Input>

        <!-- The number of these coins that were made. -->
        <Input
        label={'Mintage'}
        type ={'number'}
        id   ={'mintage'}
        name ={'mintage'}
        min  ={0}
        />

        <!-- The diameter of this coin. -->
        <Input
        label={'Diameter'}
        type ={'number'}
        id   ={'diameter'}
        name ={'diameter'}
        min  ={0}
        step ={0.01}
        />

        <!-- The composition of this coin. -->
        <Input
        label={'Composition'}
        type ={'dropdown'}
        id   ={'composition-id'}
        name ={'composition-id'}
        value={coinCompositions[0].id}
        >
            {#each coinCompositions as comp}
                <option value={comp.id}>{ comp.title }</option>
            {/each}
        </Input>

        <Button type={'submit'}>Create Coin</Button>
    </form>
</BaseLayout>

<style lang="scss">
    form {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;

        max-width: 540px;
        margin: 0 auto;
    }
</style>