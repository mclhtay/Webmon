import React from "react";
import PropTypes from "prop-types";
import pokemonsArray from "./pokemons";
import { handleViewportChange } from "../actions/utils";
import { connect } from "react-redux";
const Pokedex = ({ viewport: { viewport }, handleViewportChange }) => {
  const { pokemons } = pokemonsArray;

  const changeViewport = () => {
    handleViewportChange("main");
  };

  const dexEntries = pokemons.map((poke, index) => (
    <div key={index}>
      <h3 className="styled-font modal-header">
        {poke.pokemon.name[0].toUpperCase() + poke.pokemon.name.slice(1)}
      </h3>
      <div className="one-sprite">
        <img
          className="pokedex-sprite"
          src={
            "http://play.pokemonshowdown.com/sprites/ani/" +
            poke.pokemon.name +
            ".gif"
          }
          alt="pokemon sprite"
        />
        <div>
          <h4 className="styled-font">
            Location:{" "}
            {poke.pokemon.class === "rare"
              ? "Obtained through event"
              : poke.pokemon.class[0].toUpperCase() +
                poke.pokemon.class.slice(1)}
          </h4>
          <h4 className="styled-font">
            Battle Power Potential:{" "}
            {poke.pokemon.potential[0] + " - " + poke.pokemon.potential[1]}
          </h4>
        </div>
      </div>
    </div>
  ));
  return (
    <div className={viewport === "pokedex" ? "modal-frame come-in" : "blind"}>
      <div className="modal-content">
        <h2 className="styled-font modal-title">Pokédex</h2>
        <span name="exit" className="close-modal" onClick={changeViewport}>
          &#10008;
        </span>
        {dexEntries}
      </div>
    </div>
  );
};

Pokedex.propTypes = {
  viewport: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
});

export default connect(mapStateToProps, { handleViewportChange })(Pokedex);
