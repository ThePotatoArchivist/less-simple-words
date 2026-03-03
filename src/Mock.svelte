<script lang="ts">
    import type { GameState } from "./data";
    import Game from "./Game.svelte";

    export let userId: string

    let users = [userId]

    let state: GameState = {describer: userId, description: '', hasInvalid: false}

</script>

{#each users as _, index}
    <input bind:value={users[index]} />
    <button on:click={() => users = users.filter((_, i) => i !== index)}>x</button>
    <Game userId={users[index]} bind:state requireFocus />
{/each}

<button on:click={() => users = [...users, '']}>+</button>