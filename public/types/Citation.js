export function generateCitation(template, data) {
    return template.replace(/{\w+}/, x => data[x]);
}
export class CitationRegistry {
    constructor() {
        this.registry = {};
    }
    register(type, provider) {
        return this.registry[type] = provider;
    }
    get(type) {
        return this.registry[type];
    }
}
export const Registry = new CitationRegistry();
