export default class HttpService {
  ajax(method, url, data, headers) {
    const fetchHeaders = new Headers({ 'content-type': 'application/json', ...(headers || {}) });
    return fetch(url, {
      method,
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then((res) => res.json() || {});
  }

  get(url) {
    return this.ajax('get', url);
  }

  post(url, data) {
    return this.ajax('post', url, data);
  }

  put(url, data) {
    return this.ajax('put', url, data);
  }
}
