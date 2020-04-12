import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pokedex from "./Pokedex";
import { handleViewportChange } from "../actions/utils";
const GameFrame = ({
  //   user: { name },
  player: { nickname, gender, defaultP, pokemons },
  handleViewportChange,
}) => {
  const handleViewPort = (viewportName) => {
    handleViewportChange(viewportName);
  };
  const defaultP_stats = pokemons.filter(
    (poke) => poke.pokemon.name === defaultP
  );
  const { exp, level, bp } = defaultP_stats[0].pokemon;
  const playerSprite =
    gender === "male"
      ? "https://media.tenor.com/images/63873f69c224c1a1910a08f92557b9e4/tenor.gif"
      : "https://i.pinimg.com/originals/12/73/8d/12738df3ec5eab7475fa470e1a42ae7f.gif";
  const defaultSprite =
    "http://play.pokemonshowdown.com/sprites/ani/" + defaultP + ".gif";

  return (
    <div>
      <div className=" row" id="game-frame">
        <div id="left-pane" className="col-lg-3 col-md-12 col-sm-12">
          <p className="styled-font">{nickname}</p>
          <img id="player-sprite" src={playerSprite} alt="player sprite" />
          <img id="defaultSprite" src={defaultSprite} alt="pokemon sprite" />
          <p className="styled-font">
            <span id="defaultp">
              {defaultP.charAt(0).toUpperCase() + defaultP.slice(1)}
            </span>{" "}
            <br />
            <span id="exp">Level: </span>
            {level} &nbsp;&nbsp; <span id="exp">Exp:</span> {exp}/{level * 10}{" "}
            <br />
            <span id="bp">BP:</span> {bp}
          </p>
        </div>
        <div id="right-pane" className="col-lg-9 col-md-12 col-sm-12">
          <div className="container ">
            <div className="col-lg-12 dark-overlay">
              <p className="styled-font">Webmon</p>
              <div className="row ">
                <div id="pokedex" className="col-lg-3 col-md-3 col-sm-3 banner">
                  <div className="banner-overlay">
                    {" "}
                    <span
                      name="pokedex"
                      className="opened"
                      onClick={(e) => handleViewPort("pokedex")}
                    >
                      Pokédex
                    </span>
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-3 col-sm-3 banner"
                  id="leaderboard"
                >
                  <div className="banner-overlay">
                    {" "}
                    <span
                      name="leaderboard"
                      onClick={(e) => handleViewPort("leaderboard")}
                      className="opened"
                    >
                      Leaderboard
                    </span>{" "}
                  </div>
                </div>
                <div
                  className="col-lg-3 col-md-3 col-sm-3 banner"
                  id="pokecenter"
                >
                  <div className="banner-overlay">
                    <span className="opened">Poké Center</span>
                  </div>
                </div>
              </div>
              <p className="styled-font">Battle Fields</p>
              <div className="row">
                <div id="onroute" className="col-lg-2 col-md-2 col-sm-2 banner">
                  <div className="banner-overlay">
                    <span className="opened">On Route</span>
                  </div>
                </div>
                <div id="gym" className="col-lg-2 col-md-2 col-sm-2 banner">
                  <div className="banner-overlay">
                    <span>Gym</span>
                  </div>
                </div>
                <div
                  id="champion"
                  className="col-lg-2 col-md-2 col-sm-2 banner"
                >
                  <div className="banner-overlay">
                    <span>Champion</span>
                  </div>
                </div>
                <div id="legend" className="col-lg-2 col-md-2 col-sm-2 banner">
                  <div className="banner-overlay">
                    <span>Legendary</span>
                  </div>
                </div>
              </div>
              <p className="styled-font">Event Fields</p>
              <div className="row">
                <div
                  id="event-mega-charizard"
                  className="col-lg-8 col-md-8 col-sm-8 banner"
                >
                  <span className="opened">
                    Limited Time Mega Charizard X Event
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pokedex />
    </div>
  );
};

GameFrame.propTypes = {
  player: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  user: state.user,
});

export default connect(mapStateToProps, { handleViewportChange })(GameFrame);
