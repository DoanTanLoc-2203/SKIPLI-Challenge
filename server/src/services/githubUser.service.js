const axios = require("axios");

const search = async (payload) => {
  const config = {
    method: "get",
    url: "https://api.github.com/search/users",
    headers: {},
    params: payload,
  };
  return await axios(config);
};

const getUser = async (payload) => {
  const config = {
    method: "get",
    url: `https://api.github.com/user/${payload}`,
    headers: {},
  };
  return await axios(config);
};

module.exports = {
  search,
  getUser,
};
