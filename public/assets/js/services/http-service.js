export default class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({ 'content-type': 'application/json', ...(headers || {}) });
        return fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: JSON.stringify(data)
        }).then(x => {
            return x.json();
        });
    }

    get(url) {
        return this.ajax('get', url);
    }

    post(url, data) {
        return this.ajax('post', url, data);
    }
}
