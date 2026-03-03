<script lang="ts">
    import Client from "./Client.svelte";
    import Host from "./Host.svelte";

    let userId: string = ''
    let partialSessionId: string = ''
    let connect = false
    let host = false

    $: sessionId = `lsw-${partialSessionId}`
</script>

<main>
    {#if connect}
        {#if host}
            <Host {userId} {sessionId} />
        {:else}
            <Client {userId} {sessionId} />
        {/if}
    {:else}
        <p>
            <label>
                User ID
                <input bind:value={userId} />
            </label>
        </p>

        <p>
            <label>
                Session ID
                <input bind:value={partialSessionId} />
            </label>
        </p>

        <button on:click={() => {connect = true; host = true;}}>Start Game</button>
        <button on:click={() => connect = true}>Join Game</button>
    {/if}
</main>

<style>
    main {
        font-size: 3em;
        width: 60rem;
        padding: 2rem;
        border-radius: 2rem;
        background-color: #333;
    }
</style>
