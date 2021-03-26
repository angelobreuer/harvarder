import { PersonInput } from "../inputs/PersonInput.js";
import { Registry } from "./Citation.js";
const OnlineSourceCitationProvider = Registry.register('online-source', {
    generate: (data, node) => {
        // first author
        if (data.contributors.length > 0) {
            const author = data.contributors[0];
            node.append(`${author.lastName}, ${author.firstName}`);
        }
        // secondary contributors
        data.contributors.slice(1).forEach(contributor => {
            node.append(`, ${contributor.firstName} ${contributor.lastName}`);
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
        node.append(' [online] ');
        node.append(data.uri);
        const date = typeof data.date === 'object' ? data.date : new Date(data.date);
        node.append(` [${date.toLocaleDateString()}]`);
        node.append('.');
    },
    getDefaultOptions: () => ({
        contributors: [
            {
                firstName: 'Leonie',
                lastName: 'Sontheimer',
            }
        ],
        publishYear: 2019,
        title: 'Wir rasen alle ohne Airbag durchs Netz',
        uri: 'https://www.zeit.de/digital/datenschutz/2019-01/datenleck-internet-politiker-cyberkriminalitaet-datenschutz-interview/',
        date: new Date(2020, 12, 7),
    }),
    getModel: () => ({
        contributors: {
            type: PersonInput,
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
        subtitle: {
            type: 'text',
            name: 'Untertitel',
            description: 'Untertitel des Werkes, falls vorhanden.',
            required: false,
        },
        date: {
            type: 'date',
            name: 'Datum',
            description: 'Das Datum an dem der Artikel zuletzt aus dem Internet abgerufen wurde.',
            required: true,
        },
        uri: {
            type: 'url',
            name: 'URI',
            description: 'Die URI des Artikels',
            required: true,
        }
    })
});
export default OnlineSourceCitationProvider;
