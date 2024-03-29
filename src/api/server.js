import axios from "axios";
const root = 'http://127.0.0.1:4523/m1/4070463-0-default';

let all = async function () {
  const funcs = [...arguments];
  return new Promise((resolve, reject) => {
    axios
      .all(funcs)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// post请求
let post = async function (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url,
      baseURL: root,
      data: params,
      withCredentials: true,
      timeout: 600000,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// get请求
let get = async function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url,
      baseURL: root,
      withCredentials: true,
      params: params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// put请求
let put = async function (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url,
      baseURL: root,
      withCredentials: true,
      data: params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// put请求
let Delete = async function (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url,
      baseURL: root,
      withCredentials: true,
      params: params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const http = { all, post, get, put, Delete};
