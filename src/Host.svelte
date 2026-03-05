<script lang="ts">
    import type { GameState } from "./data";
    import Game from "./Game.svelte";
    import { peerHost } from "./lib/peerState";

    export let userId: string
    export let sessionId: string

    const {state, connected} = peerHost<GameState>({describer: null, description: '', hasIncomplete: false}, userId, sessionId)

    $: {
        if ($state.describer !== null && !$connected.includes($state.describer)) {
            $state.describer = null
        }
    }
</script>

<div class="connected">Connected: {$connected}</div>

<Game {userId} bind:state={$state} />

<style>
    .connected {
        text-align: center;
    }
</style>