export function leastPositive(a: number, b: number) {
    return a < 0
        ? (b < 0 ? -1 : b)
        : (b < 0 ? a : Math.min(a, b))
}

const CAPITALS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

export function randomString(length: number) {
    return Array.from({ length }, () => CAPITALS[Math.floor(CAPITALS.length * Math.random())]).join('')
}