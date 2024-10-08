document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const entitySelect = document.getElementById('entity');
    const idInput = document.getElementById('id');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');

    fetchButton.addEventListener('click', () => {
        const entity = entitySelect.value;
        const id = idInput.value;

        if (id < 1 || id > 10) {
            errorDiv.textContent = 'ID должен быть от 1 до 10.';
            resultDiv.textContent = '';
            return;
        }

        const url = `https://swapi.py4e.com/api/${entity}/${id}/`;

        loadingDiv.style.display = 'block';
        
        resultDiv.textContent = '';
        errorDiv.textContent = '';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(`Ошибка: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
                resultDiv.innerHTML = formattedData;
            })
            .catch(error => {
                errorDiv.textContent = error === 'Failed to fetch' ? 'Сервер недоступен.' : error;
            })
            .finally(() => {
                loadingDiv.style.display = 'none';
            });
    });
});
