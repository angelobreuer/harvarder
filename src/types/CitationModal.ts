import { CitationProvider, InputType } from "./Citation"

export function createModal(element: HTMLDivElement, provider: CitationProvider<any>) {
    const options = provider.getDefaultOptions()
    const providerModel = provider.getModel()
    const preview = document.createElement('div')

    element.appendChild(preview)

    // pre-render
    provider.generate(options, preview)

    Object.keys(options).forEach(name => {
        const value = options[name]
        const model = providerModel[name]

        const label = document.createElement('label')
        const description = document.createElement('p')
        let input: any

        label.textContent = model.name
        label.className = 'text-white'
        description.textContent = model.description
        description.className = 'text-gray-400'

        if (typeof model.type === 'string') {
            input = document.createElement('input')
            input.type = 'text'
            input.defaultValue = value
            input.placeholder = value
            input.className = 'text-gray-100 w-full mb-4 border-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md'
            input.style.backgroundColor = '#1F2022'
        } else {
            const modelType: InputType = model.type


        }



        const div = document.createElement('div')
        div.appendChild(label)
        div.appendChild(description)
        div.appendChild(input)

        element.appendChild(div)

        input.oninput = () => {
            preview.innerHTML = ''
            options[name] = input.value
            provider.generate(options, preview)
        }
    })
}
