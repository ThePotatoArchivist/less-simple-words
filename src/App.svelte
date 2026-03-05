<script lang="ts">
    import Client from "./Client.svelte";
    import type { ConnectionType } from "./data";
    import Host from "./Host.svelte";
    import Menu from "./Menu.svelte";
    import Mock from "./Mock.svelte";

    let userId: string = ''
    let partialSessionId: string = ''
    let connectionType: ConnectionType = undefined

    $: sessionId = `lsw-${partialSessionId}`
</script>

<main>
    {#if connectionType === 'host'}
        <Host {userId} {sessionId} {partialSessionId} />
    {:else if connectionType === 'client'}
        <Client {userId} {sessionId} />
    {:else if connectionType === 'mock'}
        <Mock />
    {:else}
        <Menu onStart={data => ({connectionType, userId, partialSessionId} = data)} />
    {/if}
</main>

<style>
</style>
