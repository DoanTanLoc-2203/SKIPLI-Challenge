import { TWILLO_REGEX_PHONE } from "../constants/regex";

export const requiredError = (value, fieldName) => {
  return value && String(value).length > 0 ? null : `${fieldName} is required`;
};

export const formatPhoneError = (value, fieldName) => {
  return TWILLO_REGEX_PHONE.test(value) ? null : `${fieldName} is invalid`;
};

export const checkPhoneExits = () => {
  return !localStorage.getItem("phoneNumber") &&
    window.location.pathname !== "/login"
    ? false
    : true;
};
