const initialState = {
  viewport: "main",
  secondary: "",
};

export default function (state = initialState, action) {
  const { type, viewport, secondary } = action;

  switch (type) {
    case "VIEW_PORT_CHANGE":
      return {
        ...state,
        viewport: viewport,
        secondary: secondary,
      };
    default:
      return state;
  }
}
