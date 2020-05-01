const initialState = {
  loading: true,
  enickname: "",
  eone: {},
  etwo: {},
  ethree: {},
  ematched: {},
  equeue: [],
  eMP: 0,
  ranking: {
    rank: [],
    loading: true,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "NO_MASTER":
      return {
        ...initialState,
        loading: false,
      };
    case "YES_MASTER":
      return {
        ...initialState,
        loading: false,
        enickname: action.opp.nickname,
        eone: action.opp.one,
        etwo: action.opp.two,
        ethree: action.opp.three,
        ematched: action.opp.matchedTypes,
        equeue: action.opp.action,
        eMP: action.opp.MP,
      };
    case "RANKING_LOADED":
      return {
        ...initialState,
        ranking: {
          rank: action.content,
          loading: false,
        },
      };
    default:
      return initialState;
  }
}
