import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const NavBar = ({ user: { route }, player: { nickname, coins, candies } }) => {
  const handleSignout = (e) => {};

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
};

const mapStateToProps = (state) => ({
  user: state.user,
  player: state.player,
});

export default connect(mapStateToProps, {})(NavBar);

// export const connect(mapStateToProps, {})(NavBar) = (props) => {
//     return (
//       <div className="game-nav">
//         <ul>
//           <li>
//             <span>
//               Welcome {props.route === "login" && "back"} {props.name}
//             </span>
//           </li>
//         </ul>
//       </div>
//     );
//   };
