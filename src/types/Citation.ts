export type CitationType = 'book' | 'journal'

export type InputType = 'text' | 'number' | {
    render: (value: any, oninput: () => void) => {
        element: HTMLElement,
        value: any,
    }
}

export interface BookCitation extends CitationData {
    subtitle?: string,
    edition?: number,
    publisher?: Publisher,
}

export interface PageRange {
    start: number,
    end?: number,
}

export interface JournalCitation extends CitationData {
    subtitle?: string,
    volume?: number,
    name: string,
    number?: number,
    range?: PageRange,
}

export interface Citation extends CitationData {
    type: CitationType,
}

export interface Contributor {
    firstName: string,
    lastName: string,
}

export interface Publisher {
    name: string,
    location: string,
}

export interface CitationData {
    title: string,
    contributors: Contributor[],
    publishYear: number,
}


type CitationProviderModel<T extends CitationData> = { [Property in keyof T]: {
    name: string,
    description: string,
    required: boolean,
    type: InputType,
} }

export interface CitationProvider<T extends CitationData> {
    generate(data: T, node: HTMLDivElement): void,
    getDefaultOptions(): T,
    getModel(): CitationProviderModel<T>
}

export function generateCitation(template: string, data: { [key: string]: any }) {
    return template.replace(/{\w+}/, x => data[x])
}

export class CitationRegistry {
    private readonly registry: { [type: string]: CitationProvider<CitationData> } = {}

    register<T extends CitationData>(type: CitationType, provider: CitationProvider<T>): CitationProvider<T> {
        return this.registry[type] = provider
    }

    get(type: CitationType): CitationProvider<CitationData> {
        return this.registry[type] as any
    }
}

export const Registry: CitationRegistry = new CitationRegistry()
