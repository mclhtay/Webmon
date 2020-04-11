import axios from "axios";
import { PLAYER_INITIALIZED, PLAYER_FINISHED } from "./constants";

// export const initialize = (username) => async (dispatch) => {
//   const res = await axios.get(`/webmon/${username}`);
//   const { msg, content } = res.data;
//   if (msg === "No Player") {
//     dispatch({
//       type: "PLAYER_NOT_INITIALIZE",
//     });
//   } else {
//     const { nickname, gender, pokemons } = content;
//     dispatch({
//       type: PLAYER_INITIALIZED,
//       nickname: nickname,
//       gender: gender,
//       pokemons: pokemons,
//     });
//   }
// };

export const createPlayer = (initialData) => async (dispatch) => {
  const header = {
    "Content-Type": "application/json",
  };
  const res = await axios.post("/webmon", initialData, header);
  const { msg, nickname, gender, pokemons } = res.data;
  if (msg === "Success") {
    const updated = await axios.put(`/auth/${initialData.username}`);
    console.log("hello");
    dispatch({
      type: PLAYER_FINISHED,
      initialized: true,
    });
  }
  console.log(msg);
  switch (msg) {
    case "Success":
      dispatch({
        type: PLAYER_INITIALIZED,
        nickname: nickname,
        gender: gender,
        pokemons: pokemons,
        loading: false,
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
  const { nickname, gender, pokemons } = res.data.content;
  dispatch({
    type: "PLAYER_LOADED",
    nickname: nickname,
    gender: gender,
    pokemons: pokemons,
  });
};
