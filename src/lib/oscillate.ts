import { writable, type Readable } from "svelte/store";

export function oscillate(periodMs: number): Readable<boolean> {
    const store = writable(false)

    setInterval(() => store.update(value => !value), periodMs / 2)

    return store;
}