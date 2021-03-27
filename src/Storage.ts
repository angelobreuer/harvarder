import { Citation } from "./types/Citation"

let citationsCache: Citation[] | undefined

export function getCitations(): Citation[] {
    if (citationsCache) {
        return citationsCache
    }

    const data = localStorage.getItem('data')
    return citationsCache = (data ? JSON.parse(data) : [])
}

export function saveCitations(value: Citation[]) {
    localStorage.removeItem('data')
    localStorage.setItem('data', JSON.stringify(value))
    citationsCache = value
}
