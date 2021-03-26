import { InputType, Publisher } from "../types/Citation"

export const PublisherInput: InputType = {
    render: (value: Publisher, oninput: () => void) => {
        const element = document.createElement('div')
        const nameInput = document.createElement('input')
        const locationInput = document.createElement('input')

        nameInput.defaultValue = value.name
        locationInput.defaultValue = value.location

        element.appendChild(nameInput)
        element.appendChild(locationInput)

        nameInput.className = locationInput.className = 'text-gray-100 w-full border-2 mt-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md'
        nameInput.placeholder = 'Name des Verlags'
        locationInput.placeholder = 'Ort des Verlags'

        nameInput.style.backgroundColor = '#1F2022'
        locationInput.style.backgroundColor = '#1F2022'

        nameInput.oninput = () => {
            value.name = nameInput.value || ''
            oninput()
        }

        locationInput.oninput = () => {
            value.location = locationInput.value || ''
            oninput()
        }

        return { element, value }
    }
}
