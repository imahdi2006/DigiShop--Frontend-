import apiCleint from "./api-cleint";

const setAuthToken = (token) => {
  if (token) {
    apiCleint.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete apiCleint.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
