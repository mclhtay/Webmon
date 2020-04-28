import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
import pokemonArray from "./pokemons.js";
import {
  bagIncrease,
  changeDefaultP,
  changeCandy,
  abandonPokemon,
  changeCookie,
} from "../actions/game";
const Pokecenter = ({
  user: { name },
  player: { pokemons, candies, coins, defaultP, bagSize, cookies },
  viewport: { viewport },
  handleViewportChange,
  bagIncrease,
  changeDefaultP,
  changeCandy,
  abandonPokemon,
  changeCookie,
}) => {
  const [selectedMon, setSelectedMon] = useState(defaultP);
  const changeViewport = () => {
    setSelectedMon(defaultP);
    handleViewportChange("main");
  };
  const defaultStats = pokemons.filter(
    (mon) => mon.pokemon.name === selectedMon
  );
  const handleSelectedMon = (e) => {
    setSelectedMon(e.target.name);
  };
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

  const { level, exp, bp, potential } = defaultStats[0].pokemon;
  let inventory = pokemons.map((mon, index) => (
    <div className="col-lg-1 pokecenter-col" key={index}>
      <img
        name={mon.pokemon.name}
        onClick={(e) => handleSelectedMon(e)}
        className={
          mon.pokemon.name === selectedMon
            ? "defaultP pokecenter-sprite"
            : "pokecenter-sprite"
        }
        src={
          pokemonArray.pokemons.find(
            (poke) => poke.pokemon.name === mon.pokemon.name
          ).pokemon.sprite
        }
        alt="sprite"
      />
    </div>
  ));
  const handleBagIncrease = (e) => {
    bagIncrease(name);
  };
  const handleAccompany = () => {
    changeDefaultP(name, selectedMon);
  };
  const handleCandy = () => {
    changeCandy(name, selectedMon);
  };
  const handleAbandon = () => {
    if (
      window.confirm(
        "Are you sure you want to abandon " +
          selectedMon[0].toUpperCase() +
          selectedMon.slice(1) +
          " ? \nThis cannot be un-done!"
      )
    ) {
      abandonPokemon(name, selectedMon);
      setSelectedMon(defaultP);
    }
  };
  const handleCookie = () => {
    changeCookie(name, selectedMon);
  };
  return (
    <div
      className={viewport === "pokecenter" ? "modal-frame come-in" : "blind"}
    >
      <div className="modal-content">
        <h3 className="modal-title styled-font">Pokécenter</h3>
        <h6>Note* Cookies now have a 10% success rate</h6>
        <span name="exit" className="close-modal" onClick={changeViewport}>
          &#10008;
        </span>
        <div className="row">
          <div className="col-lg-4 pokecenter-left-pane" id="left-pane">
            <p className="styled-font">
              <span id="defaultp">
                {selectedMon.charAt(0).toUpperCase() + selectedMon.slice(1)}
              </span>{" "}
              <br />
              <img
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  selectedMon +
                  ".gif"
                }
                alt="selected pokemon"
              />
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
              <span id="potential">Potential:</span> {potential}&nbsp;&nbsp;
              <span id="bp">BP:</span> {bp}
            </p>
            <div className="pokecenter-left-button-div">
              <button
                className="btn home-button btn-info "
                disabled={selectedMon === defaultP}
                onClick={handleAccompany}
              >
                Accompany
              </button>
              <button
                disabled={cookies <= 0}
                onClick={handleCookie}
                className="btn home-button btn-success"
              >
                Use BP Cookie
              </button>
              <button
                onClick={handleAbandon}
                className="btn home-button btn-dark"
                disabled={defaultP === selectedMon}
              >
                Abandon
              </button>
            </div>
            <div className="pokecenter-left-button-div">
              <button
                onClick={handleCandy}
                className="btn home-button btn-warning"
                disabled={candies < (level * (level + 1)) / 2 || level === 100}
              >
                {level === 100 ? (
                  <span>Max Level</span>
                ) : (
                  <span>
                    {" "}
                    Use {(level * (level + 1)) / 2} Candies to Level Up
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="col-lg-8">
            <p>
              <i className="fas fa-coins" /> : {coins}{" "}
              <span style={{ padding: "0 2%" }} />
              <i className="fas fa-candy-cane" /> : {candies}
              <span style={{ padding: "0 2%" }} />
              <i className="fas fa-cookie-bite" /> {cookies}
              <span style={{ padding: "0 2%" }} /> Bag Size:{" "}
              {pokemons.length + "/" + bagSize}
              <button
                name="bag"
                onClick={(e) => handleBagIncrease(e)}
                type="button"
                className="btn home-button btn-dark"
                style={{ width: "inherit", margin: "auto 2%" }}
                disabled={coins < 500}
              >
                +10 for <i className="fas fa-coins" /> x500
              </button>
            </p>
            <div className="row">{inventory}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Pokecenter.propTypes = {
  player: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
  bagIncrease: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  changeDefaultP: PropTypes.func.isRequired,
  changeCandy: PropTypes.func.isRequired,
  abandonPokemon: PropTypes.func.isRequired,
  changeCookie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  viewport: state.viewport,
  user: state.user,
});

export default connect(mapStateToProps, {
  changeDefaultP,
  bagIncrease,
  handleViewportChange,
  changeCandy,
  abandonPokemon,
  changeCookie,
})(Pokecenter);
