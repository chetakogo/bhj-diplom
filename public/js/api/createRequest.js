/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// const mail = document.get('email');
// const password = document.getElementsByName('password')

function createRequest (options = {callback, data, method, url}) {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();

    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
        if ((xhr.readyState === 4) && (xhr.status === 200 )){
            options.callback(null, xhr.response)
        } else {
            options.callback(xhr.error)
        }
    });

    if (options.method === 'GET') {
        xhr.open(options.method, `${options.url}?mail=${options.data.mail}&${data.mail}password=${options.data.password}`)
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }
    try {
        xhr.open(options.method, options.url);
        if (options.method === 'GET') {
            xhr.send();
        } else {
            xhr.send(formData);
        }
    } catch (error) {
        callback(error);
    }
   
}

