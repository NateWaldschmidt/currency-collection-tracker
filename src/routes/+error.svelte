<script lang="ts">
    import { page } from '$app/stores';
    import { heading } from '$lib/stores/page-heading-store';

    heading.set($page.status.toString())
</script>

<p>{ $page.error?.message }</p>

<style lang="scss">
    p {
        text-align: center;
    }
</style>