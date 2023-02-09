import axios from "axios";
import qs from "qs";

export const Post = (url, params, callback) => {
  const body = qs.stringify(params);
  return axios({
    method: "post",
    url: "http://localhost:3000" + url,
    headers: {},
    data: body,
  })
    .then((res) => {
      callback && callback(res?.data?.message, res?.status)
      return res.data;
    })
    .catch((error) => {
      errorHandle(error, callback);
    });
};

export const Get = (url, params, callback) => {
  return axios({
    method: "get",
    url: process.env.REACT_APP_API_ENDPOINT + url + "?",
    headers: {},
    params: params,
  })
    .then((res) => {
      callback && callback(res?.data?.message, res?.status)
      return res.data;
    })
    .catch((error) => {
      errorHandle(error, callback);
    });
};

const errorHandle = (error, callback = () => {}) => {
  const { response } = error;
  callback && callback(response?.data?.message, response?.status);
};
