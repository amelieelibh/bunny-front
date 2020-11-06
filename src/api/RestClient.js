export default class RestClient {

    constructor (baseUrl = '', { headers = {}, devMode = false } = {}) {
      if (!baseUrl) throw new Error('missing baseUrl');
      this.headers = {/*
        'Accept': 'application/json',
        'Content-Type': 'application/json'*/
      };
      this.baseHeaders = headers;
      this.baseUrl = baseUrl;
      this.devMode = devMode;
    }
  
    _fullRoute (url) {
      return `${this.baseUrl}${url}`;
    }
  
    _fetch ({route, token, method, body = null, queryData = null, form = null, 
          isForm = false, enableLog = false, deleteContentType = false,
          contentType = undefined}) {
        
        if (!route) throw new Error('Route is undefined');
        var fullRoute = this._fullRoute(route);
        if (queryData) {
          var qs = require('qs');
          const query = qs.stringify(queryData);
          fullRoute = `${fullRoute}?${query}`;
        }
        Object.assign(this.headers, this.baseHeaders);
        if(token){
          if(contentType){
            if(enableLog) console.log("overriding Content-Type");
            Object.assign(this.headers, { 
              'Authorization': token ? `Bearer ${token}` : "",
              'locale': 'en-US',
              'Content-Type': contentType
            });
          }else{
            Object.assign(this.headers, { 
              'Authorization': token ? `Bearer ${token}` : "",
              'locale': 'en-US'
            });
          }
        }
        if(isForm){
          if(enableLog) console.log(`invoking with multipart/form-data`);
          Object.assign(this.headers, { 'Content-Type':'multipart/form-data;'}); // boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' });
        }
        let opts = {
          method,
          headers: this.headers,
          body: body != null ? JSON.stringify(body) : 
            (form != null ? form : null)
        };
        if(deleteContentType){
          if(enableLog) console.log("delete Content-Type");
          // Remove 'Content-Type' header to allow browser to add
          // along with the correct 'boundary'
          delete opts.headers['Content-Type'];
        }
        if(enableLog) console.log(`request: ${fullRoute} :: ${JSON.stringify(opts)}`);
        return fetch(fullRoute, opts)
            .then(response => {
              if(enableLog) console.log("response", response);
              return response.json();
            }).catch(error => {
              if(enableLog) console.error('Error:', error)
              return null;
            });
    }
  
    GET (route, token, query, enableLog = false) { return this._fetch({route, token, method: 'GET', query, enableLog}); }
    POST (route, token, body, enableLog = false) { return this._fetch({route, token, method: 'POST', body, enableLog}); }
    POST_WITHOUT_CONTENT_TYPE (route, token, body, enableLog = false) { return this._fetch({route, token, method: 'POST', body, enableLog, deleteContentType: true}); }
    POST_FORM (route, token, form, enableLog = false) { return this._fetch({route, token, method: 'POST', form, isForm: true, enableLog}); }
    POST_FORM_WITHOUT_CONTENT_TYPE (route, token, form, enableLog = false) { return this._fetch({route, token, method: 'POST', form, isForm: true, enableLog, deleteContentType: true}); }
    POST_FORM_URL (route, form, enableLog = false) { return this._fetch({route, method: 'POST', form, enableLog}); }
    PUT (route, token, body, enableLog = false) { return this._fetch({route, token, method: 'PUT', body, enableLog}); }
    DELETE (route, token, query, enableLog = false) { return this._fetch({route, token, method: 'DELETE', query, enableLog}); }
    DELETE_BODY (route, token, body, enableLog = false) { return this._fetch({route, token, method: 'DELETE', body, enableLog}); }
  }
  