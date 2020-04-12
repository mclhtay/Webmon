import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import spinner from "./spinner.gif";
import InitializeComponent from "./InitializeComponent";
import { getPlayer } from "../actions/game";
import GameFrame from "./GameFrame";
const Game = ({
  user: { name, status, route, initialized },
  player: { nickname, loading, pokemons },
  getPlayer,
}) => {
  useEffect(() => {
    if (initialized && loading) {
      getPlayer(name);
    }
  });

  if (status !== "success") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {initialized ? (
        loading ? (
          <img src={spinner} alt="loading" />
        ) : (
          <div>
            <NavBar />
            <GameFrame />
          </div>
        )
      ) : (
        <InitializeComponent username={name} />
      )}
    </div>
  );
};

Game.propTypes = {
  user: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  getPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  player: state.player,
});

export default connect(mapStateToProps, { getPlayer })(Game);
