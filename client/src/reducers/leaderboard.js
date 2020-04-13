const initialState = {
  loading: true,
  content: {},
};

export default function (state = initialState, action) {
  const { type, content } = action;

  switch (type) {
    case "LEADERBOARD_LOADED":
      return {
        ...state,
        loading: false,
        content: content,
      };
    case "CLOSE_LEADERBOARD":
      return {
        ...state,
        loading: true,
        content: {},
      };
    default:
      return state;
  }
}
