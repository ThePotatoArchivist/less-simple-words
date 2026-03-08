<script lang="ts">
    import type { KeyboardEventHandler } from "svelte/elements";
    import { INCOMPLETE_WORD, LAST_WORD, NON_MATCHING_WORDS, } from "../words";
    import { leastPositive } from "./util";

    export let value = ""
    export let requireFocus = false
    export let valid = "" // Read-only
    export let hasIncomplete = false // Read-only

    let active = !requireFocus

    $: invalidIndex = value.search(NON_MATCHING_WORDS)
    $: [invalid] = value.match(NON_MATCHING_WORDS) ?? []

    $: incompleteIndex = value.search(INCOMPLETE_WORD)

    $: ignoredIndex = leastPositive(invalidIndex, incompleteIndex)

    $: hasIncomplete = incompleteIndex >= 0 || invalid !== undefined

    $: valid = ignoredIndex < 0 ? value : value.substring(0, ignoredIndex)
    $: ignored = ignoredIndex < 0 ? undefined : value.substring(ignoredIndex + (invalid?.length ?? 0))
    

    const onKeydown: KeyboardEventHandler<Window> = event => {
        if (!active) return

        if (event.key === 'Backspace' && !event.altKey) {
            if (event.ctrlKey)
                value = value.substring(0, value.search(LAST_WORD))
            else
                value = value.substring(0, value.length -1)
        } else if (event.key.length === 1 && !event.ctrlKey && !event.altKey) {
            value += event.shiftKey ? event.key.toUpperCase() : event.key
        } else
            return
        event.preventDefault()
    }
</script>

<svelte:window on:keydown={onKeydown} on:click={() => { if (requireFocus) active = false }} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="input" on:click|stopPropagation={() => { if (requireFocus) active = true }}>
    <!--Weird spacing necessary to avoid whitespace-->
    <span>{valid}</span>{
    #if invalid}
        <span class="invalid">{invalid}</span>
    {/if}{
    #if ignored}
        <span class="ignored">{ignored}</span>
    {/if}{
    #if active}{#key value}
        <div class="cursor"></div>
    {/key}
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
        0% { visibility: visible; }
        50% { visibility: hidden; }
    }
</style>