export function leastPositive(a: number, b: number) {
    return a < 0
        ? (b < 0 ? -1 : b)
        : (b < 0 ? a : Math.min(a, b))
}