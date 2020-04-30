import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
const NavBar = ({
  user: { route, name, isAdmin },
  player: { nickname, coins, candies, cookies },
  handleViewportChange,
}) => {
  const handleSignout = (e) => {
    if (localStorage.getItem("webmon")) {
      localStorage.removeItem("webmon");
    }
  };
  const admin = () => {
    handleViewportChange("admin", "");
  };
  const news = () => {
    handleViewportChange("news", "");
  };

  const master = () => {
    handleViewportChange("master", "main");
  };

  return (
    <div className="game-nav">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <i className="navbar-brand" href="#">
          Webmon
        </i>
        <div className="pull-right">
          <ul className="navbar-nav mr-auto navbar-right">
            <li className="nav-item">
              <i className="nav-link">
                <button onClick={news} className="btn-sm btn btn-info">
                  News
                </button>
              </i>
            </li>
            <li>
              <i className="nav-link">
                <button onClick={master} className="btn btn-sm btn-warning">
                  Masters
                </button>
              </i>
            </li>

            {isAdmin && (
              <li className="nav-item">
                <i className="nav-link">
                  <button onClick={admin} className="btn-sm btn btn-dark">
                    Send Gift
                  </button>
                </i>
              </li>
            )}
            <li className="nav-item">
              <i className="nav-link">
                Welcome {route === "login" && "back"} {nickname}
              </i>
            </li>
            <li className="nav-item" title="coins">
              <i className="nav-link">
                <i className="fas fa-coins" /> {coins}
              </i>
            </li>
            <li className="nav-item" title="candies">
              <i className="nav-link">
                <i className="fas fa-candy-cane" /> {candies}
              </i>
            </li>

            <li className="nav-item" title="candies">
              <i className="nav-link">
                <i className="fas fa-cookie-bite" /> {cookies}
              </i>
            </li>

            <li className="nav-item" id="signout-btn">
              <form onSubmit={(e) => handleSignout(e)}>
                <button type="submit" className="btn btn-lg btn-primary">
                  Sign Out
                </button>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  player: state.player,
});

export default connect(mapStateToProps, { handleViewportChange })(NavBar);
