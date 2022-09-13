<script lang="ts">
    import { fade } from 'svelte/transition';
    import { notifications, type Notification } from "$lib/stores/notification-store";

    /** The properties for the notification. */
    export let notification: Notification;

    /** Removes this notification from the notifications store. */
    const removeSelf = () => notifications.remove(notification.id);
</script>

<div id={notification.id} class="notification {`notification-${notification.type}`}" transition:fade>
    {#if notification.title}
        <span class="notification-title">{ notification.title }</span>
    {/if}
    <p class="notification-message">{ notification.message }</p>
    <button class="notification-dismiss" on:click={removeSelf}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
</div>

<style lang="scss">
    :root {
        --background-color: var(--color-neutral-light);
        --font-color: var(--color-neutral-dark);
    }
    .notification-success {
        --background-color: var(--color-success-bg);
        --font-color: var(--color-success-accent);
    }
    .notification-danger {
        --background-color: var(--color-danger-bg);
        --font-color: var(--color-danger-accent);
    }

    // The styles for the notification container.
    .notification {
        position: sticky;

        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        margin-bottom: 0.5rem;
        padding: 0.5rem;

        color: var(--border-color);

        background-color: var(--background-color);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--background-color) 0 0.5rem 1rem -0.25rem;
    }
    .notification-title {
        font-weight: bold;
    }
    .notification-message {
        margin: 0;
    }
    .notification-dismiss {
        cursor: pointer;

        // Centers the SVG icon within the button.
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        top: 50%;
        right: 0.25rem;
        transform: translate(0, -50%);

        margin: 0;
        padding: 0.25rem;

        background-color: transparent;
        border: none;
    }
</style>