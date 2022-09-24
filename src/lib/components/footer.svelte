<script lang="ts">
    import Link from '$lib/components/inputs/link.svelte';
</script>

<footer>
    <Link href="/" weight={'bold'}>Currency Collection Tracker</Link>
    <address>
        <span>
            <Link href="https://www.linkedin.com/in/nathaniel-waldschmidt/">Nathaniel Waldschmidt</Link>
        </span>
        <span>
            <Link href="mailto:nathaniel.waldsch@gmail.com">Nathaniel.Waldsch@gmail.com</Link>
        </span>
        <span>
            Geneva, IL, United States
        </span>
    </address>
</footer>

<style lang="scss">
    footer {
        padding: 2rem 1rem;
        // Adds border radius to top left and top right corners.
        border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;

        background-color: var(--color-primary);
        box-shadow: 0px 0px 50px -28px var(--color-primary);

        text-align: center;

        & > address {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            margin-top: 1rem;

            font-style: normal;
        }
    }
</style>