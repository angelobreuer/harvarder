import { Citation, Person } from "./types/Citation"

let citationsCache: Citation[] | undefined

function comparePersons(a: Person, b: Person, reverse: boolean) {

    let result = (reverse ? a.lastName : a.firstName)
        .localeCompare((reverse ? b.lastName : b.firstName))

    if (result !== 0) {
        return result
    }

    result = (reverse ? a.firstName : a.lastName)
        .localeCompare((reverse ? b.firstName : b.lastName))

    return result
}

function comparer(a: Citation, b: Citation): number {

    // compare authors
    for (let index = 0; index < a.contributors.length, index < b.contributors.length; index++) {
        let result
        if ((result = comparePersons(a.contributors[index], b.contributors[index], index === 0)) !== 0) {
            return result
        }
    }

    // compare title
    return a.title.localeCompare(b.title)
}

export function getCitations(): Citation[] {
    if (citationsCache) {
        return citationsCache
    }

    const data = localStorage.getItem('data')
    citationsCache = ((data ? JSON.parse(data) : [])) || []
    citationsCache!.sort(comparer)
    return citationsCache!
}

export function saveCitations(value: Citation[]) {
    localStorage.removeItem('data')
    localStorage.setItem('data', JSON.stringify(value))
    citationsCache = value
}
