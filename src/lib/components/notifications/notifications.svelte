<script lang="ts">
    import Notification from "./notification.svelte";
    import { notifications } from "$lib/stores/notification-store";
</script>

<div id="notifications-container">
    {#each $notifications as notification}
        <Notification {notification} />
    {/each}
</div>

<style lang="scss">
    #notifications-container {
        position: fixed; top: 1rem;
        top: 1rem;
        right: 1rem;

        width: 90%;
        max-width: 27.5rem;
    }
</style>