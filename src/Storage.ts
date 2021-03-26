import { Citation } from "./types/Citation"

export function getCitations(): Citation[] {
    const data = localStorage.getItem('data')
    return data ? JSON.parse(data) : []
}

export function saveCitations(value: Citation[]) {
    localStorage.setItem('data', JSON.stringify(value))
}

const Citations = getCitations()
export default Citations

export function save() {
    saveCitations(Citations)
}
