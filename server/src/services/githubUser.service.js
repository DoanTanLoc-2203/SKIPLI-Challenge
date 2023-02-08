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
  try {
    const config = {
      method: "get",
      url: `https://api.github.com/user/${payload}`,
      headers: {},
    };
    return await axios(config);
  } catch {
    return false;
  }
};

module.exports = {
  search,
  getUser,
};
