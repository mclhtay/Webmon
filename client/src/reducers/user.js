import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ROUTE_CHANGE,
} from "../actions/constants";

const initialState = {
  name: "",
  status: "",
  route: "login",
  msg: "",
  initialized: false,
  isAdmin: false,
};

export default function (state = initialState, action) {
  const { name, type, route, msg, initialized, isAdmin } = action;
  switch (type) {
    case ROUTE_CHANGE:
      return {
        ...state,
        route: route,
        status: "",
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        status: "fail",
        msg: msg,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        name: name,
        status: "success",
        route: "register",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: name,
        status: "success",
        route: "login",
        initialized: initialized,
        isAdmin: isAdmin,
      };
    case "postMessage":
      return {
        ...state,
        status: "",
      };
    case "ADMIN":
      return {
        ...state,
        msg: msg,
      };
    default:
      return state;
  }
}
