import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Pokedex from "./Pokedex";
import Leaderboard from "./Leaderboard";
import { handleViewportChange } from "../actions/utils";
import Pokecenter from "./Pokecenter";
import Onroute from "./Onroute";
import Gym from "./Gym";
import Champion from "./Champion";
import Legend from "./Legend";
import Event from "./Event";
import Gift from "./Gift";
import Admin from "./Admin";
import News from "./News";
import Event2 from "./Event2";
const GameFrame = ({
  //   user: { name },
  player: { nickname, gender, defaultP, pokemons, totalBP, gifts },
  handleViewportChange,
}) => {
  const handleViewPort = (viewportName) => {
    if (
      viewportName === "onroute" ||
      viewportName === "gym" ||
      viewportName === "champion" ||
      viewportName === "legend" ||
      viewportName === "event" ||
      viewportName === "event2"
    ) {
      handleViewportChange(viewportName, "main");
    } else handleViewportChange(viewportName);
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
      {/* <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Hey {nickname}!</strong> Check out the Masters Beta
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
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
            {level} &nbsp;&nbsp; <span id="exp">Exp:</span>{" "}
            {level === 100 ? (
              <span>Max</span>
            ) : (
              <span>
                {exp}/{level * level * 100}{" "}
              </span>
            )}
            <br />
            <span id="bp">BP:</span> {bp}
          </p>
          <div
            onClick={(e) => handleViewPort("gift")}
            className={gifts.length > 0 ? "blink" : "blind"}
          >
            <i className="fas fa-gift"></i> You have {gifts.length} new{" "}
            {gifts && gifts.length > 1 ? "gifts!" : "gift!"}
          </div>
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
                    <span
                      className="opened"
                      onClick={(e) => handleViewPort("pokecenter")}
                    >
                      Poké Center
                    </span>
                  </div>
                </div>
              </div>
              <p className="styled-font">Battle Fields</p>
              <div className="row">
                <div id="onroute" className="col-lg-2 col-md-2 col-sm-2 banner">
                  <div className="banner-overlay">
                    <span
                      onClick={(e) => handleViewPort("onroute")}
                      className="opened"
                    >
                      On Route
                    </span>
                  </div>
                </div>
                <div id="gym" className="col-lg-2 col-md-2 col-sm-2 banner">
                  <div className="banner-overlay">
                    <span
                      className={
                        totalBP >= 200 ? "opened enable-click" : "disable-click"
                      }
                      onClick={(e) => handleViewPort("gym")}
                    >
                      Gym
                    </span>
                  </div>
                </div>
                <div
                  id="champion"
                  className="col-lg-2 col-md-2 col-sm-2 banner"
                >
                  <div className="banner-overlay">
                    <span
                      className={
                        totalBP >= 1000
                          ? "opened enable-click"
                          : "disable-click"
                      }
                      onClick={(e) => handleViewPort("champion")}
                    >
                      Champion
                    </span>
                  </div>
                </div>
                <div id="legend" className="col-lg-2 col-md-2 col-sm-2 banner">
                  <div className="banner-overlay">
                    <span
                      className={
                        totalBP >= 3000
                          ? "opened enable-click"
                          : "disable-click"
                      }
                      onClick={(e) => handleViewPort("legend")}
                    >
                      Legendary
                    </span>
                  </div>
                </div>
              </div>
              <p className="styled-font">Event Fields</p>
              <div className="row">
                <div
                  id="event-mega-charizard"
                  className="col-lg-5 col-md-5 col-sm-5 banner"
                >
                  <span
                    className="opened enable-click"
                    onClick={(e) => handleViewPort("event")}
                  >
                    World Creation
                  </span>
                </div>
                <div
                  id="event-mewtwo"
                  className="col-lg-5 col-md-5 col-sm-5 banner"
                >
                  <div className="dark-overlay2">
                    <span
                      className="opened enable-click"
                      onClick={(e) => handleViewPort("event2")}
                    >
                      Sword and Shield
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Gift />
      <Pokedex />
      <Leaderboard />
      <Pokecenter />
      <Onroute />
      <Gym />
      <Champion />
      <Legend />
      <Event />
      <Event2 />
      <Admin />
      <News />
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
