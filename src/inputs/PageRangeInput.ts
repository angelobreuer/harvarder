import { InputType, InputTypeProps, PageRange } from "../types/Citation"

export const PageRangeInput: InputType = {
    render: ({ value, oninput, required, placeholder }: InputTypeProps<PageRange>) => {
        const element = document.createElement('div')
        const startInput = document.createElement('input')
        const endInput = document.createElement('input')

        element.className = 'grid grid-cols-2 gap-x-2'

        startInput.type = 'number'
        endInput.type = 'number'

        startInput.placeholder = placeholder.start.toString()

        if (placeholder.end) {
            endInput.placeholder = placeholder.end.toString()
        }

        if (value) {
            startInput.defaultValue = value.start.toString()
            endInput.defaultValue = value.end?.toString()!
        }

        startInput.required = required
        endInput.required = required

        element.appendChild(startInput)
        element.appendChild(endInput)

        startInput.className = endInput.className = 'text-gray-100 w-full border-2 mt-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md'

        startInput.style.backgroundColor = '#1F2022'
        endInput.style.backgroundColor = '#1F2022'

        startInput.oninput = () => {
            value.start = startInput.valueAsNumber
            oninput()
        }

        endInput.oninput = () => {
            value.end = endInput.valueAsNumber
            oninput()
        }

        return { element, value }
    }
}
