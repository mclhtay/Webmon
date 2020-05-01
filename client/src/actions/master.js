import axios from "axios";

export const initializeMaster = (
  one,
  two,
  three,
  username,
  nickname,
  match
) => async (dispatch) => {
  const body = {
    one: one,
    two: two,
    three: three,
    username: username,
    nickname: nickname,
    match: match,
  };
  const res = await axios.post(`/webmon/master`, body);
  if (res.data.msg === "Done") {
    const ress = await axios.get(`/webmon/master/${username}`);

    if (ress.data.msg === "No") {
      dispatch({
        type: "NO_MASTER",
      });
    } else {
      dispatch({
        type: "YES_MASTER",
        opp: ress.data.opp,
      });
    }
  }
};

export const loadRanking = () => async (dispatch) => {
  const res = await axios.get("/webmon/master/ranking/load");
  console.log(res.data);
  dispatch({
    type: "RANKING_LOADED",
    content: res.data,
  });
};
