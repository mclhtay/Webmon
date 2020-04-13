import { combineReducers } from "redux";
import user from "./user";
import player from "./player";
import viewport from "./viewport";
import leaderboard from "./leaderboard";
export default combineReducers({
  user,
  player,
  viewport,
  leaderboard,
});
