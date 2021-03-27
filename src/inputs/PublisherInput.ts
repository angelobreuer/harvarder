import { InputType } from "../types/Citation"

export const PublisherInput: InputType = {
    render: ({ value, onInput, required }) => {
        const element = document.createElement('div')
        const nameInput = document.createElement('input')
        const locationInput = document.createElement('input')
        value = value || { name: '', location: '' }

        if (value) {
            nameInput.defaultValue = value.name
            locationInput.defaultValue = value.location
        }

        nameInput.required = required
        locationInput.required = required

        element.appendChild(nameInput)
        element.appendChild(locationInput)

        nameInput.className = locationInput.className = 'text-gray-100 w-full border-2 mt-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md'
        nameInput.placeholder = 'Name des Verlags'
        locationInput.placeholder = 'Ort des Verlags'

        nameInput.style.backgroundColor = '#1F2022'
        locationInput.style.backgroundColor = '#1F2022'

        nameInput.oninput = () => {
            value = value || {}
            value.name = nameInput.value || ''
            onInput(value)
        }

        locationInput.oninput = () => {
            value = value || {}
            value.location = locationInput.value || ''
            onInput(value)
        }

        return { element, value }
    }
}
