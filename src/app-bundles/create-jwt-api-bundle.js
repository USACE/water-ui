import xhr from 'xhr';

const arrayIze = (thing) => (!thing || Array.isArray(thing) ? thing : [thing]);

const shouldSkipToken = (method, url, config) => {
  let skip = false;
  // check for method
  if (config && config.method) {
    const methods = arrayIze(config.method);
    if (methods.indexOf(method) !== -1) skip = true;
  }

  // check for url
  if (!skip) {
    if (config && config.url) {
      const urls = arrayIze(config.url);
      if (urls.indexOf(url) !== -1) skip = true;
    }
  }

  // check custom
  if (!skip) {
    if (config && config.custom) {
      if (typeof config.custom === 'function') {
        skip = config.custom({ method: method, url: url });
      }
    }
  }

  return skip;
};

const processResponse = (response) =>
  new Promise((resolve, reject) => {
    const func = response.status < 400 ? resolve : reject;

    // Handle no content - @TODO: test this
    if (response.status === 204) {
      func({
        status: response.status,
        json: {},
      });
    } else {
      response
        .json()
        .then((json) =>
          func({
            status: response.status,
            json: json,
          })
        )
        .catch((e) => console.error(e));
    }
  });

const commonFetch = (url, options, callback) => {
  fetch(`${url}`, options)
    .then(processResponse)
    .then((response) => {
      if (callback && typeof callback === 'function') {
        callback(null, response.json);
        return;
      }
    })
    .catch((response) => {
      throw new ApiError(
        response.json,
        `Request returned a ${response.status}`
      );
    })
    .catch((err) => {
      callback(err);
    });
};

class ApiError extends Error {
  constructor(data = {}, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    const dataKeys = Object.keys(data);

    this.name = 'Api Error';
    this.timestamp = new Date();

    dataKeys.forEach((key) => {
      this[key] = data[key];
    });
  }
}

const createJwtApiBundle = (opts) => {
  const defaults = {
    name: 'api',
    tokenSelector: 'selectAuthToken',
    skipTokenConfig: null,
  };

  const config = Object.assign({}, defaults, opts);

  const uCaseName = config.name.charAt(0).toUpperCase() + config.name.slice(1);

  // selectors
  const selectSkipTokenConfig = `select${uCaseName}SkipTokenConfig`;
  const selectTokenSelector = `select${uCaseName}TokenSelector`;

  return {
    name: config.name,

    getReducer: () => {
      const initialData = {
        skipTokenConfig: config.skipTokenConfig,
        tokenSelector: config.tokenSelector,
      };

      return (state = initialData) => state;
    },

    [selectSkipTokenConfig]: (state) => state[config.name].skipTokenConfig,
    [selectTokenSelector]: (state) => state[config.name].tokenSelector,

    getExtraArgs: (store) => {
      const getCommonItems = () => ({
        skipTokenConfig: store[selectSkipTokenConfig](),
        tokenSelector: store[selectTokenSelector](),
      });

      const defaultHeaders = (token) => ({
        Authorization: `Bearer ${token}`,
      });

      return {
        apiFetch: (url, options = {}) => {
          const { skipTokenConfig, tokenSelector } = getCommonItems();
          if (!shouldSkipToken(options.method, url, skipTokenConfig)) {
            const token = store[tokenSelector]();
            if (!token) return null;
            else {
              options.headers = { ...defaultHeaders(token) };
            }
          }
          return fetch(url, options);
        },
        // anonGet: (url, callback) => {
        //   fetch(url).then(response => {
        //     if (!response.ok) {
        //       throw new Error(`Response Code Not OK: ${response.status}`)
        //     }
        //     return response
        //   }).then(response => {
        //     if (callback && typeof callback === 'function') {
        //       callback(null, response, response.body)
        //       return
        //     }
        //   })
        //   .catch(err => callback(err))
        // },
        anonGet: (path, callback) => {
          const options = {
            url: path,
          };
          xhr.get(options, callback);
        },
        apiGet: (url, callback) => {
          const { skipTokenConfig, tokenSelector } = getCommonItems();
          const options = { method: 'GET' };
          if (!shouldSkipToken(options.method, url, skipTokenConfig)) {
            const token = store[tokenSelector]();
            if (!token) return null;
            else {
              options.headers = { ...defaultHeaders(token) };
            }
          }
          commonFetch(url, options, callback);
        },

        apiPut: (url, payload, callback) => {
          const { skipTokenConfig, tokenSelector } = getCommonItems();
          const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          if (!shouldSkipToken(options.method, url, skipTokenConfig)) {
            const token = store[tokenSelector]();
            if (!token) return null;
            else {
              options.headers = {
                ...options.headers,
                ...defaultHeaders(token),
              };
            }
          }
          if (payload) {
            options.body = JSON.stringify(payload);
          }
          commonFetch(url, options, callback);
        },

        apiPost: (url, payload, callback) => {
          const { skipTokenConfig, tokenSelector } = getCommonItems();
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          if (!shouldSkipToken(options.method, url, skipTokenConfig)) {
            const token = store[tokenSelector]();
            if (!token) return null;
            else {
              options.headers = {
                ...options.headers,
                ...defaultHeaders(token),
              };
            }
          }
          if (payload) {
            options.body = JSON.stringify(payload);
          }

          commonFetch(url, options, callback);
        },

        apiDelete: (url, callback) => {
          const { skipTokenConfig, tokenSelector } = getCommonItems();
          const options = {
            method: 'DELETE',
          };
          if (!shouldSkipToken(options.method, url, skipTokenConfig)) {
            const token = store[tokenSelector]();
            if (!token) return null;
            else {
              options.headers = { ...defaultHeaders(token) };
            }
          }
          commonFetch(url, options, callback);
        },
      };
    },
  };
};

export default createJwtApiBundle;
