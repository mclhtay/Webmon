import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
import { loadLeaderboard } from "../actions/game";
const Leaderboard = ({
  viewport: { viewport },
  handleViewportChange,
  loadLeaderboard,
}) => {
  useEffect(() => {
    if (loading) {
      loadLeaderboard();
    }
  });

  const changeViewport = () => {
    handleViewportChange("main");
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
});

export default connect(mapStateToProps, {
  handleViewportChange,
  loadLeaderboard,
})(Leaderboard);
