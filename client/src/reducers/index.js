import { combineReducers } from "redux";
import user from "./user";
import player from "./player";
import viewport from "./viewport";
export default combineReducers({
  user,
  player,
  viewport,
});
