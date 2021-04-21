import { Citation } from "./types/Citation"

let citationsCache: Citation[] | undefined

export function getCitations(): Citation[] {
    if (citationsCache) {
        return citationsCache
    }

    const data = localStorage.getItem('data')
    citationsCache = ((data ? JSON.parse(data) : [])) || []
    citationsCache!.sort((a, b) => a.title.localeCompare(b.title))
    return citationsCache!
}

export function saveCitations(value: Citation[]) {
    localStorage.removeItem('data')
    localStorage.setItem('data', JSON.stringify(value))
    citationsCache = value
}
