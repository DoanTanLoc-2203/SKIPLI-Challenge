const axios = require("axios");

// Search github user by using API https://api.github.com/search/users
const search = async (payload) => {
  const config = {
    method: "get",
    url: "https://api.github.com/search/users",
    headers: {},
    params: payload,
  };
  return await axios(config);
};

// Get github user infomation by using API https://api.github.com/user/${id}
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
