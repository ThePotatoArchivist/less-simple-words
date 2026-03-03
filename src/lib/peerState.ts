import Peer, { type DataConnection } from 'peerjs'
import { writable, type Readable, type Writable } from 'svelte/store'

interface Metadata {
    id: string
}

interface Session<T> {
    connected: Readable<string[]> // empty means not connected on the client
    state: Writable<T>
    destroy(): void
}

interface ConnectedPacket {
    type: 'connected'
    connected: string[]
}

interface StatePacket<T> {
    type: 'state'
    state: T
}

type C2SPacket<T> = StatePacket<T>
type S2CPacket<T> = ConnectedPacket | StatePacket<T>

function peerHost<T>(initialState: T, userId: string, sessionId: string): Session<T> {
    const host = new Peer(sessionId)
    const state = writable(initialState)
    const connected = writable([userId])

    let lastSource: DataConnection | undefined = undefined

    console.log('connecting')

    console.log(host)

    host.on('open', () => console.log(`connected as ${host.id}`))

    host.on('connection', connection => {
        connection.on('open', () => {
            console.log(`New connection from ${(connection.metadata as Metadata).id}!`)

            connected.update(connected => [...connected, (connection.metadata as Metadata).id])

            const unsubscribeState = state.subscribe(state => {
                if (lastSource === connection) return
                // else
                console.log('Sending state')
                connection.send({type: 'state', state} satisfies S2CPacket<T>)
            })

            const unsubscribeConnected = connected.subscribe(connected => {
                console.log('Sending connection')
                connection.send({type: 'connected', connected} satisfies S2CPacket<T>)
            })

            connection.on('close', () => {
                connected.update(connected => connected.filter(e => e !== (connection.metadata as Metadata).id))
                unsubscribeState()
                unsubscribeConnected()
            })
        })

        connection.on('data', data => {
            lastSource = connection
            const packet = data as C2SPacket<T>

            switch (packet.type) {
                case 'state':
                    console.log('Received state')
                    lastSource = connection
                    state.set(packet.state)
                    break
            }
        })
    })

    const set = (value: T) => {
        lastSource = undefined
        state.set(value)
    }

    return { state: { ...state, set }, connected, destroy: () => host.destroy() }
}


function peerClient<T>(defaultState: T, userId: string, sessionId: string): Session<T> {
    const state = writable(defaultState)
    const client = new Peer()
    const connected = writable<string[]>([])

    let lastChangeRemote = true

    client.on('open', () => {
        console.log(`Connecting to ${sessionId}`)
        const connection = client.connect(sessionId, {metadata: {id: userId} satisfies Metadata})
        console.log(connection)

        connection.on('open', () => {
            console.log('Connected')
            lastChangeRemote = true
            
            const unsubscribe = state.subscribe(state => {
                if (lastChangeRemote) return
                console.log('Sending state')
                connection.send({type: 'state', state} satisfies C2SPacket<T>)
            })

            connection.on('close', () => {
                unsubscribe()
                connected.set([])
            })
        })

        connection.on('data', data => {
            const packet = data as S2CPacket<T>

            switch (packet.type) {
                case 'connected':
                    console.log('Received connected')
                    connected.set(packet.connected)
                    break
                case 'state':
                    console.log('Received state')
                    lastChangeRemote = true
                    state.set(packet.state)
                    break
            }
        })
    })

    const set = (value: T) => {
        lastChangeRemote = false
        state.set(value)
    }

    return { state: { ...state, set }, connected, destroy: () => client.destroy() }
}

export { peerClient, peerHost }