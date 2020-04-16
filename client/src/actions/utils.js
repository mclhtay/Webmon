import { ROUTE_CHANGE } from "./constants";

export const formAction = (newRoute) => (dispatch) => {
  try {
    dispatch({
      type: ROUTE_CHANGE,
      route: newRoute,
    });
  } catch (error) {
    console.log(error);
  }
};

export const handleViewportChange = (viewport, specs = "") => (dispatch) => {
  dispatch({
    type: "VIEW_PORT_CHANGE",
    viewport: viewport,
    secondary: specs,
  });
  if (specs === "leaderboard") {
    dispatch({
      type: "CLOSE_LEADERBOARD",
    });
  }
};
