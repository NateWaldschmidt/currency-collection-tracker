<script lang="ts">
    import { session } from '$app/stores';
    import Button from '$lib/components/inputs/button.svelte';
</script>

<header>
    <nav>
        <a class="title-site" href="/">Currency Collection Tracker</a>
        <div id="center-navigation">
            <a href="/coins">Coins</a>
            <a href="/collections">Collections</a>
        </div>
        <div id="account-info">
            {#if !$session.user}
                <Button href="/sign-in">Sign In</Button>
                <Button href="/sign-up">Create Account</Button>
            {:else}
                <img src="" alt={`${$session.user.displayName}'s Profile Photo`}>
                <p>{ $session.user.displayName }</p>
            {/if}
        </div>
    </nav>
</header>

<style lang="scss" scoped>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        max-width: var(--wrap-width);
        margin: 0 auto;
    }

    #account-info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    #center-navigation {
        display: flex;
        gap: 1.5rem;
    }
</style>