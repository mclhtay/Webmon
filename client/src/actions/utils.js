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

export const handleViewportChange = (viewport) => (dispatch) => {
  dispatch({
    type: "VIEW_PORT_CHANGE",
    viewport: viewport,
  });
};
