import React, { useState, useEffect } from "react";
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
import arceus from "./moves/arceus.gif";
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
      type: [],
    },
    two: {
      name: "",
      stars: 0,
      baseStats: [0, 0, 0, 0],
      type: [],
    },
    three: {
      name: "",
      stars: 0,
      baseStats: [0, 0, 0, 0],
      type: [],
    },
  });
  const [teamBox, setTeamBox] = useState({
    one: false,
    two: false,
    three: false,
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
    typeName: [],
    move: {},
    star: 0,
  });
  useEffect(() => {
    if (
      teamBox.one &&
      viewing.name !== two.name &&
      viewing.name !== three.name
    ) {
      setTeam({
        ...team,
        one: {
          name: viewing.name,
          stars: viewing.star,
          baseStats: [viewing.hp, viewing.atk, viewing.dfs, viewing.spd],
          type: viewing.typeName,
        },
      });
    } else if (
      teamBox.two &&
      viewing.name !== one.name &&
      viewing.name !== three.name
    ) {
      setTeam({
        ...team,
        two: {
          name: viewing.name,
          stars: viewing.star,
          baseStats: [viewing.hp, viewing.atk, viewing.dfs, viewing.spd],
          type: viewing.typeName,
        },
      });
    } else if (
      teamBox.three &&
      viewing.name !== one.name &&
      viewing.name !== two.name
    ) {
      setTeam({
        ...team,
        three: {
          name: viewing.name,
          stars: viewing.star,
          baseStats: [viewing.hp, viewing.atk, viewing.dfs, viewing.spd],
          type: viewing.typeName,
        },
      });
    }
  }, [viewing]);
  const [matched, setMatched] = useState({});
  useEffect(() => {
    const matchedTypes = {};
    one.type.forEach((x) =>
      matchedTypes[x] ? (matchedTypes[x] += 1) : (matchedTypes[x] = 1)
    );
    two.type.forEach((x) =>
      matchedTypes[x] ? (matchedTypes[x] += 1) : (matchedTypes[x] = 1)
    );
    three.type.forEach((x) =>
      matchedTypes[x] ? (matchedTypes[x] += 1) : (matchedTypes[x] = 1)
    );
    setMatched(matchedTypes);
  }, [team]);
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
    if (num === 0) return <span>0</span>;

    return (
      <div className="inline">
        {Array.from(Array(num), (_, i) => (
          <img key={i} src={ap} alt="action points" className="star" />
        ))}
      </div>
    );
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
      typeName: originalStats[0].pokemon.type,
      move: originalStats[0].pokemon.move,
      star: multipler,
    });
  };
  const handleViewport = (p, s) => {
    setViewing({
      ...viewing,
      name: "",
      level: 0,
    });
    setTeam({
      one: {
        name: "",
        stars: 0,
        baseStats: [0, 0, 0, 0],
        type: [],
      },
      two: {
        name: "",
        stars: 0,
        baseStats: [0, 0, 0, 0],
        type: [],
      },
      three: {
        name: "",
        stars: 0,
        baseStats: [0, 0, 0, 0],
        type: [],
      },
    });
    handleViewportChange("main", "");
  };

  const handleTeam = (e) => {
    setTeamBox({
      [e.currentTarget.id]: true,
    });
  };
  const kickMemberOut = (m) => {
    setTeam({
      ...team,
      [m]: {
        name: "",
        stars: 0,
        baseStats: [0, 0, 0, 0],
        type: [],
      },
    });
  };

  //replay one loop gif
  const testt = () => {

    let img = document.createElement("img");
    img.src = arceus + "?a=" + Math.random();
    document.getElementById("test").appendChild(img);
    window.setTimeout(() => {
      document.getElementById("test").removeChild(img);
    }, 3000);
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

{//TODO: Testing on making it foreground}
          <div id="test" className="testt"></div>

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

                <div className="column col-lg-1 m5p">
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

                <div className="col-lg-3 column m5p">
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{viewing.move.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Power: {viewing.move.effect.split(" ")[2]}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Cost: {actionPoints(viewing.move.p)}
                      </h6>
                      <p className="card-text">{viewing.move.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row giveMeSomeSpace" name="prep section">
              <div className="col-lg-3 column" name="team ">
                <p>Your Team</p>
                <div
                  id="two"
                  className={teamBox.two ? "team-select" : "team-noselect"}
                  onClick={(e) => handleTeam(e)}
                >
                  {two.name !== "" ? (
                    <div>
                      <span onClick={() => kickMemberOut("two")}>&#10008;</span>
                      <img
                        src={
                          pokemonArray.pokemons.filter(
                            (x) => x.pokemon.name === two.name
                          )[0].pokemon.sprite
                        }
                        alt={two.name}
                        className="flip-img sprite-img"
                      />
                    </div>
                  ) : (
                    <p>2</p>
                  )}
                </div>
                <div
                  id="one"
                  className={teamBox.one ? "team-select" : "team-noselect"}
                  onClick={(e) => handleTeam(e)}
                >
                  {one.name !== "" ? (
                    <div>
                      <span onClick={() => kickMemberOut("one")}>&#10008;</span>
                      <img
                        src={
                          pokemonArray.pokemons.filter(
                            (x) => x.pokemon.name === one.name
                          )[0].pokemon.sprite
                        }
                        alt={one.name}
                        className="flip-img sprite-img"
                      />
                    </div>
                  ) : (
                    <p>1</p>
                  )}
                </div>
                <div
                  id="three"
                  className={teamBox.three ? "team-select" : "team-noselect"}
                  onClick={(e) => handleTeam(e)}
                >
                  {three.name !== "" ? (
                    <div>
                      <span onClick={() => kickMemberOut("three")}>
                        &#10008;
                      </span>
                      <img
                        src={
                          pokemonArray.pokemons.filter(
                            (x) => x.pokemon.name === three.name
                          )[0].pokemon.sprite
                        }
                        alt={three.name}
                        className="flip-img sprite-img"
                      />
                    </div>
                  ) : (
                    <p>3</p>
                  )}
                </div>
              </div>
              <div className="col-lg-3 column" name="synergies">
                <div id="syngergies">
                  {Object.keys(matched).length > 0 &&
                    Object.keys(matched).map((x, y) => (
                      <h4 key={y} className="styled-font">
                        {x[0].toUpperCase() + x.slice(1)}: {matched[x]}
                      </h4>
                    ))}
                </div>
                <button
                  className="btn btn-sm btn-warning"
                  disabled={!one.name || !two.name || !three.name}
                  onClick={testt}
                >
                  I'm Ready!
                </button>
              </div>
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
