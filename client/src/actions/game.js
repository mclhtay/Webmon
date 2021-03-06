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
    bagSize,
    gifts,
    cookies,
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
        bagSize: bagSize,
        gifts: gifts,
        cookies: cookies,
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
    bagSize,
    gifts,
    cookies,
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
    bagSize: bagSize,
    gifts: gifts,
    cookies: cookies,
  });
};

export const loadLeaderboard = () => async (dispatch) => {
  const res = await axios.get("/leaderboard");
  if (res.data.msg) {
    dispatch({
      type: "LEADERBOARD_LOADED",
      content: res.data.data,
    });
  }
};

export const bagIncrease = (username) => async (dispatch) => {
  const res = await axios.put(`/webmon/${username}/bag`);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const changeDefaultP = (name, newMon) => async (dispatch) => {
  const body = {
    newMon: newMon,
  };
  const res = await axios.put(`/webmon/${name}/newMon`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const changeCandy = (name, mon) => async (dispatch) => {
  const body = {
    mon: mon,
  };
  const res = await axios.put(`/webmon/${name}/candy`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const changeCookie = (name, mon) => async (dispatch) => {
  const body = {
    mon: mon,
  };
  const res = await axios.put(`/webmon/${name}/cookie`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const abandonPokemon = (name, mon) => async (dispatch) => {
  const body = {
    mon: mon,
  };
  const res = await axios.put(`/webmon/${name}/abandon`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const battleFinish = (
  name,
  mon,
  expGain,
  coinGain,
  candyGain,
  cookieGain = 0
) => async (dispatch) => {
  const body = {
    mon: mon,
    expGain: expGain,
    coinGain: coinGain,
    candyGain: candyGain,
    cookieGain: cookieGain,
  };
  const res = await axios.put(`/webmon/${name}/battle`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const reduceCoins = (name, coinReduction) => async (dispatch) => {
  const body = {
    coinRed: coinReduction,
  };
  const res = await axios.put(`/webmon/${name}/coins`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const catchNewMon = (name, newMonName, newMonPotential) => async (
  dispatch
) => {
  const body = {
    name: newMonName,
    potential: newMonPotential,
  };
  const res = await axios.put(`/webmon/${name}/catch`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const claimGift = (name, giftID) => async (dispatch) => {
  const body = {
    id: giftID,
  };
  const res = await axios.put(`/webmon/${name}/gift`, body);
  const { msg, content } = res.data;
  if (msg === "Updated") {
    dispatch({
      type: "PLAYER_STAT_CHANGE",
      pokemons: content.pokemons,
      totalBP: content.totalBP,
      coins: content.coins,
      defaultP: content.defaultP,
      candies: content.candies,
      bagSize: content.bagSize,
      gifts: content.gifts,
      cookies: content.cookies,
    });
  }
};

export const submitCode = (code, name) => async (dispatch) => {
  const body = {
    code: code,
    name: name,
  };
  const res = await axios.put(`/webmon/code`, body);
  const { msg } = res.data;
  dispatch({
    type: "ADMIN",
    msg: msg,
  });
};
