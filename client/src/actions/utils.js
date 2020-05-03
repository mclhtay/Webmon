import { ROUTE_CHANGE } from "./constants";
import Axios from "axios";

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

export const resetLDB = () => async (dispatch) => {
  await Axios.put("/webmon/ldb/reset");
};
