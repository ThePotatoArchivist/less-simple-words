<script lang="ts">
    import type { GameState } from "./data";
    import Game from "./Game.svelte";
    import { peerClient } from "./lib/peerState";

    export let userId: string
    export let sessionId: string

    const {state} = peerClient<GameState | undefined>(undefined, userId, sessionId)
</script>

{#if $state === undefined}
    <div>Connecting...</div>
{:else}
    <Game {userId} bind:state={$state} />
{/if}