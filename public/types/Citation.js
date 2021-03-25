export function generateCitation(template, data) {
    return template.replace(/{\w+}/, function (x) { return data[x]; });
}
var CitationRegistry = /** @class */ (function () {
    function CitationRegistry() {
        this.registry = {};
    }
    CitationRegistry.prototype.register = function (type, provider) {
        return this.registry[type] = provider;
    };
    CitationRegistry.prototype.get = function (type) {
        return this.registry[type];
    };
    return CitationRegistry;
}());
export { CitationRegistry };
export var Registry = new CitationRegistry();
