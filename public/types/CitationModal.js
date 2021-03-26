export function createModal({ element, provider, onexit, onupdate, data, isNew }) {
    const options = data || provider.getDefaultOptions();
    const providerModel = provider.getModel();
    const preview = document.createElement('div');
    const abortButton = document.createElement('button');
    abortButton.className = 'absolute right-3 top-3 font-bold px-4 text-red-700';
    abortButton.textContent = 'x';
    element.appendChild(abortButton);
    element.appendChild(preview);
    // pre-render
    provider.generate(options, preview);
    Object.keys(options).forEach(name => {
        const value = options[name];
        const model = providerModel[name];
        if (!model) {
            return;
        }
        const label = document.createElement('label');
        const description = document.createElement('p');
        const div = document.createElement('div');
        let input;
        let valueGetter;
        const onInput = () => {
            preview.innerHTML = '';
            options[name] = valueGetter();
            provider.generate(options, preview);
            onupdate === null || onupdate === void 0 ? void 0 : onupdate();
        };
        div.className = 'mt-4';
        label.textContent = model.name;
        label.className = 'text-white';
        description.textContent = model.description;
        description.className = 'text-gray-400';
        if (model.required) {
            label.textContent += '*';
        }
        if (typeof model.type === 'string') {
            input = document.createElement('input');
            input.type = model.type;
            input.placeholder = value;
            input.className = 'text-gray-100 w-full my-2 border-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md';
            input.style.backgroundColor = '#1F2022';
            valueGetter = () => model.type === 'date' ? input.valueAsDate : model.type === 'number' ? input.valueAsNumber : input.value;
            if (!isNew) {
                input.defaultValue = value;
            }
            if (model.type === 'date') {
                input.valueAsDate = new Date();
            }
        }
        else {
            const modelType = model.type;
            const rendered = modelType.render({
                required: model.required,
                value: isNew ? undefined : value,
                oninput: onInput,
                placeholder: value
            });
            input = rendered.element;
            valueGetter = () => rendered.value;
        }
        div.appendChild(label);
        div.appendChild(description);
        div.appendChild(input);
        element.appendChild(div);
        input.oninput = onInput;
    });
    const saveButton = document.createElement('button');
    saveButton.className = 'bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 mx-auto mt-6 px-10 rounded w-full';
    saveButton.textContent = 'Quelle speichern';
    element.appendChild(saveButton);
    if (onexit) {
        saveButton.onclick = () => onexit('save');
        abortButton.onclick = () => onexit('abort');
    }
    if (!isNew) {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'bg-red-800 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 mx-auto mt-3 px-10 rounded w-full';
        deleteButton.textContent = 'Quelle löschen';
        element.appendChild(deleteButton);
        if (onexit) {
            deleteButton.onclick = () => onexit('delete');
        }
    }
}
