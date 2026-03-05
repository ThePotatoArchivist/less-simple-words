export interface GameState {
    description: string
    hasIncomplete: boolean
    describer: string | null
}

export type ConnectionType = 'host' | 'client' | 'mock' | undefined