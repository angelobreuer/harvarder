import { ContributorInput } from "../inputs/ContributorInput.js";
import { Registry } from "./Citation.js";
const JournalCitationProvider = Registry.register('journal', {
    generate: (data, node) => {
        // first author
        if (data.contributors.length > 0) {
            const author = data.contributors[0];
            node.append(`${author.lastName}, ${author.firstName}`);
        }
        // secondary contributors
        data.contributors.slice(1).forEach(contributor => {
            node.append(`/${contributor.firstName} ${contributor.lastName}`);
        });
        // date
        node.append(` (${data.publishYear}): `);
        // title
        const title = document.createElement('i');
        node.appendChild(title);
        node.append(', ');
        title.append(data.title);
        if (data.subtitle && data.subtitle.length > 0) {
            title.append(`: ${data.subtitle} `);
        }
        node.append('in: ');
        // name
        const name = document.createElement('i');
        name.append(data.name);
        node.appendChild(name);
        // volume
        if (data.volume) {
            node.append(`, Jg. ${data.volume}`);
        }
        // number
        if (data.number) {
            node.append(`, Nr. ${data.number}`);
        }
        // page range
        if (data.range) {
            node.append(`, S. ${data.range.start}`);
            if (data.range.end) {
                node.append(`-${data.range.end}`);
            }
        }
        node.append('.');
    },
    getDefaultOptions: () => ({
        title: 'Allgemeinwissen: Wir brauchen einen neuen Kanon',
        contributors: [
            {
                firstName: 'Thomas',
                lastName: 'Kerstan',
            }
        ],
        publishYear: 2018,
        name: 'Die Zeit',
        number: 34,
        range: {
            start: 1,
        },
        volume: 72,
    }),
    getModel: () => ({
        contributors: {
            type: ContributorInput,
            name: 'Mitwirkende',
            description: 'Geben Sie hier die Personen an, die an dem Werk beteiligt waren. Der Autor wird als erste mitwirkende Person angegeben.',
            required: true,
        },
        publishYear: {
            type: 'number',
            name: 'Veröffentlichungsjahr',
            description: 'Das Jahr in dem das Werk veröffentlicht wurde.',
            required: false,
        },
        title: {
            type: 'text',
            name: 'Titel',
            description: 'Titel des Werks',
            required: true,
        },
        volume: {
            type: 'number',
            name: 'Auflage',
            description: 'Die Bandnummer des Werkes.',
            required: false,
        },
        name: {
            type: 'text',
            name: 'Zeitschrift',
            description: 'Offizieller Name der Zeitschrift',
            required: true,
        },
        subtitle: {
            type: 'text',
            name: 'Untertitel',
            description: 'Untertitel des Werkes, falls vorhanden.',
            required: false,
        },
        number: {
            type: "number",
            name: 'Nummer',
            description: 'Nummer der Ausgabe',
            required: false,
        },
        range: {
            type: 'text',
            description: 'Der Seitenbereich in dem die zitieren Zeile(n) vorkommen.',
            name: 'Seitenbereich',
            required: false,
        }
    })
});
export default JournalCitationProvider;
