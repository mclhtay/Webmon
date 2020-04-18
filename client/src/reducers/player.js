import { PLAYER_INITIALIZED } from "../actions/constants";
const initialState = {
  nickname: "",
  gender: "",
  pokemons: [],
  totalBP: 0,
  coins: 0,
  loading: true,
  defaultP: "",
  candies: 0,
  msg: "",
  bagSize: 0,
  cookies: 0,
  gifts: [],
};

export default function (state = initialState, action) {
  const {
    nickname,
    gender,
    pokemons,
    type,
    totalBP,
    coins,
    defaultP,
    candies,
    bagSize,
    gifts,
    cookies,
  } = action;
  switch (type) {
    case PLAYER_INITIALIZED:
      return {
        ...state,
        nickname: nickname,
        gender: gender,
        pokemons: pokemons,
        totalBP: totalBP,
        coins: coins,
        defaultP: defaultP,
        loading: false,
        candies: candies,
        bagSize: bagSize,
        gifts: gifts,
        cookies: cookies,
        msg: "Done",
      };
    case "PLAYER_LOADED":
      return {
        ...state,
        nickname: nickname,
        gender: gender,
        pokemons: pokemons,
        totalBP: totalBP,
        coins: coins,
        defaultP: defaultP,
        loading: false,
        bagSize: bagSize,
        candies: candies,
        cookies: cookies,
        gifts: gifts,
      };
    case "PLAYER_STAT_CHANGE":
      return {
        ...state,
        pokemons: pokemons,
        totalBP: totalBP,
        coins: coins,
        defaultP: defaultP,
        bagSize: bagSize,
        candies: candies,
        cookies: cookies,
        gifts: gifts,
      };
    case "NICKNAME_ERROR":
      return {
        ...state,
        msg: "Nickname Already Taken",
      };
    default:
      return state;
  }
}
