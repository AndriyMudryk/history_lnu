import cookies from "js-cookie";

import axiosInstance from "~/utils/axiosInstance";
import constants from "~/constants";
const TOKEN_NAME_HEADER = constants.TOKEN_NAME_HEADER;
const TOKEN_NAME_COOKIE = constants.TOKEN_NAME_COOKIE;

const token = cookies.get(TOKEN_NAME_COOKIE);
if (token) {
  axiosInstance.setAuthToken(TOKEN_NAME_HEADER, token);
} else {
  axiosInstance.resetAuthToken(TOKEN_NAME_HEADER);
}