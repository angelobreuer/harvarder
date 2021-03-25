import { BookCitation, generateCitation, Registry } from "./Citation.js"

const BookCitationProvider = Registry.register('book', {
    generate: (data: BookCitation, node: HTMLDivElement) => {
        // first author
        if (data.contributors.length > 0) {
            const author = data.contributors[0]
            node.append(`${author.lastName}, ${author.firstName}`)
        }

        // secondary contributors
        data.contributors.slice(1).forEach(contributor => {
            node.append(`/${contributor.firstName} ${contributor.lastName}`)
        })

        // date
        node.append(` (${data.publishYear}) `)

        // title
        const title = document.createElement('i')
        node.appendChild(title)
        node.append(', ')
        title.append(data.title)

        if (data.subtitle && data.subtitle.length > 0) {
            title.append(`: ${data.subtitle} `)
        }

        // edition
        if (data.edition) {
            node.append(`${data.edition}. Aufl., `)
        }

        // publisher
        if (data.publisher) {
            node.append(`${data.publisher.location}: ${data.publisher.name}`)
        } else {
            node.append('o.H.')
        }

        node.append('.')
    },
    getDefaultOptions: () => ({
        title: 'Mutter Courage und ihre Kinder. Eine Chronik aus dem Dreißigjährigen Krieg.',
        contributors: [
            {
                firstName: 'Bertolt',
                lastName: 'Brecht',
            }
        ],
        publishYear: 2018,
        edition: 73,
        publisher: {
            name: 'Suhrkamp-Verlag',
            location: 'Frankfurt am Main',
        }
    }),
    getModel: () => ({
        contributors: {
            name: 'Mitwirkende',
            description: 'Geben Sie hier die Personen an, die an dem Werk beteiligt waren. Der Autor wird als erste mitwirkende Person angegeben.',
            required: true,
        },
        publishYear: {
            name: 'Veröffentlichungsjahr',
            description: 'Das Jahr in dem das Werk veröffentlicht wurde.',
            required: false,
        },
        title: {
            name: 'Titel',
            description: 'Titel des Werks',
            required: true,
        },
        edition: {
            name: 'Auflage',
            description: 'Die Auflage des Werkes.',
            required: false,
        },
        publisher: {
            name: 'Verlag/Herausgeber',
            description: 'Der Verlag oder der Herausgeber des Werkes.',
            required: false,
        },
        subtitle: {
            name: 'Untertitel',
            description: 'Untertitel des Werkes, falls vorhanden.',
            required: false,
        }
    })
})

export default BookCitationProvider
