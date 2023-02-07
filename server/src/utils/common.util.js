const formatResponse = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

const generateCode = (leng = 6) => {
  const random6Digits = Math.floor(Math.random() * Math.pow(10, leng));
  return String(random6Digits).padStart(leng, "0");
};

module.exports = {
  formatResponse,
  generateCode,
};
