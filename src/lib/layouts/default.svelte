<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Notifications from "$lib/components/notifications/notifications.svelte";

    /** The heading for the page. */
    export let heading = 'Welcome.';
    /** The breadcrumbs to be displayed under the heading. */
    export let crumbs: {title: string, link: string}[] = [];
</script>

<svelte:head>
    <title>{ heading } | Currency Collection Tracker</title>
</svelte:head>

<Header />

<!-- A place for all the notifications to be displayed. -->
<Notifications />

<main>
    <div id="heading-container">
        <h1>{ heading }</h1>
        <div id="crumbs">
            {#each crumbs as {link, title}, i}
                {#if i !== 0}<p>></p>{/if}
                <a href="{ link }">{ title }</a>
            {/each}
        </div>
    </div>
    <slot />
</main>

<style lang="scss">
    #heading-container {
        display: flex;
        flex-direction: column;

        margin: 0 auto;
        max-width: var(--wrap-width);
    }

    #crumbs {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;

        p {
            margin: 0;
        }
    }

    h1 {
        margin-bottom: 0.25rem;

        text-align: center;
    }
</style>