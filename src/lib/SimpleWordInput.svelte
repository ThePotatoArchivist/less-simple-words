<script lang="ts">
    import type { KeyboardEventHandler } from "svelte/elements";
    import { NON_MATCHING_WORDS } from "../words";

    export let value = ""
    export let active = true

    $: index = value.search(NON_MATCHING_WORDS)
    $: [invalid] = value.match(NON_MATCHING_WORDS) ?? []

    $: valid = index < 0 ? value : value.substring(0, index)
    $: ignored = index < 0 ? undefined : value.substring(index + (invalid?.length ?? 0))

    const onKeydown: KeyboardEventHandler<Window> = event => {
        if (!active) return

        if (event.key === 'Backspace' && !event.altKey) {
            if (event.ctrlKey)
                value = value.substring(0, value.lastIndexOf(' ')) // todo better ctrl+backspace
            else
                value = value.substring(0, value.length -1)
        } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey) {
            value += event.shiftKey ? event.key.toUpperCase() : event.key
        } else
            return
        event.preventDefault()
    }
</script>

<svelte:window on:keydown={onKeydown} />

<div class="input">
    <!--Weird spacing necessary to avoid whitespace-->
    <span>{valid}</span>{
    #if invalid}
        <span class="invalid">{invalid}</span>
    {/if}{
    #if ignored}
        <span class="ignored">{ignored}</span>
    {/if}{
    #if active}
        <div class="cursor"></div>
    {/if}
</div>

<style>
    .input {
        min-height: 1em;
    }

    .invalid {
        color: red;
    }

    .ignored {
        color: gray;
    }

    .cursor {
        animation: blink 1s infinite step-end;
        display: inline-block;
        height: 1.2em;
        margin-bottom: -0.2em;
        width: 1px;
        background-color: currentColor;
    }

    @keyframes blink {
        0% { visibility: hidden; }
        50% { visibility: visible; }
    }
</style>