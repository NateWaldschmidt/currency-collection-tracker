<script lang="ts">
    import { page } from '$app/stores';
    import { notifications } from '$lib/stores/notification-store';
    import Button from '$lib/components/inputs/button.svelte';
    import Link from '$lib/components/inputs/link.svelte';

    /** The signed in user. */
    const user = $page.data.user;

    /**
     * Handles the sign out of a user.
     */
    const signOut = async function() {
        // Sends the request to sign out.
        const signOutResponse = await fetch('/api/sign-out', { method: 'PUT' });

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
        <div id="brand-container">
            <Link href="/" weight={'bold'}>Currency Collection Tracker</Link>
        </div>
        <div id="center-navigation">
            <Link href="/coins">Coins</Link>
            <Link href="/collections">Collections</Link>
        </div>
        <div id="account-info">
            {#if !user}
                <Link href="/sign-in">Sign In</Link>
                <Button href="/sign-up">Create Account</Button>
            {:else}
                <img src="" alt={`${user.displayName}'s Profile Photo`}>
                <p>{ user.displayName }</p>
                <Button on:click={signOut}>Sign Out</Button>
            {/if}
        </div>
    </nav>
</header>

<style lang="scss">
    header {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;

        padding: 0.75rem;
        box-sizing: border-box;
        border-radius: 0 0 var(--border-radius-xl) var(--border-radius-xl);

        background-color: var(--color-primary);
        box-shadow: 0px 0px 50px -28px var(--color-primary);

        z-index: 1;
    }

    nav {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        justify-content: space-between;

        max-width: var(--wrap-width);
        margin: 0 auto;

        @media only screen and (max-width: 600px) {
            grid-template-columns: 1fr;
            gap: 0.5rem;
            align-items: center;
        }
    }

    #brand-container {
        @media only screen and (max-width: 600px) {
            text-align: center;
            margin-top: 1rem;
        }
    }

    #account-info {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        max-width: 12rem;
        margin-left: auto;

        @media only screen and (max-width: 600px) {
            margin: 0 auto;
        }
    }

    #center-navigation {
        display: flex;
        gap: 1.5rem;
        justify-content: center;

        @media only screen and (max-width: 600px) {
            margin: 1rem 0;
        }
    }
</style>