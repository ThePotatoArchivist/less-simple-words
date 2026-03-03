<script lang="ts">
    import Client from "./Client.svelte";
    import Host from "./Host.svelte";
    import Mock from "./Mock.svelte";

    let userId: string = ''
    let partialSessionId: string = ''
    let connectionType: 'host' | 'client' | 'mock' | undefined = undefined

    $: sessionId = `lsw-${partialSessionId}`
</script>

<main>
    {#if connectionType}
        {#if connectionType === 'host'}
            <Host {userId} {sessionId} />
        {:else if connectionType === 'client'}
            <Client {userId} {sessionId} />
        {:else if connectionType === 'mock'}
            <Mock {userId} />
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

        <button on:click={() => connectionType = 'host'}>Start Game</button>
        <button on:click={() => connectionType = 'client'}>Join Game</button>
        {#if import.meta.env.DEV}
            <button on:click={() => connectionType = 'mock'}>Mock Game</button>
        {/if}
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
