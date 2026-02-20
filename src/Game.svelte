<script lang="ts">
    import type { GameState } from "./data";
    import SimpleWordInput from "./lib/SimpleWordInput.svelte";

    export let state: GameState
    export let userId: string

    $: describing = state.describer === userId

    // $: console.log(state)
</script>

{#if describing}
    <SimpleWordInput bind:valid={state.description} bind:hasInvalid={state.hasInvalid} />
{:else}
    <div>
        {state.description}
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