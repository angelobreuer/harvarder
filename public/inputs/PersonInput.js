export const PersonInput = {
    render: ({ value, oninput }) => {
        const element = document.createElement('div');
        const container = document.createElement('div');
        value = value || [];
        const regenerate = () => {
            container.innerHTML = '';
            for (let contributor of value) {
                const view = document.createElement('div');
                const firstName = document.createElement('input');
                const lastName = document.createElement('input');
                const removeButton = document.createElement('button');
                view.className = 'flex items-center';
                removeButton.textContent = 'Löschen';
                removeButton.className = 'bg-red-600 m-2 p-1 px-3 h-full my-auto sm-rounded';
                firstName.className = 'text-gray-100 w-full border-2 mt-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md mr-2';
                lastName.className = 'text-gray-100 w-full border-2 mt-2 border-gray-500 hover:border-indigo-600 px-4 py-1 rounded-md ml-2';
                firstName.style.backgroundColor = '#1F2022';
                lastName.style.backgroundColor = '#1F2022';
                removeButton.onclick = () => {
                    const index = value.indexOf(contributor);
                    for (let i = index; i < value.length; i++) {
                        value[i] = value[i + 1];
                    }
                    value.pop();
                    regenerate();
                    oninput();
                };
                firstName.oninput = () => {
                    contributor.firstName = firstName.value;
                    oninput();
                };
                lastName.oninput = () => {
                    contributor.lastName = lastName.value;
                    oninput();
                };
                view.appendChild(firstName);
                view.appendChild(lastName);
                view.appendChild(removeButton);
                container.appendChild(view);
                firstName.value = contributor.firstName;
                lastName.value = contributor.lastName;
                firstName.placeholder = 'Vorname(n)';
                lastName.placeholder = 'Nachname';
            }
        };
        const addButton = document.createElement('button');
        addButton.className = 'bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-2 mx-auto mt-3 px-10 rounded w-full';
        addButton.textContent = 'Person hinzufügen';
        addButton.onclick = () => {
            value.push({ firstName: '', lastName: '' });
            regenerate();
            oninput();
        };
        regenerate();
        element.appendChild(container);
        element.appendChild(addButton);
        return { element, value };
    }
};
