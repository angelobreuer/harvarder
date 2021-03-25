export function createModal(element, provider) {
    var options = provider.getDefaultOptions();
    var providerModel = provider.getModel();
    var preview = document.createElement('div');
    element.appendChild(preview);
    // pre-render
    provider.generate(options, preview);
    Object.keys(options).forEach(function (name) {
        var value = options[name];
        var model = providerModel[name];
        var label = document.createElement('label');
        var description = document.createElement('p');
        var input;
        label.textContent = model.name;
        label.className = 'text-white';
        description.textContent = model.description;
        description.className = 'text-gray-400';
        if (typeof model.type === 'string') {
            input = document.createElement('input');
            input.type = 'text';
            input.defaultValue = value;
            input.placeholder = value;
            input.className = 'text-gray-100 w-full mb-4 border-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md';
            input.style.backgroundColor = '#1F2022';
        }
        else {
            var modelType = model.type;
        }
        var div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(description);
        div.appendChild(input);
        element.appendChild(div);
        input.oninput = function () {
            preview.innerHTML = '';
            options[name] = input.value;
            provider.generate(options, preview);
        };
    });
}
