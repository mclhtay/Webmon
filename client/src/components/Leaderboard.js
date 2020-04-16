import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
import { loadLeaderboard } from "../actions/game";
import firstIcon from "./first.png";
import secondIcon from "./second.png";
import thirdIcon from "./third.png";
const Leaderboard = ({
  viewport: { viewport },
  handleViewportChange,
  loadLeaderboard,

  leaderboard: { loading, content },
}) => {
  useEffect(() => {
    if (loading && viewport === "leaderboard") {
      loadLeaderboard();
    }
  });

  const { first, second, third } = content[0]
    ? content[0]
    : { first: "None", second: "None", third: "None" };
  const changeViewport = () => {
    handleViewportChange("main", "leaderboard");
  };

  const eventPokemonName = "Charizard-megay";
  const eventPokemonSprite =
    "http://play.pokemonshowdown.com/sprites/ani/" +
    eventPokemonName.toLowerCase() +
    ".gif";

  return (
    <div
      className={viewport === "leaderboard" ? "modal-frame come-in" : "blind"}
    >
      <div className="modal-content" id="leaderboard-modal">
        <div className="leaderboard-foreground">
          <h2 className="styled-font modal-title">Leaderboard</h2>
          <span name="exit" className="close-modal" onClick={changeViewport}>
            &#10008;
          </span>
          <div className="row lbcontent">
            <div className="col-lg-6">
              <p>
                Top 3 trainers at the end of each day will receive the following
                reward:
              </p>
              <ol id="leaderboard-des">
                <li>
                  <span>
                    <i className="fas fa-coins" /> x 10000 and{" "}
                    <i className="fas fa-candy-cane" /> x 20{" "}
                  </span>
                </li>

                <li>
                  {" "}
                  <i className="fas fa-coins" /> x 5000 and{" "}
                  <i className="fas fa-candy-cane" /> x 10{" "}
                </li>

                <li>
                  {"  "} <i className="fas fa-coins" /> x 2500 and{" "}
                  <i className="fas fa-candy-cane" /> x 5{" "}
                </li>
              </ol>
            </div>
            <div className="col-lg-6">
              <p>
                At the end of the week, a special Pokémon will be distributed to
                the top players
              </p>
              <p>
                This week's Pokémon:
                <span className="special">{eventPokemonName}</span>
              </p>
              <img src={eventPokemonSprite} alt="event pokemon" />
            </div>
          </div>
          <div className="container leader-container">
            <div id="firstPlace" className="row leader-row">
              <div className="col-lg-10 leaders">
                <img
                  src={firstIcon}
                  alt="first place"
                  height="100px"
                  width="100px"
                />
                <div className="fit">
                  {first === "None" ? (
                    "No one is here yet"
                  ) : (
                    <p className="leader-font">
                      <span className="leader-name styled-font">
                        {first.nickname}
                      </span>
                      claimed with :
                      <img
                        src={
                          "http://play.pokemonshowdown.com/sprites/ani/" +
                          first.pokemon +
                          ".gif"
                        }
                        alt="pokemon"
                        height="60px"
                        width="60px"
                      />
                      <span className="styled-font leader-bp">
                        BP: {first.BP}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="row leader-row" id="secondPlace">
              <div className="col-lg-10 leaders">
                <img
                  src={secondIcon}
                  alt="second place"
                  height="100px"
                  width="100px"
                />
                <div className="fit">
                  {second === "None" ? (
                    "No one is here yet"
                  ) : (
                    <p className="leader-font">
                      <span className="leader-name styled-font">
                        {second.nickname}
                      </span>
                      claimed with :
                      <img
                        src={
                          "http://play.pokemonshowdown.com/sprites/ani/" +
                          second.pokemon +
                          ".gif"
                        }
                        alt="pokemon"
                        height="60px"
                        width="60px"
                      />
                      <span className="styled-font leader-bp">
                        BP: {second.BP}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="row leader-row" id="thirdPlace">
              <div className="col-lg-10 leaders">
                <img
                  src={thirdIcon}
                  alt="third place"
                  height="100px"
                  width="100px"
                />
                <div className="fit">
                  {third === "None" ? (
                    "No one is here yet"
                  ) : (
                    <p className="leader-font">
                      <span className="leader-name styled-font">
                        {third.nickname}
                      </span>
                      claimed with :
                      <img
                        src={
                          "http://play.pokemonshowdown.com/sprites/ani/" +
                          third.pokemon +
                          ".gif"
                        }
                        alt="pokemon"
                        height="60px"
                        width="60px"
                      />
                      <span className="styled-font leader-bp">
                        BP: {third.BP}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  viewport: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
  loadLeaderboard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, {
  handleViewportChange,
  loadLeaderboard,
})(Leaderboard);
