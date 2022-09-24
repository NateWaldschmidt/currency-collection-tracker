<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Notifications from "$lib/components/notifications/notifications.svelte";
    import { heading } from '$lib/stores/page-heading-store';
</script>

<svelte:head>
    <title>{ $heading } | Currency Collection Tracker</title>
</svelte:head>

<!-- Contains the navbar and sign in/ up buttons. -->
<Header />

<!-- A place for all the notifications to be displayed. -->
<Notifications />

<main>
    <div id="heading-container">
        <h1>{ $heading }</h1>
    </div>
    <slot></slot>
</main>

<style lang="scss">
    #heading-container {
        display: flex;
        flex-direction: column;

        margin: 0 auto;
        max-width: var(--wrap-width);
    }


    h1 {
        margin-bottom: 0.25rem;

        text-align: center;
    }
</style>