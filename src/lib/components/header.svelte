<script lang="ts">
    import { session } from '$app/stores';
    import { notifications } from '$lib/stores/notification-store';
    import Button from '$lib/components/inputs/button.svelte';
    import Link from '$lib/components/inputs/link.svelte';

    /**
     * Handles the sign out of a user.
     */
    const signOut = async function() {
        // Sends the request to sign out.
        const signOutResponse = await fetch('/api/sign-out', {method: 'put'});

        if (signOutResponse.status == 200) {
            notifications.add({
                id: '1',
                message: 'Successfully signed out.',
                type: 'success',
            });
        } else {
            notifications.add({
                id: '1',
                message: 'There was a problem signing you out, please try again.',
                type: 'danger',
            });
        }
    }
</script>

<header>
    <nav>
        <Link href="/">Currency Collection Tracker</Link>
        <div id="center-navigation">
            <Link href="/coins">Coins</Link>
            <Link href="/collections">Collections</Link>
        </div>
        <div id="account-info">
            {#if !$session.user}
                <Button href="/sign-in">Sign In</Button>
                <Button href="/sign-up">Create Account</Button>
            {:else}
                <img src="" alt={`${$session.user.displayName}'s Profile Photo`}>
                <p>{ $session.user.displayName }</p>
                <Button on:click={signOut}>Sign Out</Button>
            {/if}
        </div>
    </nav>
</header>

<style lang="scss">
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