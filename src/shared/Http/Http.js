import axios from 'axios';

let cancel;
const CancelToken = axios.CancelToken;

const Http = {
  token: (currentState) => { return currentState.user.user.idToken },
  get: (url, currentState, custom, token) => {
    return new Promise((resolve, reject) => {
      let host = process.env.REACT_APP_API_URL;
      let postUrl = custom ? url : host + url;
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token') ? `Bearer ${localStorage.getItem('id_token')}` : ''
      };
      axios.get(postUrl, {
        headers: headers
      }).then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },
  delete: (url, body, currentState, custom, token) => {
    return new Promise((resolve, reject) => {
      let host = process.env.REACT_APP_API_URL;
      let postUrl = custom ? url : host + url;
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token') ? `Bearer ${localStorage.getItem('id_token')}` : ''
      };
      axios({
        url: postUrl,
        data: JSON.stringify(body),
        method: 'delete',
        timeout: 40000,
        headers: headers
      }).then((response) => resolve(response)).catch((err) => {
        reject(err);
      });
    })
  },
  post: (url, body, currentState, custom, token) => {
    return new Promise((resolve, reject) => {
      let host = process.env.REACT_APP_API_URL;
      let postUrl = custom ? url : host + url;
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token') ? `Bearer ${localStorage.getItem('id_token')}` : ''
      };
      if (token) {
        headers.Authorization = token;
      }
      axios({
        url: postUrl,
        data: JSON.stringify(body),
        method: 'post',
        timeout: 40000,
        headers: headers
      }).then((response) => resolve(response)).catch((err) => {
        reject(err);
      });
    })
  },
  put: (url, body, currentState, custom, token) => {
    return new Promise((resolve, reject) => {
      const host  = process.env.REACT_APP_API_URL;
      let postUrl = custom ? url : host + url;
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token') ? `Bearer ${localStorage.getItem('id_token')}` : ''
      };
      if (token) {
        headers.Authorization = token;
      }
      axios({
        url: postUrl,
        data: JSON.stringify(body),
        method: 'put',
        timeout: 40000,
        headers: headers
      }).then((response) => resolve(response)).catch((err) => {
        reject(err);
      });
    })
  },
  autocomplete: (url, body, currentState, custom, token) => {
    return new Promise((resolve, reject) => {
      if (cancel != undefined) {
        cancel('canceled');
      }
      let postUrl = custom ? custom + url : url;
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? token : currentState ? Http.token(currentState()) : ''
      };
      axios.get(
        postUrl,
        {
          params: body,
          timeout: 40000,
          headers: headers,
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        }
      ).then((response) => resolve(response))
        .catch((err) => {
          reject(err);
        });
    })
  },
  autocompletePost: (url, body, currentState, custom, token) => {
    return new Promise((resolve, reject) => {
      if (cancel != undefined) {
        cancel('canceled');
      }
      let postUrl = custom ? url : url;
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': token ? token : currentState ? Http.token(currentState()) : ''
      };
      axios({
        url: postUrl,
        method: 'post',
        data: JSON.stringify(body),
        timeout: 40000,
        headers: headers,
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      }
      ).then((response) => resolve(response))
        .catch((err) => {

        });
    })
  }
};

export default Http;
