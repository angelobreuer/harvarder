import { Citation, CitationType, Registry } from "./types/Citation.js"
import { createModal } from "./types/CitationModal.js"
import Citations, { save, saveCitations } from "./Storage.js"

import './types/BookCitation.js'
import './types/JournalCitation.js'
import './types/BookArticleCitation.js'
import './types/OnlineSourceCitation.js'
import downloadAsJson from "./util/InlineDownloader.js"

const modalContainer = document.getElementById('modal-container') as HTMLElement
const overview = document.getElementById('overview') as HTMLElement

function appendCitation(citation: Citation) {
    const div = document.createElement('div')
    overview.appendChild(div)
    div.className = 'hover:bg-gray-100 hover:bg-opacity-10 shadow p-5 md-rounded text-justify'
    const preview: CitationPreview = { data: citation, element: div, regenerate: undefined!, deleted: false }

    const regenerate = () => {
        div.innerHTML = ''

        if (!preview.deleted) {
            Registry.get(citation.type).generate(citation, div)
        } else if (div.isConnected) {
            div.remove()
        }
    }

    preview.regenerate = regenerate
    div.onclick = () => edit(preview)
    regenerate()
}

interface CitationPreview {
    data: Citation,
    element: HTMLDivElement,
    regenerate: () => void,
    deleted: boolean,
}

function create(type: CitationType) {
    const wrapper = document.createElement('div')
    const div = document.createElement('div')
    const data: Citation = { ...Registry.get(type).getDefaultOptions(), type }

    wrapper.appendChild(div)
    modalContainer.appendChild(wrapper)

    wrapper.className = 'relative p-10 border-indigo-600 md:m-10 m-4 border-2 lg:w-1/2 md:w-3/4 w-full'
    modalContainer.classList.remove('hidden')

    createModal({
        element: div,
        provider: Registry.get(data.type),
        data,
        isNew: true,
        onexit: (type) => {
            modalContainer.classList.add('hidden')
            modalContainer.innerHTML = ''

            if (type === 'save') {
                Citations.push(data)
                appendCitation(data)
                save()
            }
        }
    })
}

function edit(citation: CitationPreview) {
    const wrapper = document.createElement('div')
    const div = document.createElement('div')
    const shallowData: Citation = JSON.parse(JSON.stringify(citation.data))

    wrapper.appendChild(div)
    modalContainer.appendChild(wrapper)

    wrapper.className = 'relative p-10 border-indigo-600 md:m-10 m-4 border-2 lg:w-1/2 md:w-3/4 w-full'
    modalContainer.classList.remove('hidden')

    createModal({
        element: div,
        provider: Registry.get(shallowData.type),
        data: shallowData,
        onexit: (type) => {
            modalContainer.classList.add('hidden')
            modalContainer.innerHTML = ''

            if (type === 'save') {
                Object.assign(citation.data, shallowData)
            } else if (type === 'delete') {
                const index = Citations.indexOf(citation.data)

                if (index >= 0) {
                    Citations.splice(index, 1)
                } else {
                    alert('Interner Fehler beim Löschen des Zitats: Das Zitat wurde bereits im Speicher gelöscht.')
                }

                citation.deleted = true
                save()
            }

            citation.regenerate()
        }
    })
}

document.querySelectorAll('button[data-citation-type]').forEach(button => {
    const buttonElement = button as HTMLButtonElement
    buttonElement.onclick = () => create(button.getAttribute('data-citation-type') as CitationType)
})

document.getElementById('export-button')!.onclick = () => {
    downloadAsJson('harvarder.json', JSON.stringify(Citations))
}

document.getElementById('import-button')!.onclick = () => {
    const readFile = async (file: File) => {
        const text = await file.text()

        if (file.type !== 'application/json') {
            throw 'Invalid mime type'
        }

        const json = JSON.parse(text)

        if (!confirm('Achtung! Beim Laden einer neuen Datei werden jegliche Änderungen an Zitaten überschrieben. Wollen Sie wirklich fortfahren?')) {
            return
        }

        saveCitations(json)
        document.location.reload()
    }

    const input = document.createElement('input')
    input.type = 'file'

    input.onchange = () => {
        if (!input.files || input.files.length !== 1) {
            alert('Ungültige Eingabe.')
            return
        }

        const file = input.files!.item(0)
        readFile(file!).catch(() => alert('Ungültiger Dateiinhalt.'))
    }

    document.body.appendChild(input)
    input.className = 'hidden'
    input.click()
    document.body.removeChild(input)
}

document.getElementById('delete-all-button')!.onclick = () => {
    if (overview.innerHTML.length === 0) {
        return
    }

    if (!confirm("Wollen Sie wirklich alle Einträge löschen?")) {
        return
    }

    overview.innerHTML = ''
    saveCitations([])
}

Citations.forEach(appendCitation)
save()
