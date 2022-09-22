<script lang="ts">
    import BaseLayout from '$lib/layouts/base.svelte';
    import MaxContainer from '$lib/layouts/max-container.svelte';
    import Button from '$lib/components/inputs/button.svelte';

    /**
     * Toggles the visibility of the tool tip element.
     * @param this
     */
    function toggleTooltip(this: HTMLImageElement) {
        // Finds the tooltip to show.
        const tooltipDom = (<HTMLSpanElement> this.previousElementSibling);

        // Found the element, toggle visibility.
        if (tooltipDom) tooltipDom.hidden = false;
    }

    function hide(this: HTMLSpanElement) {
        this.hidden = true
    }
</script>

<BaseLayout heading={"Your Collections"}>
    <MaxContainer tag={'section'}>
        <article class="collection-card">
            <h2 class="title">Lincoln Penny Collection</h2>
            <div class="tile-grid">
                <div class="tile">
                    <p class="title">Total Coins</p>
                    <p class="data">158</p>
                </div>
                <div class="tile">
                    <p class="title">Total Face</p>
                    <div class="tooltip-container">
                        <span class="tooltip" on:dblclick={hide} hidden>The total face value of all the coins in this collection.</span>
                        <img
                        src="/icons/dollar-sign.svg"
                        alt="Dollar Sign"
                        width="15"
                        height="15"
                        class="tile-icon"
                        tabindex="0"
                        on:focus={toggleTooltip}
                        on:blur={toggleTooltip}
                        />
                    </div>
                    <p class="data">$59.78</p>
                </div>
                <div class="tile">
                    <p class="title">Progress</p>
                    <p class="data">89.8%</p>
                </div>
                <div class="tile">
                    <p class="title">Melt Value</p>
                    <p class="data">$124.78</p>
                </div>
            </div>
            <Button href="/collection/id">View</Button>
        </article>
    </MaxContainer>
</BaseLayout>

<style lang="scss">
    .collection-card {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        max-width: 14.75rem;
        padding: 0.75rem;
        border-radius: var(--border-radius-lg);

        background-color: var(--color-neutral-light);
        box-shadow: 2px 2px 25px -18px rgba(133,133,133,1);

        & > h2 {
            margin: 0;
        }
    }
    .tile-grid {
        display: grid;
        grid-template-columns: 7rem 7rem;
        grid-template-rows: 5rem 5rem;
        gap: 0.75rem;
    }
    .tile {
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        border-radius: var(--border-radius-lg);
        background-color: white;
        box-shadow: 2px 2px 25px -18px rgba(51,51,51,1);

        & > .title {
            position: absolute;
            top: 0.25rem;
            left: 0.25rem;

            margin: 0;

            font-size: 0.875rem;
        }
        & > .data {
            font-size: 1.375rem;
            font-weight: var(--font-weight-bold);

            margin: 0 0 1.25rem 0;
        }

        & > .tooltip-container {
            position: absolute;
            top: 0.45rem;
            right: 0.45rem;

            & > .tile-icon {
                cursor: pointer;

                background-color: rgba(80, 164, 78, 0.5);

                padding: 0.25rem;
                border-radius: 100%;

                transition: background-color ease 200ms;

                &:focus, &:hover {
                    background-color: rgba(80, 164, 78, 0.8);
                }
            }

            & > .tooltip {
                position: absolute;
                bottom: 2.25rem;
                left: -3rem;
                right: -3rem;

                padding: 0.25rem;
                border-radius: var(--border-radius);

                text-align: center;
                font-size: var(--font-size-xs);

                background-color: white;
                box-shadow: 2px 2px 35px -18px rgb(0, 0, 0);
            }
        }
    }
</style>