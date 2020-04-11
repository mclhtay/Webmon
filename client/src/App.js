import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import store from "./store";
import Home from "./components/Home";
import Game from "./components/Game";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/webmon" component={Game} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
