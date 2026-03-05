<script lang="ts">
    import type { GameState } from "./data";
    import Game from "./Game.svelte";

    let users: string[] = []

    let state: GameState = {describer: null, description: '', hasIncomplete: false}

    $: {
        if (state.describer !== null && !users.includes(state.describer)) {
            state.describer = null
        }
    }
</script>

{#each users as _, index}
    <input bind:value={users[index]} />
    <button on:click={() => users = users.filter((_, i) => i !== index)}>x</button>
    <Game userId={users[index]} bind:state requireFocus />
{/each}

<button on:click={() => users = [...users, '']}>+</button>