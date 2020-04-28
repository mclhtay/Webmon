import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./styles.css";
import { formAction } from "../actions/utils";
import { registerAction, loginAction } from "../actions/auth";
import { MSG } from "./Util";
const Home = ({
  user: { route, msg, status },
  formAction,
  registerAction,
  loginAction,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [rmb, setRMB] = useState(false);
  const { username, password } = formData;

  if (localStorage.getItem("webmon")) {
    const user = JSON.parse(localStorage.getItem("webmon"));
    loginAction(user.username, user.password);
  }

  const handleRMB = () => {
    setRMB(!rmb);
  };

  const routeHandler = (e) => {
    if (e.target.name !== route) {
      setFormData({
        username: "",
        password: "",
      });
    }

    formAction(e.target.name);
  };

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    route === "login"
      ? loginAction(username, password)
      : registerAction(username, password);
    // setFormData({
    //   username: "",
    //   password: "",
    // });
  };

  if (status === "success") {
    const user = {
      username: username,
      password: password,
    };
    if (rmb) {
      localStorage.setItem("webmon", JSON.stringify(user));
    }
    return <Redirect to="/webmon" />;
  }

  return (
    <div className="home-container">
      <h1 className="poke-font">WebMon</h1>
      <div className="home-redi">
        <ul className="nav nav-tabs">
          <li className="active">
            <a
              name="login"
              href="#log-in"
              data-toggle="tab"
              className={
                route === "login"
                  ? "btn btn-lg btn-light"
                  : "btn btn-lg btn-dark"
              }
              onClick={routeHandler}
            >
              Log In
            </a>
          </li>
          <li>
            <a
              name="signup"
              href="#sign-up"
              data-toggle="tab"
              className={
                route === "signup"
                  ? "btn btn-lg btn-light"
                  : "btn btn-lg btn-dark"
              }
              onClick={routeHandler}
            >
              Sign Up
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="log-in" className="tab-pane fade in active show">
            <form onSubmit={(e) => submitHandler(e)}>
              <h3 className="styled-font">
                Log In to Meet Your <span className="pokemon">Pokémon</span>
              </h3>
              {status === "fail" && <MSG message={msg} />}
              <input
                name="username"
                value={username}
                className="styled-font"
                placeholder="Username"
                required
                autoFocus
                onChange={formHandler}
                minLength="6"
              />
              <input
                name="password"
                value={password}
                className="styled-font"
                placeholder="Password"
                required
                onChange={formHandler}
                type="password"
                minLength="8"
              />
              <div>
                <input
                  type="checkbox"
                  style={{ display: "inline" }}
                  onChange={handleRMB}
                />{" "}
                <span>Remember Me</span>
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary home-button"
              >
                {route.toUpperCase()}
              </button>
            </form>
          </div>
          <div id="sign-up" className="tab-pane fade">
            <form onSubmit={(e) => submitHandler(e)}>
              <h3 className="styled-font">
                Sign Up, <span className="pokemon">Pokémon</span> Master!
              </h3>
              {status === "fail" && <MSG message={msg} />}
              <input
                name="username"
                value={username}
                className="styled-font"
                placeholder="Username"
                required
                autoFocus
                onChange={formHandler}
                minLength="6"
              />
              <input
                name="password"
                value={password}
                className="styled-font"
                placeholder="Password"
                required
                onChange={formHandler}
                type="password"
                minLength="8"
              />
              <button
                type="submit"
                className="btn btn-lg btn-primary home-button"
              >
                {route.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  formAction: PropTypes.func.isRequired,
  registerAction: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  user: state.user,
});

export default connect(mapStatetoProps, {
  formAction,
  loginAction,
  registerAction,
})(Home);
