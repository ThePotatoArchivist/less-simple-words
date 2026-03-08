<script lang="ts">
    import { onDestroy } from "svelte";
    import type { GameState } from "./data";
    import Game from "./Game.svelte";
    import { peerClient } from "./lib/peerState";

    export let userId: string
    export let sessionId: string

    const {state, destroy} = peerClient<GameState | undefined>(undefined, userId, sessionId)

    onDestroy(destroy)

</script>

{#if $state === undefined}
    <div>Connecting...</div>
{:else}
    <Game {userId} bind:state={$state} />
{/if}