import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../../actions/utils";
import Spinner from "../spinner.gif";
import { initializeMaster } from "../../actions/master";
import atk from "./atk.jpg";
import dfs from "./dfs.jpg";
import spd from "./spd.jpg";

const Battle = ({
  one,
  two,
  three,
  matched,
  user: { name },
  player: { nickname },
  viewport: { viewport, secondary },
  master: { loading, eone, etwo, ethree, ematched, equeue, enickname, eMP },
  initializeMaster,
  handleViewportChange,
}) => {
  useEffect(() => {
    if (loading && secondary === "battle" && viewport === "master") {
      initializeMaster(one, two, three, name, nickname, matched);
    }
  }, [
    loading,
    secondary,
    viewport,
    initializeMaster,
    matched,
    name,
    nickname,
    one,
    two,
    three,
  ]);
  const [gameSwitch, setGameSwitch] = useState(false);
  if (loading) {
    return (
      <div>
        <img src={Spinner} alt="loading" />
      </div>
    );
  }

  //replay one loop gif
  const move = (imgName) => {
    let bg = document.createElement("div");
    bg.classList.add("testt");
    let img = document.createElement("img");
    img.src = imgName + "?a=" + Math.random();
    bg.appendChild(img);
    document.getElementById("test").appendChild(bg);
    window.setTimeout(() => {
      document.getElementById("test").removeChild(bg);
    }, 3000);
  };

  const gameOn = () => {
    setGameSwitch(true);
  };

  return (
    <div>
      {!enickname && !loading && secondary === "battle" ? (
        <div>
          {" "}
          <h1>There are no other players available</h1>{" "}
        </div>
      ) : (
        <div className={gameSwitch ? "blind" : ""}>
          <h1 className="styled-font">Match Found</h1>
          <div>
            <p>
              {enickname} MP: {eMP}{" "}
            </p>
          </div>
          <div>
            <button
              className="btn btn-sm btn-warning home-btn"
              onClick={gameOn}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      <div className={gameSwitch ? "come-in" : "blind"}>
        <div className="row">
          <div className="col-lg-5">
            <h3 className="styled-font">{nickname}</h3>
            <div className="column left">
              <p>
                {two.name[0].toUpperCase() + two.name.slice(1)}:
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {two.baseStats[1]}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {two.baseStats[2]}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {two.baseStats[3]}
                </span>
                HP: {two.baseStats[0]}/{two.baseStats[0]}
              </p>
              <p>
                {one.name[0].toUpperCase() + one.name.slice(1)}:
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {one.baseStats[1]}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {one.baseStats[2]}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {one.baseStats[3]}
                </span>
                HP: {one.baseStats[0]}/{one.baseStats[0]}
              </p>

              <p>
                {three.name[0].toUpperCase() + three.name.slice(1)}:
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {three.baseStats[1]}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {three.baseStats[2]}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {three.baseStats[3]}
                </span>{" "}
                HP: {three.baseStats[0]}/{three.baseStats[0]}
              </p>
            </div>
            <div className="column">
              <img
                className="team-member-sprite flip-img"
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  two.name +
                  ".gif"
                }
                alt={two.name}
              />
              <img
                className="team-member-sprite flip-img first-member"
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  one.name +
                  ".gif"
                }
                alt={one.name}
              />
              <img
                className="team-member-sprite flip-img"
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  three.name +
                  ".gif"
                }
                alt={three.name}
              />
            </div>
          </div>
          <div className="col-lg-2">
            <h4>Round 1</h4>
          </div>
          <div className="col-lg-5">
            <h3 className="styled-font">{enickname}</h3>
            <div className="column right">
              <p>
                HP: {etwo.baseStats[0]}/{etwo.baseStats[0]}
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {etwo.baseStats[1]}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {etwo.baseStats[2]}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {etwo.baseStats[3]}
                </span>
                :{etwo.name[0].toUpperCase() + etwo.name.slice(1)}
              </p>{" "}
              <p>
                HP: {eone.baseStats[0]}/{eone.baseStats[0]}
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {eone.baseStats[1]}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {eone.baseStats[2]}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {eone.baseStats[3]}
                </span>
                : {eone.name[0].toUpperCase() + eone.name.slice(1)}
              </p>
              <p>
                HP: {ethree.baseStats[0]}/{ethree.baseStats[0]}
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {ethree.baseStats[1]}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {ethree.baseStats[2]}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {ethree.baseStats[3]}
                </span>
                :{ethree.name[0].toUpperCase() + ethree.name.slice(1)}
              </p>
            </div>
            <div className="column right">
              <img
                className="enemy-member-sprite"
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  etwo.name +
                  ".gif"
                }
                alt={etwo.name}
              />
              <img
                className="enemy-member-sprite  first-member-enemy"
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  eone.name +
                  ".gif"
                }
                alt={eone.name}
              />
              <img
                className="enemy-member-sprite "
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  ethree.name +
                  ".gif"
                }
                alt={ethree.name}
              />
            </div>
          </div>
        </div>

        <div className="row move-selection">
          <div className="card col-lg-3" style={{ width: "15rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card col-lg-3" style={{ width: "15rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card col-lg-3" style={{ width: "15rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card col-lg-3" style={{ width: "15rem" }}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Battle.propTypes = {
  handleViewportChange: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired,
  master: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  initializeMaster: PropTypes.func.isRequired,
};

const mapStatToProps = (state) => ({
  viewport: state.viewport,
  master: state.master,
  player: state.player,
  user: state.user,
});

export default connect(mapStatToProps, {
  handleViewportChange,
  initializeMaster,
})(Battle);
