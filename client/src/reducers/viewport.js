const initialState = {
  viewport: "main",
};

export default function (state = initialState, action) {
  const { type, viewport } = action;

  switch (type) {
    case "VIEW_PORT_CHANGE":
      return {
        ...state,
        viewport: viewport,
      };
    default:
      return state;
  }
}
