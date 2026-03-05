<script lang="ts">
    import type { GameState } from "./data";
    import Game from "./Game.svelte";
    import { peerHost } from "./lib/peerState";

    export let userId: string
    export let sessionId: string
    export let partialSessionId: string

    const {state, connected} = peerHost<GameState>({describer: null, description: '', hasIncomplete: false}, userId, sessionId)

    $: {
        if ($state.describer !== null && !$connected.includes($state.describer)) {
            $state.describer = null
        }
    }
</script>

<div class="info">Game ID: {partialSessionId} Connected: {$connected}</div>

<Game {userId} bind:state={$state} />

<style>
    .info {
        text-align: center;
    }
</style>