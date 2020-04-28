import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
import pokemonArray from "./pokemons.js";
import { battleFinish, reduceCoins, catchNewMon } from "../actions/game";
import onrouteBall from "./balls/onroute.jpg";
import gymBall from "./balls/gym.jpg";

const Champion = ({
  user,
  viewport: { viewport, secondary },
  player: { coins, defaultP, pokemons, bagSize },
  handleViewportChange,
  battleFinish,
  reduceCoins,
  catchNewMon,
}) => {
  const [opponent, setOpponent] = useState({
    oname: "pichu",
    obp: 0,
    orarity: "normal",
  });
  const { oname, obp, orarity } = opponent;
  const [reward, setResult] = useState({
    result: "defeat",
    rewardCoins: 0,
    rewardCandy: 0,
    rewardExp: 0,
  });
  const { rewardCoins, rewardCandy, result, rewardExp } = reward;
  const [rollRevealed, setRollRevealed] = useState(false);
  useEffect(() => {
    if (viewport === "champion")
      battleFinish(user.name, defaultP, rewardExp, rewardCoins, rewardCandy);
  }, [
    defaultP,
    battleFinish,
    rewardCoins,
    rewardCandy,
    rewardExp,
    user.name,
    viewport,
  ]);
  const defaultStats = pokemons.filter((mon) => mon.pokemon.name === defaultP);

  if (!defaultStats[0]) {
    defaultStats[0] = {
      pokemon: {
        name: "pichu",
        level: 0,
        exp: 0,
        potential: 0,
        bp: 0,
      },
    };
  }
  const { bp } = defaultStats[0].pokemon;
  const championMons = pokemonArray.pokemons.filter(
    (m) => m.pokemon.class === "champion"
  );
  const championMonSprites = championMons.map((mon, index) => (
    <div className="col-lg-1 ma" key={index}>
      <img
        height="75px"
        width="75px"
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
    setResult({
      result: "defeat",
      rewardCoins: 0,
      rewardCandy: 0,
      rewardExp: 0,
    });
    handleViewportChange("main", "");
  };

  const handleSecondaryViewport = (e) => {
    handleViewportChange("champion", e.currentTarget.name);
    if (e.currentTarget.name === "battle") {
      const randomOpponent =
        championMons[Math.floor(Math.random() * championMons.length)];
      const randomBPMultiplier = Math.floor(Math.random() * 3) + 32;
      const randomBP =
        Math.floor(
          Math.random() *
            (randomOpponent.pokemon.potential[1] -
              randomOpponent.pokemon.potential[0] +
              1)
        ) + randomOpponent.pokemon.potential[0];

      setOpponent({
        ...opponent,
        oname: randomOpponent.pokemon.name,

        obp: randomBPMultiplier * randomBP,
      });
    } else if (
      e.currentTarget.name === "catch" ||
      e.currentTarget.name === "roll-reset"
    ) {
      if (e.currentTarget.name === "roll-reset") {
        setRollRevealed(false);
      }
      reduceCoins(user.name, 600);
      const randomOpponent =
        championMons[Math.floor(Math.random() * championMons.length)];
      const randomBP =
        Math.floor(
          Math.random() *
            (randomOpponent.pokemon.potential[1] -
              randomOpponent.pokemon.potential[0] +
              1)
        ) + randomOpponent.pokemon.potential[0];
      const potentialRange =
        randomOpponent.pokemon.potential[1] -
        randomOpponent.pokemon.potential[0];

      if (
        (randomBP - randomOpponent.pokemon.potential[0]) / potentialRange >=
        0.9
      ) {
        setOpponent({
          oname: randomOpponent.pokemon.name,
          obp: randomBP,
          orarity: "rare",
        });
      } else {
        setOpponent({
          oname: randomOpponent.pokemon.name,
          obp: randomBP,
          orarity: "normal",
        });
      }
    } else if (e.currentTarget.name === "fight") {
      if (bp > obp || Math.floor(Math.random() * (obp - bp)) === 0) {
        setResult({
          ...reward,
          result: "victory",
          rewardCoins: Math.floor(Math.random() * 101) + 50,
          rewardCandy: Math.floor(Math.random() * 100) < 10 ? 1 : 0,
          rewardExp: bp > obp ? 100 : 100 + (obp - bp),
        });
      } else {
        setResult({
          ...reward,
          result: "defeat",
          rewardCoins: 0,
          rewardCandy: 0,
          rewardExp: 0,
        });
      }
    } else if (e.currentTarget.name === "main") {
      setRollRevealed(false);
    }
  };
  const handleRollReveal = (ff) => {
    if (ff === "None") {
      setRollRevealed(true);
    }
  };
  const handleCatch = () => {
    catchNewMon(user.name, oname, obp);
    handleViewportChange("champion", "postcatch");
  };

  return (
    <div className={viewport === "champion" ? "modal-frame come-in" : "blind"}>
      <div className="modal-content champion-modal">
        <div className="modal-foreground">
          <h3 className="modal-title styled-font">Champion</h3>
          <span className="close-modal" onClick={handleViewport} name="exit">
            &#10008;
          </span>
          <div className={secondary === "main" ? "come-in" : "blind"}>
            <p>
              You can advance to the "Legendary" difficulty when your highest BP
              reaches 3000
            </p>
            <p>
              You can Battle a random pokémon to gain exp and train your partner
              to become stronger, or you can Catch a random pokémon to join your
              team!
            </p>
            <p>
              *Note: when you Catch a pokémon, they always start at level 1, if
              you already own the pokémon, the option becomes "Merge", and the
              new pokémon will replace the old one
            </p>
            <h4>Pokémons that appear here: </h4>
            <div className="row">{championMonSprites}</div>
            <h4>Item drops: </h4>
            <i className="fas fa-coins" />: 100 - 150
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i className="fas fa-candy-cane" />: 10%
            <div>
              <button
                type="button"
                name="battle"
                className="mlr10 btn btn-sm btn-danger home-button"
                onClick={(e) => handleSecondaryViewport(e)}
              >
                Battle
              </button>

              <button
                type="button"
                name="catch"
                onClick={(e) => handleSecondaryViewport(e)}
                className="mlr10 btn btn-sm btn-warning home-button"
                disabled={coins < 600 || pokemons.length === bagSize}
              >
                {pokemons.length === bagSize ? (
                  "Bag Full"
                ) : (
                  <span>
                    Catch &nbsp;&nbsp;
                    <i className="fas fa-coins" /> 600
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className={secondary === "battle" ? "come-in" : "blind"}>
            <p className="leader-name">
              A wild {oname[0].toUpperCase() + oname.slice(1)} appeared!
            </p>
            <img
              height="100px"
              width="100px"
              src={
                "http://play.pokemonshowdown.com/sprites/ani/" + oname + ".gif"
              }
              alt="random opponent"
            />
            <span className="styled-font leader-name">BP: {obp}</span>
            <div>
              <button
                type="button"
                className="btn btn-sm btn-danger home-button mlr10"
                name="fight"
                onClick={(e) => handleSecondaryViewport(e)}
              >
                Fight
              </button>
              <button
                name="main"
                onClick={(e) => handleSecondaryViewport(e)}
                className="btn btn-sm btn-success home-button mlr10"
              >
                Run
              </button>
            </div>
          </div>
          <div className={secondary === "fight" ? "come-in" : "blind"}>
            {result === "victory" ? (
              <div>
                <h3 className="styled-font">Victory</h3>
                <img
                  className="ma"
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    defaultP +
                    ".gif"
                  }
                  alt="victory"
                />
                <span className="mlr10">Exp Gain: {rewardExp}</span>
                <p>
                  <i className="fas fa-coins" />: {rewardCoins}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i className="fas fa-candy-cane" />: {rewardCandy}
                </p>
                <div>
                  <button
                    name="battle"
                    type="button"
                    onClick={(e) => handleSecondaryViewport(e)}
                    className="btn btn-sm btn-danger mlr10 home-button"
                  >
                    Battle Again
                  </button>
                  <button
                    name="main"
                    type="button"
                    onClick={(e) => handleSecondaryViewport(e)}
                    className="btn btn-sm btn-success mlr10 home-button"
                  >
                    Back to Entrance
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="styled-font">Defeat</h3>
                <img
                  className="ma"
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    defaultP +
                    ".gif"
                  }
                  alt="victory"
                />
                <div>
                  <button
                    name="battle"
                    type="button"
                    onClick={(e) => handleSecondaryViewport(e)}
                    className="btn btn-sm btn-danger mlr10 home-button"
                  >
                    Battle Again
                  </button>
                  <button
                    name="main"
                    type="button"
                    onClick={(e) => handleSecondaryViewport(e)}
                    className="btn btn-sm btn-success mlr10 home-button"
                  >
                    Back to Entrance
                  </button>
                </div>
              </div>
            )}
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
                src={orarity === "normal" ? onrouteBall : gymBall}
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
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
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
              disabled={coins < 600 || pokemons.length === bagSize}
            >
              {pokemons.length === bagSize ? (
                "Bag Full"
              ) : (
                <span>
                  Catch another &nbsp;&nbsp; <i className="fas fa-coins" /> 600
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

Champion.propTypes = {
  battleFinish: PropTypes.func.isRequired,
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
  battleFinish,
  reduceCoins,
  catchNewMon,
  handleViewportChange,
})(Champion);
