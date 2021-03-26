export type CitationType = 'book' | 'journal' | 'book-article' | 'online-source'

export type InputTypeProps<T = any> = {
    value: T,
    oninput: () => void,
    placeholder: T,
    required: boolean
}

export type InputType = 'text' | 'number' | 'date' | 'url' | {
    render: (props: InputTypeProps) => {
        element: HTMLElement,
        value: any
    }
}

export interface BookCitation extends CitationData {
    subtitle?: string,
    edition?: number,
    publisher?: Publisher,
}

export interface OnlineSourceCitation extends CitationData {
    subtitle?: string,
    writers?: Person[]
    uri: string,
    date: Date,
}

export interface BookArticleCitation extends CitationData {
    subtitle?: string,
    edition?: number,
    publishers?: Person[],
    publishingCompany: Publisher,
    range?: PageRange,
    name: string,
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

export interface Person {
    firstName: string,
    lastName: string,
}

export interface Publisher {
    name: string,
    location: string,
}

export interface CitationData {
    title: string,
    contributors: Person[],
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
