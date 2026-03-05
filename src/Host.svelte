<script lang="ts">
    import type { GameState } from "./data";
    import Game from "./Game.svelte";
    import { peerHost } from "./lib/peerState";

    export let userId: string
    export let sessionId: string

    const {state, connected} = peerHost<GameState>({describer: userId /* TODO */, description: '', hasInvalid: false}, userId, sessionId)

    $: {
        if ($state.describer !== undefined && !$connected.includes($state.describer)) {
            $state.describer = undefined
        }
    }
</script>

<div>Connected: {$connected}</div>

<Game {userId} bind:state={$state} />