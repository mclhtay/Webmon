import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
import pokemonArray from "./pokemons.js";
import { reduceCoins, catchNewMon } from "../actions/game";
import onrouteBall from "./balls/onroute.jpg";
import gymBall from "./balls/gym.jpg";
import championBall from "./balls/champion.jpg";
import masterBall from "./balls/legend.jpg";

const Event = ({
  user,
  viewport: { viewport, secondary },
  player: { coins, pokemons, bagSize },
  handleViewportChange,
  reduceCoins,
  catchNewMon,
}) => {
  const [opponent, setOpponent] = useState({
    oname: "pichu",
    obp: 0,
    orarity: "normal",
  });
  const { oname, obp, orarity } = opponent;
  const [rollRevealed, setRollRevealed] = useState(false);

  const championMons = pokemonArray.pokemons.filter(
    (m) => m.pokemon.class === "champion"
  );
  const gymMons = pokemonArray.pokemons.filter(
    (m) => m.pokemon.class === "gym"
  );
  const legendMons = pokemonArray.pokemons.filter(
    (m) => m.pokemon.class === "legend"
  );
  const onrouteMons = pokemonArray.pokemons.filter(
    (m) => m.pokemon.class === "onroute"
  );

  const eventMons = pokemonArray.pokemons.filter(
    (m) =>
      m.pokemon.class === "rare" &&
      m.pokemon.roll === "yes" &&
      m.pokemon.event === 1
  );
  const eventMonSprites = eventMons.map((mon, index) => (
    <div className="col-lg-1 ma" key={index}>
      <img
        height="120px"
        width="120px"
        src={
          "http://play.pokemonshowdown.com/sprites/ani/" +
          mon.pokemon.name +
          ".gif"
        }
        alt="sprite"
      />
    </div>
  ));

  const handleViewport = () => {
    setRollRevealed(false);
    handleViewportChange("main", "");
  };
  const handleSecondaryViewport = (e) => {
    handleViewportChange("event", e.currentTarget.name);
    if (e.currentTarget.name === "main") {
      setRollRevealed(false);
    } else if (
      e.currentTarget.name === "catch" ||
      e.currentTarget.name === "roll-reset"
    ) {
      if (e.currentTarget.name === "roll-reset") {
        setRollRevealed(false);
      }
      //38 + 25 + 20 + 10 = 93
      reduceCoins(user.name, 10000);
      const randomClassDeterminer = Math.floor(Math.random() * 100);
      let randomClass = "";
      let randomOpponent = {};
      if (randomClassDeterminer < 38) {
        randomClass = "onroute";
        randomOpponent =
          onrouteMons[Math.floor(Math.random() * onrouteMons.length)];
      } else if (randomClassDeterminer > 37 && randomClassDeterminer < 63) {
        randomClass = "gym";
        randomOpponent = gymMons[Math.floor(Math.random() * gymMons.length)];
      } else if (randomClassDeterminer > 62 && randomClassDeterminer < 83) {
        randomClass = "champion";
        randomOpponent =
          championMons[Math.floor(Math.random() * championMons.length)];
      } else if (randomClassDeterminer > 82 && randomClassDeterminer < 93) {
        randomClass = "legend";
        randomOpponent =
          legendMons[Math.floor(Math.random() * legendMons.length)];
      } else {
        randomClass = "event";
        const arceus = Math.floor(Math.random() * 10) === 4 ? true : false;
        randomOpponent = arceus
          ? eventMons[eventMons.length - 1]
          : eventMons[Math.floor(Math.random() * (eventMons.length - 1))];
      }
      const randomBP =
        Math.floor(
          Math.random() *
            (randomOpponent.pokemon.potential[1] -
              randomOpponent.pokemon.potential[0] +
              1)
        ) + randomOpponent.pokemon.potential[0];
      if (randomClass === "event") {
        setOpponent({
          oname: randomOpponent.pokemon.name,
          obp: randomBP,
          orarity: "master",
        });
      } else if (randomClass === "legend") {
        setOpponent({
          oname: randomOpponent.pokemon.name,
          obp: randomBP,
          orarity: "legend",
        });
      } else if (randomClass === "champion") {
        setOpponent({
          oname: randomOpponent.pokemon.name,
          obp: randomBP,
          orarity: "champion",
        });
      } else {
        setOpponent({
          oname: randomOpponent.pokemon.name,
          obp: randomBP,
          orarity: "normal",
        });
      }
    }
  };
  const handleRollReveal = (ff) => {
    if (ff === "None") {
      setRollRevealed(true);
    }
  };
  const handleCatch = () => {
    catchNewMon(user.name, oname, obp);
    handleViewportChange("event", "postcatch");
  };

  return (
    <div className={viewport === "event" ? "modal-frame come-in" : "blind"}>
      <div className="modal-content" id="event-mega-charizard">
        <div className="modal-foreground">
          <h3 className="modal-title styled-font">World Creation</h3>
          <span className="close-modal" onClick={handleViewport} name="exit">
            &#10008;
          </span>
          <div className={secondary === "main" ? "come-in" : "blind"}>
            <h5>
              Welcome to the Limited Time Sinnoh Region Legendaries catching
              event!
            </h5>
            <p>
              There is a chance that you can catch these event exclusive
              pokémons and surpass your competing trainers!
            </p>
            <h4>Event exclusives: </h4>
            <div className="row">{eventMonSprites}</div>
            <h4 className="giveMeSomeSpace">Rates: </h4>
            <div className="row">
              <div className="col-lg-2 ma">
                <img src={onrouteBall} alt="onrouteball" />
                <p>On Route: 38%</p>
              </div>
              <div className="col-lg-2 ma">
                <img src={onrouteBall} alt="onrouteball" />
                <p>Gym: 25%</p>
              </div>
              <div className="col-lg-2 ma">
                <img src={gymBall} alt="onrouteball" />
                <p>Champion: 20%</p>
              </div>
              <div className="col-lg-2 ma">
                <img src={championBall} alt="onrouteball" />
                <p>Legend: 10%</p>
              </div>
              <div className="col-lg-2 ma">
                <img src={masterBall} alt="masterball" />
                <p>Event: 7%</p>
              </div>
            </div>
            <p>
              *Note: when you Catch a pokémon, they always start at level 1, if
              you already own the pokémon, the option becomes "Merge", and the
              new pokémon will replace the old one
            </p>
            <div>
              <button
                type="button"
                name="catch"
                onClick={(e) => handleSecondaryViewport(e)}
                className="mlr10 btn btn-sm btn-warning home-button"
                disabled={coins < 10000 || pokemons.length === bagSize}
              >
                {pokemons.length === bagSize ? (
                  "Bag Full"
                ) : (
                  <span>
                    Catch &nbsp;&nbsp;
                    <i className="fas fa-coins" /> 10000
                  </span>
                )}
              </button>
            </div>
          </div>
          <div
            className={
              secondary === "catch" || secondary === "roll-reset"
                ? "come-in"
                : "blind"
            }
          >
            <div className="roll-ball-base">
              <img
                className={rollRevealed ? "blind" : "roll-ball"}
                src={
                  orarity === "normal"
                    ? onrouteBall
                    : orarity === "champion"
                    ? gymBall
                    : orarity === "legend"
                    ? championBall
                    : masterBall
                }
                alt="pokeball sprite"
                onClick={(e) => handleRollReveal("None")}
              />
              <div className={rollRevealed ? "" : "blind"}>
                <span className="styled-font roll-name">
                  {oname[0].toUpperCase() + oname.slice(1)}
                </span>
                <img
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    oname +
                    ".gif"
                  }
                  alt="revealed sprite"
                  className="come-in-big ma"
                />
                <span className="styled-font roll-bp">BP: {obp}</span>
                <div className="giveMeSomeSpace">
                  <button
                    onClick={handleCatch}
                    type="button"
                    className="btn btn-sm btn-warning home-button mlr10"
                    disabled={
                      !pokemons.find((m) => m.pokemon.name === oname) &&
                      pokemons.length === bagSize
                    }
                  >
                    {pokemons.find((m) => m.pokemon.name === oname)
                      ? "Merge"
                      : pokemons.length === bagSize
                      ? "Bag Full"
                      : "Keep"}
                  </button>
                  <button
                    name="main"
                    onClick={(e) => handleSecondaryViewport(e)}
                    type="button"
                    className="btn btn-sm btn-success home-button mlr10"
                  >
                    Back to Entrance
                  </button>
                </div>
                <div>
                  {pokemons.find((m) => m.pokemon.name === oname) && (
                    <p>
                      Your {oname[0].toUpperCase() + oname.slice(1)}'s BP
                      Potential:{" "}
                      {
                        pokemons.find((m) => m.pokemon.name === oname).pokemon
                          .potential
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={secondary === "postcatch" ? "come-in" : "blind"}>
            <h3 className="styled-font roll-bp">
              Congratulations on catching{" "}
              {oname[0].toUpperCase() + oname.slice(1)}!
            </h3>
            <button
              onClick={(e) => handleSecondaryViewport(e)}
              name="roll-reset"
              className="btn btn-sm btn-warning mlr10 home-button"
              disabled={coins < 10000 || pokemons.length === bagSize}
            >
              {pokemons.length === bagSize ? (
                "Bag Full"
              ) : (
                <span>
                  Catch another &nbsp;&nbsp; <i className="fas fa-coins" />{" "}
                  10000
                </span>
              )}
            </button>
            <button
              name="main"
              onClick={(e) => handleSecondaryViewport(e)}
              type="button"
              className="btn btn-sm btn-primary home-button mlr10"
            >
              Back to Entrance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Event.propTypes = {
  reduceCoins: PropTypes.func.isRequired,
  catchNewMon: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  player: state.player,
  viewport: state.viewport,
  user: state.user,
});
export default connect(mapStateToProps, {
  reduceCoins,
  catchNewMon,
  handleViewportChange,
})(Event);
