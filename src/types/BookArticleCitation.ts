import { PageRangeInput } from "../inputs/PageRangeInput.js"
import { PersonInput } from "../inputs/PersonInput.js"
import { PublisherInput } from "../inputs/PublisherInput.js"
import { BookArticleCitation, Registry } from "./Citation.js"

const BookArticleCitationProvider = Registry.register('book-article', {
    generate: (data: BookArticleCitation, node: HTMLDivElement) => {
        // first author
        if (data.contributors.length > 0) {
            const author = data.contributors[0]
            node.append(`${author.lastName}, ${author.firstName}`)
        }

        // secondary contributors
        data.contributors.slice(1).forEach(contributor => {
            node.append(`, ${contributor.firstName} ${contributor.lastName}`)
        })

        // date
        node.append(` (${data.publishYear}): `)

        // title
        const title = document.createElement('i')
        node.appendChild(title)
        node.append(', ')
        title.append(data.title)

        if (data.subtitle && data.subtitle.length > 0) {
            title.append(`: ${data.subtitle} `)
        }

        // publishers
        if (data.publishers && data.publishers.length) {
            node.append('in: ')

            node.append(data.publishers
                .map(x => `${x.firstName} ${x.lastName}`)
                .join(', '))

            node.append(' (Hrsg.), ')
        } else {
            node.append(' (o. H.)')
        }

        // edition
        if (data.edition) {
            node.append(`${data.edition}. Aufl., `)
        }

        // publisher
        if (data.publishingCompany.location) {
            // publisher with location
            node.append(`${data.publishingCompany.location}: ${data.publishingCompany.name}`)
        } else {
            // publisher without location
            node.append(`${data.publishingCompany.name}`)
        }

        // page range
        if (data.range) {
            node.append(`, S. ${data.range.start}`)

            if (data.range.end) {
                node.append(`-${data.range.end}`)
            }
        }

        node.append('.')
    },
    getDefaultOptions: () => ({
        publishYear: 2014,
        title: 'Geschichte der europäischen Aktiengesellschaft',
        publishers: [
            {
                firstName: 'Dirk',
                lastName: 'Jannot',
            },
            {
                firstName: 'Jürgen',
                lastName: 'Frodermann'
            }
        ],
        name: 'Handbuch der europäischen Aktiengesellschaft',
        edition: 2,
        publishingCompany: {
            location: 'Heidelberg',
            name: 'Verlag C.F. Müller',
        },
        contributors: [
            {
                firstName: 'Claudius',
                lastName: 'Taschner',
            },
            {
                firstName: 'Nadine',
                lastName: 'Bodenschatz'
            }
        ],
        range: {
            start: 11,
            end: 27,
        }
    }),
    getModel: () => ({
        contributors: {
            type: PersonInput,
            name: 'Autoren',
            description: 'Geben Sie hier die Personen an, die an dem Werk beteiligt waren. Der Autor wird als erste mitwirkende Person angegeben.',
            required: true,
        },
        range: {
            type: PageRangeInput,
            description: 'Seitenbereich',
            name: 'Seitenbereich',
            required: true,
        },
        publishers: {
            type: PersonInput,
            name: 'Herausgeber',
            description: 'Geben Sie hier die Personen an, die an der Herausgebung des Werkes beteiligt waren.',
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
        edition: {
            type: 'number',
            name: 'Auflage',
            description: 'Die Auflage des Werkes.',
            required: false,
        },
        publishingCompany: {
            type: PublisherInput,
            name: 'Verlag/Herausgeber',
            description: 'Der Verlag oder der Herausgeber des Werkes.',
            required: false,
        },
        subtitle: {
            type: 'text',
            name: 'Untertitel',
            description: 'Untertitel des Werkes, falls vorhanden.',
            required: false,
        },
        name: {
            type: 'text',
            description: 'Vollständiger Titel der Publikation.',
            name: 'Publikationstitel',
            required: true,
        }
    })
})

export default BookArticleCitationProvider
