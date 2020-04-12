import axios from "axios";
import { PLAYER_INITIALIZED } from "./constants";

export const createPlayer = (initialData) => async (dispatch) => {
  const header = {
    "Content-Type": "application/json",
  };
  const res = await axios.post("/webmon", initialData, header);
  const {
    msg,
    nickname,
    gender,
    pokemons,
    totalBP,
    coins,
    defaultP,
    candies,
  } = res.data;
  if (msg === "Success") {
    await axios.put(`/auth/${initialData.username}`);
  }
  switch (msg) {
    case "Success":
      dispatch({
        type: PLAYER_INITIALIZED,
        nickname: nickname,
        gender: gender,
        pokemons: pokemons,
        totalBP: totalBP,
        coins: coins,
        defaultP: defaultP,
        loading: false,
        candies: candies,
        msg: "Done",
      });
      break;
    default:
      dispatch({
        type: "ERROR",
      });
  }
};

export const getPlayer = (username) => async (dispatch) => {
  const res = await axios.get(`/webmon/${username}`);
  const {
    nickname,
    gender,
    pokemons,
    totalBP,
    coins,
    defaultP,
    candies,
  } = res.data.content;
  dispatch({
    type: "PLAYER_LOADED",
    nickname: nickname,
    gender: gender,
    pokemons: pokemons,
    totalBP: totalBP,
    coins: coins,
    defaultP: defaultP,
    candies: candies,
  });
};
