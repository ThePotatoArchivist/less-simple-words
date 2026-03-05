<script lang="ts">
    import type { GameState } from "./data";
    import SimpleWordInput from "./lib/SimpleWordInput.svelte";

    export let state: GameState
    export let userId: string
    export let requireFocus: boolean = false

    $: describing = state.describer === userId

</script>

<div class="game">
    {#if state.describer === null}
        <button on:click={() => state.describer = userId}>Start Writing</button>
    {:else if describing}
        <div class="content">
            <SimpleWordInput bind:valid={state.description} bind:hasIncomplete={state.hasIncomplete} {requireFocus} />
        </div>
        <button on:click={() => state.describer = null}>Stop Writing</button>
    {:else}
        <div class="writer">{state.describer} Is Writing</div>
        <div class="content">
            {state.description || (state.hasIncomplete ? undefined : '\u00a0')}
            {#if state.hasIncomplete}
                <span class="incomplete">...</span>
            {/if}
        </div>
    {/if}
</div>

<style>
    .game {
        width: 60rem;
        padding: 2rem;
        border-radius: 2rem;
        background-color: #333;
    }

    .content {
        font-size: 3em;
    }

    .writer {
        text-align: center;
    }

    button {
        display: block;
        margin: auto;
    }

    .incomplete {
        color: gray;
    }
</style>