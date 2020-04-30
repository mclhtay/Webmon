import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Synergy from "./Synergy";
import { handleViewportChange } from "../../actions/utils";
import masters from "./masters.json";
import pokemonArray from "../pokemons";
import dragon from "./dragon.jpg";
import fairy from "./fairy.jpg";
import fighting from "./fighting.jpg";
import fire from "./fire.jpg";
import flying from "./flying.jpg";
import ghost from "./ghost.jpg";
import grass from "./grass.jpg";
import normal from "./normal.jpg";
import poison from "./poison.jpg";
import steel from "./steel.jpg";
import water from "./water.jpg";

const Master = ({
  viewport: { viewport, secondary },
  handleViewportChange,
}) => {
  const [team, setTeam] = useState({
    one: {
      name: "",
      stars: 0,
      baseStats: [0, 0, 0, 0],
      beforeStats: [0, 0, 0, 0],
      duringStats: [0, 0, 0, 0],
    },
    two: {
      name: "",
      stars: 0,
      baseStats: [0, 0, 0, 0],
      beforeStats: [0, 0, 0, 0],
      duringStats: [0, 0, 0, 0],
    },
    three: {
      name: "",
      stars: 0,
      baseStats: [0, 0, 0, 0],
      beforeStats: [0, 0, 0, 0],
      duringStats: [0, 0, 0, 0],
    },
  });
  const { one, two, three } = team;
  const types = [
    { type: ["dragon", dragon] },
    { type: ["fairy", fairy] },
    { type: ["fighting", fighting] },
    { type: ["fire", fire] },
    { type: ["flying", flying] },
    { type: ["ghost", ghost] },
    { type: ["grass", grass] },
    { type: ["normal", normal] },
    { type: ["poison", poison] },
    { type: ["steel", steel] },
    { type: ["water", water] },
  ];
  const availableMons = pokemonArray.pokemons.filter((x) => x.pokemon.master);
  addDescToTypes();
  function addDescToTypes() {
    for (let i = 0; i < types.length; i++) {
      let typeName = types[i].type[0];
      types[i].type.push(masters[typeName].desc);
      const thisTypeMons = availableMons.filter(
        (x) =>
          !x.pokemon.isSpecial &&
          (x.pokemon.type[0] === typeName || x.pokemon.type[1] === typeName)
      );
      types[i].type.push(thisTypeMons);
    }
  }

  return (
    <div className={viewport === "master" ? "modal-frame come-in" : "blind"}>
      <div className="modal-content">
        <div className="modal-foreground">
          <span
            className="close-modal"
            onClick={() => handleViewportChange("main", "")}
            name="exit"
          >
            &#10008;
          </span>
          <div className={secondary === "main" ? "come-in" : "blind"}>
            <h3 className="modal-title styled-font">Master</h3>

            <div>
              Form your best team and gain Master Points through battle!
              <div className="giveMeSomeSpace">
                <button
                  className="btn btn-sm btn-warning home-btn"
                  onClick={() => handleViewportChange("master", "prep")}
                >
                  Edit Team & Ready to Battle
                </button>
                <button className="btn btn-sm btn-dark home-btn">
                  See Current Ranking
                </button>
              </div>
              <div>
                <h4 className="styled-font">Synergies</h4>
                <Synergy />
              </div>
            </div>
          </div>

          {/*prep screen */}
          <div className={secondary === "prep" ? "come-in" : "blind"}></div>
        </div>
      </div>
    </div>
  );
};

Master.propTypes = {
  viewport: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
});

export default connect(mapStateToProps, { handleViewportChange })(Master);
