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
import star from "./star.jpg";
import atk from "./atk.jpg";
import dfs from "./dfs.jpg";
import spd from "./spd.jpg";
import ap from "./ap.jpg";
const Master = ({
  viewport: { viewport, secondary },
  player: { pokemons },
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
  const [viewing, setViewing] = useState({
    name: "",
    level: 0,
    hp: 0,
    atk: 0,
    dfs: 0,
    spd: 0,
    type: [],
    move: {},
  });
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

  const playerOwned = pokemons.filter(
    (x) =>
      availableMons.filter(
        (y) => y.pokemon.name === x.pokemon.name && !y.pokemon.isSpecial
      ).length > 0
  );

  const actionPoints = (num) => {
    return <div>{Array(num).fill(<img src={ap} alt="action points" />)}</div>;
  };
  const handleShowCaseView = (e) => {
    const originalStats = pokemonArray.pokemons.filter(
      (x) => x.pokemon.name === e.currentTarget.dataset.name
    );
    const multipler =
      e.currentTarget.dataset.level < 60
        ? 1
        : e.currentTarget.dataset.level < 90
        ? 2
        : 3;
    const type = [];
    for (let i = 0; i < originalStats[0].pokemon.type.length; i++) {
      let name = originalStats[0].pokemon.type[i];
      type.push(types.filter((x) => x.type[0] === name)[0].type[1]);
    }
    setViewing({
      ...viewing,
      name: e.currentTarget.dataset.name,
      level: e.currentTarget.dataset.level,
      hp: originalStats[0].pokemon.stats["hp"] * multipler,
      atk: originalStats[0].pokemon.stats["atk"] * multipler,
      dfs: originalStats[0].pokemon.stats["dfs"] * multipler,
      spd: originalStats[0].pokemon.stats["spd"] * multipler,
      type: type,
      move: originalStats[0].pokemon.move,
    });
  };
  const handleViewport = (p, s) => {
    setViewing({
      name: "",
      level: 0,
    });
    handleViewportChange("main", "");
  };

  return (
    <div className={viewport === "master" ? "modal-frame come-in" : "blind"}>
      <div className="modal-content">
        <div className="modal-foreground">
          <span
            className="close-modal"
            onClick={() => handleViewport("main", "")}
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
          <div className={secondary === "prep" ? "come-in" : "blind"}>
            {viewing.name && (
              <div className="row" style={{ justifyContent: "center" }}>
                <div className="col-lg-2 column m5p">
                  <div
                    className={viewing.name !== "" ? "row" : "blind"}
                    name="show case bar"
                  >
                    {viewing.level < 60 ? (
                      <div className="ma">
                        {" "}
                        <img src={star} alt="star" className="star" />
                      </div>
                    ) : viewing.level < 90 ? (
                      <div className="ma">
                        <img src={star} alt="star" className="star" />
                        <img src={star} alt="star" className="star" />
                      </div>
                    ) : (
                      <div className="ma">
                        <img src={star} alt="star" className="star" />
                        <img src={star} alt="star" className="star" />
                        <img src={star} alt="star" className="star" />
                      </div>
                    )}
                  </div>
                  <img
                    src={
                      "http://play.pokemonshowdown.com/sprites/ani/" +
                      viewing.name +
                      ".gif"
                    }
                    alt={viewing.name}
                    className="ma type-img"
                  />
                  <div>
                    {viewing.type.map((x, y) => (
                      <img key={y} src={x} alt="type" className="bigger-star" />
                    ))}
                  </div>
                </div>

                <div className="column col-lg-1">
                  <h4 className="styled-font">
                    {viewing.name &&
                      viewing.name[0].toUpperCase() + viewing.name.slice(1)}
                  </h4>
                  <div>
                    <p>HP: {viewing.hp}</p>
                  </div>
                  <div>
                    <img src={atk} alt="attack" className="star" />{" "}
                    <p className="inline">{viewing.atk}</p>
                  </div>
                  <div>
                    <img src={dfs} alt="defense" className="star" />{" "}
                    <p className="inline">{viewing.dfs}</p>
                  </div>
                  <div>
                    <img src={spd} alt="speed" className="star" />{" "}
                    <p className="inline">{viewing.spd}</p>
                  </div>
                </div>

                <div className="col-lg-1 column">
                  <p>Ability: </p>
                </div>
              </div>
            )}

            <div className="row" name="prep section">
              <div className="col-lg-6" name="team "></div>
              <div className="col-lg-6" name="available">
                <div className="row">
                  {playerOwned.map((x, y) => (
                    <div
                      key={y}
                      className="col-lg-2"
                      data-name={x.pokemon.name}
                      data-level={x.pokemon.level}
                      onClick={(e) => handleShowCaseView(e)}
                    >
                      <img
                        src={
                          pokemonArray.pokemons.filter(
                            (z) => z.pokemon.name === x.pokemon.name
                          )[0].pokemon.sprite
                        }
                        className="sprite-img pokecenter-sprite"
                        alt={x.pokemon.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Master.propTypes = {
  viewport: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
  player: state.player,
});

export default connect(mapStateToProps, { handleViewportChange })(Master);
