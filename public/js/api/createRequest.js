/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
// const mail = document.get('email');
// const password = document.getElementsByName('password')

const createRequest =  (options = {}) => {
   
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
        let url = options.url;
        if (options.data) {
            url += '?';
            let data = options.data;
            for (let key in data) {
                url += key + '=' + data[key] + '&';
            }
            url = url.slice(0,-1);
        }

        try {
            if(url) {
                xhr.open(options.method, url, true);
                xhr.send();
            }
        } catch (e) {
            options.callback(e);
        }
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

