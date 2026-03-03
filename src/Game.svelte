<script lang="ts">
    import type { GameState } from "./data";
    import SimpleWordInput from "./lib/SimpleWordInput.svelte";

    export let state: GameState
    export let userId: string
    export let requireFocus: boolean = false

    $: describing = state.describer === userId

    // $: console.log(state)
</script>

{#if describing}
    <SimpleWordInput bind:valid={state.description} bind:hasInvalid={state.hasInvalid} {requireFocus} />
{:else}
    <div>
        {state.description || (state.hasInvalid ? undefined : '\u00a0')}
        {#if state.hasInvalid}
            <span class="invalid">...</span>
        {/if}
    </div>
{/if}

<style>
    .invalid {
        color: red;
    }
</style>