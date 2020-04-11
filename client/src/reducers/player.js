import { PLAYER_INITIALIZED } from "../actions/constants";
const initialState = {
  nickname: "",
  gender: "",
  pokemons: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { nickname, gender, pokemons, type, loading } = action;
  switch (type) {
    case PLAYER_INITIALIZED:
      return {
        ...state,
        nickname: nickname,
        gender: gender,
        pokemons: pokemons,
        loading: loading,
      };
    case "PLAYER_LOADED":
      return {
        ...state,
        nickname: nickname,
        gender: gender,
        pokemons: pokemons,
        loading: false,
      };
    default:
      return state;
  }
}
