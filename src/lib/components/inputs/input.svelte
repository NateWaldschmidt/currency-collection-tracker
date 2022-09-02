<script lang="ts">
    import { slide } from 'svelte/transition';

    /** The input type for this input component. */
    export let type: 'text' | 'number' | 'password' | 'email' | 'tel' | 'dropdown' | 'checkbox';
    /** The label text to be set on the label. */
    export let label: string;
    /** The hint/ description for this input. */
    export let hint: string | undefined = undefined;
    /** The ID for the input element. */
    export let id: string;
    /** The name for the input element. */
    export let name: string;
    /** The value to set the element to. */
    export let value: string|number|undefined = undefined;
    /** Whether this input should be required or not. */
    export let required = false;

    // Number Related Props.
    /** The minimum value for this number input. */
    export let min: number|undefined = undefined;
    /** The maximum value for this number input. */
    export let max: number|undefined = undefined;
    /** The 'step' or increment for the number inputs. */
    export let step: number|undefined = undefined;
    
    /** These are conditionally loaded depending on the input type. */
    const conditionalProps: {[key: string]: any} = {};

    // Conditionally add props based on the input type.
    if (value !== undefined) conditionalProps.value = value; 
    if (type == 'number') {
        if (min  !== undefined) conditionalProps.min = min;
        if (max  !== undefined) conditionalProps.max = max;
        if (step !== undefined) conditionalProps.step = step;
    }

    /** Handles the showing and hiding of the hint text. */
    let showHint = false;

    function toggleHint(): void {
        showHint = !showHint;
    }
</script>

<div class="input-container">
    <label for={ id }>
        { label } {#if hint}<button class="hint-toggle" on:click={toggleHint} type="button">Hint</button>{/if} {#if required}<span class="required">*</span>{/if}
    </label>
    {#if hint && showHint}<p class="input-hint" in:slide out:slide>{ hint }</p>{/if}
    {#if type !== 'dropdown'}
        <input
        {type}
        {id}
        {name}
        {...conditionalProps}
        {required}
        on:input
        />
    {:else}
        <select {id} {name} {...conditionalProps} {required} bind:value on:input>
            <slot />
        </select>
    {/if}
</div>

<style lang="scss" scoped>
    .input-container {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
    }
    .required {
        font-family: var(--font-primary);
        color: var(--color-danger);
    }
    .hint-toggle {
        cursor: help;

        background-color: transparent;
        border: none;
    }
    .input-hint {
        position: relative;
        top: -3px;

        margin: 0;
        color: var(--color-neutral);
        font-size: 0.85rem;
    }
    input, select {
        font-family: var(--font-primary);

        border: 1px solid var(--color-neutral-dark);
        border-radius: var(--border-radius);

        &[disabled] {
            opacity: 0.5;
        }
    }
    input {
        padding: 0.25rem 0.5rem;
    }
    select {
        padding: 0.18rem 0.5rem;
    }
</style>