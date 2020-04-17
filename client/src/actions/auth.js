import axios from "axios";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
} from "./constants";

export const registerAction = (username, password) => async (dispatch) => {
  username = username.toLowerCase();
  const header = {
    "Content-Type": "application/json",
  };
  const body = {
    username: username,
    password: password,
  };
  const res = await axios.post("/auth", body, header);
  const { data } = res;
  switch (data) {
    case "USER_FOUND":
      dispatch({
        type: REGISTER_FAIL,
        msg: "This name is registered already",
      });
      break;
    case "SUCCESS":
      dispatch({
        type: REGISTER_SUCCESS,
        name: username,
      });

      break;
    default:
      dispatch({
        type: REGISTER_FAIL,
        msg: "Cannot register at this time",
      });
  }
};

export const loginAction = (username, password) => async (dispatch) => {
  username = username.toLowerCase();
  const header = {
    "Content-Type": "application/json",
  };
  const body = {
    username: username,
    password: password,
  };
  const res = await axios.post("/auth/login", body, header);
  switch (res.data.data) {
    case "LOGIN_FAILED":
      dispatch({
        type: LOGIN_FAIL,
        msg: "Invalid Credentials",
      });
      break;
    case "LOGIN_SUCCESS":
      dispatch({
        type: LOGIN_SUCCESS,
        name: res.data.user.name,
        initialized: res.data.user.initialized,
        isAdmin: res.data.user.isAdmin,
      });

      break;
    default:
      dispatch({
        type: LOGIN_FAIL,
        msg: "Cannot log in at this time",
      });
  }
};
