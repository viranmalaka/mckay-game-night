import axios from 'axios';
import { get, to } from './utils';
const API_ROOT = '/api/'; // root of the api url

const responseBody = (returnResponsesOnly) => (res) => (returnResponsesOnly ? res.data : res); // an arrow function to takes only the data value from the response object
const errBody = (returnResponsesOnly) => (res) => {
  // an arrow function to takes only the response body from error response.
  if (
    get(res, ['response', 'data', 'code']) === 401 &&
    get(res, ['response', 'config', 'url'] !== '/api/user/validate')
  ) {
    window.location.href = '/';
    localStorage.setItem('rms_token', '');
  }
  throw returnResponsesOnly ? res.response.data : res;
};

// axios configuration object. this has header values with token.
const axiosConfig = (headers) => ({
  headers,
});

// request belongs to item api
const createAPI = (rRO, apiRoot) => {
  return {
    get: (url, headers = {}) =>
      to(axios.get(`${apiRoot}${url}`, axiosConfig(headers)).then(responseBody(rRO)).catch(errBody(rRO))),
    post: (url, body, headers = {}) =>
      to(axios.post(`${apiRoot}${url}`, body, axiosConfig(headers)).then(responseBody(rRO)).catch(errBody(rRO))),
    put: (url, body, headers = {}) =>
      to(axios.put(`${apiRoot}${url}`, body, axiosConfig(headers)).then(responseBody(rRO)).catch(errBody(rRO))),
    patch: (url, body, headers = {}) =>
      to(axios.patch(`${apiRoot}${url}`, body, axiosConfig(headers)).then(responseBody(rRO)).catch(errBody(rRO))),
    del: (url, headers = {}) =>
      to(axios.delete(`${apiRoot}${url}`, axiosConfig(headers)).then(responseBody(rRO)).catch(errBody(rRO))),
    head: (url, headers) =>
      to(axios.head(`${apiRoot}${url}`, axiosConfig(headers)).then(responseBody(false)).catch(errBody(false))),
  };
};

const API = createAPI(true, API_ROOT);
export default API;
export const APIResponses = createAPI(false, API_ROOT);
export const outsideAPI = createAPI(true, '');
