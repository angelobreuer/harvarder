export default function joinNotNull(delimiter: string, values: any[]) {
    return values.filter(x => !!x).join(delimiter)
}

export function buildName(parts: any[]) {
    return joinNotNull(", ", parts)
}
