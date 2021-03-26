export const DateInput = {
    render: ({ value, oninput, required, placeholder }) => {
        var _a;
        const element = document.createElement('div');
        const dayInput = document.createElement('input');
        const monthInput = document.createElement('input');
        const yearInput = document.createElement('input');
        element.className = 'grid grid-cols-3 gap-x-2';
        dayInput.type = 'number';
        monthInput.type = 'number';
        yearInput.type = 'number';
        dayInput.placeholder = placeholder.getDay().toString();
        monthInput.placeholder = placeholder.getMonth().toString();
        yearInput.placeholder = placeholder.getFullYear().toString();
        if (value) {
            dayInput.defaultValue = value.start.toString();
            monthInput.defaultValue = (_a = value.end) === null || _a === void 0 ? void 0 : _a.toString();
        }
        dayInput.required = required;
        monthInput.required = required;
        element.appendChild(dayInput);
        element.appendChild(monthInput);
        element.appendChild(yearInput);
        dayInput.className = monthInput.className = yearInput.className = 'text-gray-100 w-full border-2 mt-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md';
        dayInput.style.backgroundColor = '#1F2022';
        monthInput.style.backgroundColor = '#1F2022';
        yearInput.style.backgroundColor = '#1F2022';
        dayInput.oninput = () => {
            value.setDate(new Date(yearInput.valueAsNumber, monthInput.valueAsNumber, dayInput.valueAsNumber).getDate());
            oninput();
        };
        monthInput.oninput = () => {
            value.end = monthInput.valueAsNumber;
            oninput();
        };
        return { element, value };
    }
};
