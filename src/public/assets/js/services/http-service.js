export default class HttpService {
  // eslint-disable-next-line class-methods-use-this
  ajax(method, url, data, headers) {
    const fetchHeaders = new Headers({ 'content-type': 'application/json', ...(headers || {}) });
    return fetch(url, {
      method,
      headers: fetchHeaders,
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error();
      }
      try {
        return await res.json();
      } catch (e) {
        return null;
      }
    });
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

  delete(url) {
    return this.ajax('delete', url);
  }
}
