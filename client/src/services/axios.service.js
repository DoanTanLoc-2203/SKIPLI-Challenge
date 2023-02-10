import axios from "axios";
import qs from "qs";
import { checkPhoneExits } from "../helpers/validate";

// Get Endpoint API
let endpoint = process.env.REACT_APP_API_ENDPOINT;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  endpoint = "http://localhost:8080";
}

// Config post request
export const Post = (url, params, callback) => {
  // Check is logged in
  if (!checkPhoneExits()) window.location.href = "/login";
  const body = qs.stringify(params);
  return axios({
    method: "post",
    url: endpoint + url,
    headers: {},
    data: body,
  })
    .then((res) => {
      callback && callback(res?.data?.message, res?.status);
      return res.data;
    })
    .catch((error) => {
      errorHandle(error, callback);
    });
};

// Config get request
export const Get = (url, params, callback) => {
  // Check is logged in
  if (!checkPhoneExits()) window.location.href = "/login";
  return axios({
    method: "get",
    url: endpoint + url + "?",
    headers: {},
    params: params,
  })
    .then((res) => {
      callback && callback(res?.data?.message, res?.status);
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
