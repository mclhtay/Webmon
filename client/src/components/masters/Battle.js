import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../../actions/utils";
import Spinner from "../spinner.gif";
import { initializeMaster } from "../../actions/master";
import atk from "./atk.jpg";
import dfs from "./dfs.jpg";
import spd from "./spd.jpg";
import ap from "./ap.jpg";
import apd from "./apd.jpg";
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
import arceus from "./moves/arceus.gif";
import bulbasaur from "./moves/bulbasaur.gif";
import charizard from "./moves/charizard.gif";
import dialga from "./moves/dialga.gif";
import eevee from "./moves/eevee.gif";
import giratina from "./moves/giratina.gif";
import gyarados from "./moves/gyarados.gif";
import lucario from "./moves/lucario.gif";
import moltres from "./moves/moltres.gif";
import palkia from "./moves/palkia.gif";
import sylveon from "./moves/sylveon.gif";
import zaciancrowned from "./moves/zacian-crowned.gif";
import zacian from "./moves/zacian.gif";
import zamazentacrowned from "./moves/zamazenta-crowned.gif";
import zamazenta from "./moves/zamazenta.gif";
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
  const [gameStats, setGameStats] = useState({
    one: {
      name: "one.name",
      atk: 0,
      dfs: 0,
      spd: 0,
      currentHP: 0,
      maxHP: 0,
      move: {
        name: "Behemoth Bash",
        effect: "O H 100",
        desc: "Zamazenta attacks the enemy and deals damage",
        p: 3,
      },
      bonus: "",
    },
    two: {
      name: "two.name",
      atk: 0,
      dfs: 0,
      spd: 0,
      currentHP: 0,
      maxHP: 0,
      move: {
        name: "Behemoth Bash",
        effect: "O H 100",
        desc: "Zamazenta attacks the enemy and deals damage",
        p: 3,
      },
      bonus: "",
    },
    three: {
      name: "three.name",
      atk: 0,
      dfs: 0,
      spd: 0,
      currentHP: 0,
      maxHP: 0,
      move: {
        name: "Behemoth Bash",
        effect: "O H 100",
        desc: "Zamazenta attacks the enemy and deals damage",
        p: 3,
      },
      bonus: "",
    },
    ap: 3,
    eone: {
      name: "eone.name",
      atk: 0,
      dfs: 0,
      spd: 0,
      currentHP: 0,
      maxHP: 0,
      move: {
        name: "Behemoth Bash",
        effect: "O H 100",
        desc: "Zamazenta attacks the enemy and deals damage",
        p: 3,
      },
      bonus: "",
    },
    etwo: {
      name: "etwo.name",
      atk: 0,
      dfs: 0,
      spd: 0,
      currentHP: 0,
      maxHP: 0,
      move: {
        name: "Behemoth Bash",
        effect: "O H 100",
        desc: "Zamazenta attacks the enemy and deals damage",
        p: 3,
      },
      bonus: "",
    },
    ethree: {
      name: "ethree.name",
      atk: 0,
      dfs: 0,
      spd: 0,
      currentHP: 0,
      maxHP: 0,
      move: {
        name: "Behemoth Bash",
        effect: "O H 100",
        desc: "Zamazenta attacks the enemy and deals damage",
        p: 3,
      },
      bonus: "",
    },
    eap: 3,
    round: 1,
    activeTrait: [],
    eactiveTrait: [],
    queue: [],
    equeue: equeue,
  });
  const [gameSwitch, setGameSwitch] = useState(false);
  useEffect(() => {
    if (loading && secondary === "battle" && viewport === "master") {
      initializeMaster(one, two, three, name, nickname, matched);
    }
    if (!loading) {
      let activeTrait = [];
      let battleTrait = [];
      let eactiveTrait = [];
      let ebattleTrait = [];
      let hpB = 0,
        atkB = 0,
        dfsB = 0,
        spdB = 0,
        ehpB = 0,
        eatkB = 0,
        edfsB = 0,
        espdB = 0;
      Object.keys(matched).forEach((x) => {
        const trait = {};
        if (masters[x].req.length === 2) {
          if (matched[x] >= masters[x].req[1]) {
            trait.type = x;
            trait.bonus = masters[x].effect[1];
            activeTrait.push(trait);
          } else if (matched[x] >= masters[x].req[0]) {
            trait.type = x;
            trait.bonus = masters[x].effect[0];
            activeTrait.push(trait);
          }
        } else {
          if (matched[x] >= masters[x].req[0]) {
            trait.type = x;
            trait.bonus = masters[x].effect[0];
            activeTrait.push(trait);
          }
        }
      });
      activeTrait.forEach((x) => {
        const bonus = x.bonus.split(" ");
        if (bonus[0] === "B") {
          const bb = parseInt(bonus[3]);
          switch (bonus[2]) {
            case "H":
              hpB = bb;
              break;
            case "A":
              atkB = bb;
              break;
            case "D":
              dfsB = bb;
              break;
            case "S":
              spdB = bb;
              break;
          }
        } else {
          battleTrait.push(x);
        }
      });

      Object.keys(ematched).forEach((x) => {
        const trait = {};

        if (masters[x].req.length === 2) {
          if (ematched[x] >= masters[x].req[1]) {
            trait.type = x;
            trait.bonus = masters[x].effect[1];
            eactiveTrait.push(trait);
          } else if (ematched[x] >= masters[x].req[0]) {
            trait.type = x;
            trait.bonus = masters[x].effect[0];
            eactiveTrait.push(trait);
          }
        } else {
          if (ematched[x] >= masters[x].req[0]) {
            trait.type = x;
            trait.bonus = masters[x].effect[0];
            eactiveTrait.push(trait);
          }
        }
      });

      eactiveTrait.forEach((x) => {
        const bonus = x.bonus.split(" ");
        if (bonus[0] === "B") {
          const bb = parseInt(bonus[3]);
          switch (bonus[2]) {
            case "H":
              ehpB = bb;
              break;
            case "A":
              eatkB = bb;
              break;
            case "D":
              edfsB = bb;
              break;
            case "S":
              espdB = bb;
              break;
          }
        } else {
          ebattleTrait.push(x);
        }
      });
      setGameStats({
        ...gameStats,
        one: {
          name: one.name,
          atk: one.baseStats[1] + atkB,
          dfs: one.baseStats[2] + dfsB,
          spd: one.baseStats[3] + spdB,
          currentHP: one.baseStats[0] + hpB,
          maxHP: one.baseStats[0] + hpB,
          move: pokemonArray.pokemons.filter(
            (x) => x.pokemon.name === one.name
          )[0].pokemon.move,
          bonus:
            battleTrait.filter((x) => one.type.includes(x.type)).length > 0
              ? battleTrait.filter((x) => one.type.includes(x.type))[0].bonus
              : "",
        },
        two: {
          name: two.name,
          atk: two.baseStats[1] + atkB,
          dfs: two.baseStats[2] + dfsB,
          spd: two.baseStats[3] + spdB,
          currentHP: two.baseStats[0] + hpB,
          maxHP: two.baseStats[0] + hpB,
          move: pokemonArray.pokemons.filter(
            (x) => x.pokemon.name === two.name
          )[0].pokemon.move,
          bonus:
            battleTrait.filter((x) => two.type.includes(x.type)).length > 0
              ? battleTrait.filter((x) => two.type.includes(x.type))[0].bonus
              : "",
        },
        three: {
          name: three.name,
          atk: three.baseStats[1] + atkB,
          dfs: three.baseStats[2] + dfsB,
          spd: three.baseStats[3] + spdB,
          currentHP: three.baseStats[0] + hpB,
          maxHP: three.baseStats[0] + hpB,
          move: pokemonArray.pokemons.filter(
            (x) => x.pokemon.name === three.name
          )[0].pokemon.move,
          bonus:
            battleTrait.filter((x) => three.type.includes(x.type)).length > 0
              ? battleTrait.filter((x) => three.type.includes(x.type))[0].bonus
              : "".bonus,
        },
        ap: 3,
        eone: {
          name: eone.name,
          atk: eone.baseStats[1] + eatkB,
          dfs: eone.baseStats[2] + edfsB,
          spd: eone.baseStats[3] + espdB,
          currentHP: eone.baseStats[0] + ehpB,
          maxHP: eone.baseStats[0] + ehpB,
          move: pokemonArray.pokemons.filter(
            (x) => x.pokemon.name === eone.name
          )[0].pokemon.move,
          bonus:
            ebattleTrait.filter((x) => eone.type.includes(x.type)).length > 0
              ? ebattleTrait.filter((x) => eone.type.includes(x.type))[0].bonus
              : "".bonus,
        },
        etwo: {
          name: etwo.name,
          atk: etwo.baseStats[1] + eatkB,
          dfs: etwo.baseStats[2] + edfsB,
          spd: etwo.baseStats[3] + espdB,
          currentHP: etwo.baseStats[0] + ehpB,
          maxHP: etwo.baseStats[0] + ehpB,
          move: pokemonArray.pokemons.filter(
            (x) => x.pokemon.name === etwo.name
          )[0].pokemon.move,
          bonus:
            ebattleTrait.filter((x) => etwo.type.includes(x.type)).length > 0
              ? ebattleTrait.filter((x) => etwo.type.includes(x.type))[0].bonus
              : "".bonus,
        },
        ethree: {
          name: ethree.name,
          atk: ethree.baseStats[1] + eatkB,
          dfs: ethree.baseStats[2] + edfsB,
          spd: ethree.baseStats[3] + espdB,
          currentHP: ethree.baseStats[0] + ehpB,
          maxHP: ethree.baseStats[0] + ehpB,
          move: pokemonArray.pokemons.filter(
            (x) => x.pokemon.name === ethree.name
          )[0].pokemon.move,
          bonus:
            ebattleTrait.filter((x) => ethree.type.includes(x.type)).length > 0
              ? ebattleTrait.filter((x) => ethree.type.includes(x.type))[0]
                  .bonus
              : "".bonus,
        },
        eap: 3,
        round: 1,
        activeTrait: activeTrait,
        eactiveTrait: eactiveTrait,
      });
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
    eone,
    gameSwitch,
  ]);

  useEffect(() => {
    if (
      gameStats.eone.hp === 0 &&
      gameStats.etwo.hp === 0 &&
      gameStats.ethree.hp === 0
    ) {
      handleViewportChange("master", "won");
      console.log("Win");
    } else if (
      gameStats.one.hp === 0 &&
      gameStats.two.hp === 0 &&
      gameStats.three.hp === 0
    ) {
      handleViewportChange("master", "lost");
      console.log("Lost");
    }
  }, [
    gameStats.eone.currentHP,
    gameStats.etwo.currentHP,
    gameStats.ethree.currentHP,
    gameStats.one.currentHP,
    gameStats.two.currentHP,
    gameStats.three.currentHP,
  ]);

  const [inAnimation, setInAnimation] = useState(false);

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
    img.classList.add("testtt");
    img.src = imgName + "?a=" + Math.random();
    bg.appendChild(img);
    document.getElementById("test").appendChild(bg);
    window.setTimeout(() => {
      document.getElementById("test").removeChild(bg);
    }, 2000);
  };

  const genStars = (num) => {
    return (
      <span className="block">
        {Array.from(Array(num), (_, i) => (
          <img key={i} src={star} alt="action points" className="star" />
        ))}
      </span>
    );
  };
  const gameOn = () => {
    setGameSwitch(true);
  };
  const actionPoints = (num) => {
    if (num === 0) return <span>0</span>;
    return (
      <span className="">
        {Array.from(Array(num), (_, i) => (
          <img key={i} src={ap} alt="action points" className="star" />
        ))}
      </span>
    );
  };

  const mapTraitToImg = {
    dragon: dragon,
    fairy: fairy,
    fighting: fighting,
    fire: fire,
    flying: flying,
    ghost: ghost,
    grass: grass,
    normal: normal,
    poison: poison,
    steel: steel,
    water: water,
  };
  const mapMoveToImg = {
    arceus: arceus,
    bulbasaur: bulbasaur,
    charizard: charizard,
    dialga: dialga,
    eevee: eevee,
    giratina: giratina,
    gyarados: gyarados,
    lucario: lucario,
    moltres: moltres,
    palkia: palkia,
    sylveon: sylveon,
    "zacian-crowned": zaciancrowned,
    zacian: zacian,
    "zamazenta-crowned": zamazentacrowned,
    zamazenta: zamazenta,
  };

  const createAlert = (msg) => {
    const div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("alert-primary");
    div.classList.add("testtt");
    div.innerText = msg;
    const p = document.getElementById("notifications");
    p.appendChild(div);
    setTimeout(() => {
      p.removeChild(div);
    }, 2000);
  };

  const changeStats = (mon, side, monMove) => {
    if (side === "me") {
      const theMove = monMove.effect.split(" ");
      const theBonus = mon.bonus;
      console.log(theMove, theBonus);
    } else {
      const theMove = monMove.effect.split(" ");
      const theBonus = mon.bonus;
      console.log(theMove, theBonus);
    }
  };

  const continueGame = (m) => {
    console.log(inAnimation);
    let myMon, myMonMove, oMonMove, oMon;
    const tackle = {
      name: "Tackle",
      effect: "O H 45",
      desc: "Pokémon tackles the enemy",
      p: 0,
    };
    if (m === "tackle") {
      if (gameStats.one.currentHP > 0) {
        myMon = gameStats.one;
      } else if (gameStats.two.currentHP > 0) {
        myMon = gameStats.two;
      } else {
        myMon = gameStats.three;
      }
      myMonMove = tackle;
    } else {
      if (m === gameStats.one.name) {
        if (gameStats.ap < gameStats.one.move.p) {
          return;
        }
        myMon = gameStats.one;
        myMonMove = gameStats.one.move;
      } else if (m === gameStats.two.name) {
        if (gameStats.ap < gameStats.two.move.p) {
          return;
        }
        myMon = gameStats.two;
        myMonMove = gameStats.two.move;
      } else {
        if (gameStats.ap < gameStats.three.move.p) {
          return;
        }
        myMonMove = gameStats.three.move;
        myMon = gameStats.three;
      }
    }

    let equeue = gameStats.equeue,
      queue = gameStats.queue;
    queue.push(
      myMonMove === gameStats.one.move
        ? 1
        : myMonMove === gameStats.two.move
        ? 2
        : myMonMove === gameStats.three.move
        ? 3
        : 0
    );
    while (equeue.length > 0) {
      const n = equeue.shift();
      if (n === 0) {
        if (gameStats.eone.currentHP > 0) oMon = gameStats.eone;
        else if (gameStats.etwo.currentHP > 0) oMon = gameStats.etwo;
        else oMon = gameStats.ethree;
        oMonMove = tackle;
        break;
      } else if (n === 1) {
        if (
          gameStats.eone.currentHP > 0 &&
          gameStats.eap >= gameStats.eone.move.p
        ) {
          oMonMove = gameStats.eone.move;
          break;
        }
      } else if (n === 2) {
        if (
          gameStats.etwo.currentHP > 0 &&
          gameStats.eap >= gameStats.etwo.move.p
        ) {
          oMonMove = gameStats.etwo.move;
          break;
        }
      } else {
        if (
          gameStats.ethree.currentHP > 0 &&
          gameStats.eap >= gameStats.ethree.move.p
        ) {
          oMonMove = gameStats.ethree.move;
          break;
        }
      }
    }
    if (!oMon) {
      oMonMove = tackle;
      oMon =
        gameStats.eone.currentHP > 0
          ? gameStats.eone
          : gameStats.etwo.currentHP > 0
          ? gameStats.etwo
          : gameStats.ethree;
      equeue = [1, 2, 3];
    }
    if (myMon.spd >= oMon.spd) {
      createAlert(
        nickname +
          "'s " +
          myMon.name[0].toUpperCase() +
          myMon.name.slice(1) +
          " used " +
          myMonMove.name
      );

      setTimeout(() => {
        move(mapMoveToImg[myMon.name]);
        setTimeout(() => {
          const msg = changeStats(myMon, "me", myMonMove);
          createAlert(msg);
          setTimeout(() => {
            if (oMon.currentHP > 0) {
              createAlert(
                enickname +
                  "'s " +
                  oMon.name[0].toUpperCase() +
                  oMon.name.slice(1) +
                  " used " +
                  oMonMove.name
              );
              setTimeout(() => {
                move(mapMoveToImg[oMon.name]);
                setTimeout(() => {
                  const msg = changeStats(oMon, "them", oMonMove);
                  createAlert(msg);
                }, 2000);
              }, 3000);
            }
            setTimeout(() => {
              setInAnimation(false);
            }, 5000);
          }, 2000);
        }, 3000);
      }, 3000);
    } else {
      createAlert(
        enickname +
          "'s " +
          oMon.name[0].toUpperCase() +
          oMon.name.slice(1) +
          " used " +
          oMonMove.name
      );

      setTimeout(() => {
        move(mapMoveToImg[oMon.name]);
        setTimeout(() => {
          const msg = changeStats(oMon, "them", oMonMove);
          createAlert(msg);
          setTimeout(() => {
            if (myMon.currentHP > 0) {
              createAlert(
                nickname +
                  "'s " +
                  myMon.name[0].toUpperCase() +
                  myMon.name.slice(1) +
                  " used " +
                  myMonMove.name
              );
              setTimeout(() => {
                move(mapMoveToImg[myMon.name]);
                setTimeout(() => {
                  const msg = changeStats(myMon, "me", myMonMove);
                  createAlert(msg);
                }, 2000);
              }, 3000);
            }
            setTimeout(() => {
              setInAnimation(false);
            }, 5000);
          }, 2000);
        }, 3000);
      }, 3000);
    }
  };

  const handleMove = (e) => {
    setInAnimation(true);
    switch (e) {
      case "one":
        if (gameStats.ap >= gameStats.one.move.p) {
          setInAnimation(true);
          continueGame(gameStats.one.name);
        }
        break;
      case "two":
        if (gameStats.ap >= gameStats.two.move.p) {
          setInAnimation(true);
          continueGame(gameStats.two.name);
        }
        break;
      case "three":
        if (gameStats.ap >= gameStats.three.move.p) {
          setInAnimation(true);
          continueGame(gameStats.three.name);
        }
        break;
      case "four":
        setInAnimation(true);
        continueGame("tackle");
        break;
      default:
        console.log("default");
    }
  };

  return (
    <div>
      <div id="test"></div>
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
          <div className="col-lg-5 col-sm-5">
            <h3 className="styled-font">{nickname}</h3>
            <div className="column left">
              <p>
                <span className="block">
                  {actionPoints(gameStats.ap)}
                  {gameStats.activeTrait.map((x, y) => (
                    <img
                      src={mapTraitToImg[x.type]}
                      alt={x.type}
                      key={y}
                      className="battle-trait-img"
                    />
                  ))}
                </span>
                {gameStats.two.name[0].toUpperCase() +
                  gameStats.two.name.slice(1)}
                :
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {gameStats.two.atk}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {gameStats.two.dfs}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {gameStats.two.spd}
                </span>
                HP: {gameStats.two.currentHP}/{gameStats.two.maxHP}
              </p>
              <p>
                {gameStats.one.name[0].toUpperCase() +
                  gameStats.one.name.slice(1)}
                :
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {gameStats.one.atk}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {gameStats.one.dfs}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {gameStats.one.spd}
                </span>
                HP: {gameStats.one.currentHP}/{gameStats.one.maxHP}
              </p>

              <p>
                {gameStats.three.name[0].toUpperCase() +
                  gameStats.three.name.slice(1)}
                :
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {gameStats.three.atk}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {gameStats.three.dfs}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {gameStats.three.spd}
                </span>{" "}
                HP: {gameStats.three.currentHP}/{gameStats.three.maxHP}
              </p>
            </div>
            <div className="column">
              <div>
                {genStars(two.stars)}
                <img
                  className={
                    gameStats.two.currentHP > 0
                      ? "team-member-sprite flip-img"
                      : "blind"
                  }
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    two.name +
                    ".gif"
                  }
                  alt={two.name}
                />
              </div>
              <div className="first-member">
                {genStars(one.stars)}
                <img
                  className={
                    gameStats.one.currentHP > 0
                      ? "team-member-sprite flip-img "
                      : "blind"
                  }
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    one.name +
                    ".gif"
                  }
                  alt={one.name}
                />
              </div>
              <div>
                {genStars(three.stars)}
                <img
                  className={
                    gameStats.three.currentHP > 0
                      ? "team-member-sprite flip-img"
                      : "blind"
                  }
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    three.name +
                    ".gif"
                  }
                  alt={three.name}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-sm-2">
            <h4>Round {gameStats.round}</h4>
            <div id="notifications" className="column"></div>
          </div>
          <div className="col-lg-5 col-sm-5">
            <h3 className="styled-font">{enickname}</h3>
            <div className="column right">
              <p>
                <span className="block">
                  {gameStats.eactiveTrait.map((x, y) => (
                    <img
                      src={mapTraitToImg[x.type]}
                      alt={x.type}
                      key={y}
                      className="battle-trait-img"
                    />
                  ))}
                  {actionPoints(gameStats.eap)}
                </span>
                HP: {gameStats.etwo.currentHP}/{gameStats.etwo.maxHP}
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {gameStats.etwo.atk}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {gameStats.etwo.dfs}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {gameStats.etwo.spd}
                </span>
                :{etwo.name[0].toUpperCase() + etwo.name.slice(1)}
              </p>{" "}
              <p>
                HP: {gameStats.eone.currentHP}/{gameStats.eone.maxHP}
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {gameStats.eone.atk}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {gameStats.eone.dfs}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {gameStats.eone.spd}
                </span>
                : {eone.name[0].toUpperCase() + eone.name.slice(1)}
              </p>
              <p>
                HP: {gameStats.ethree.currentHP}/{gameStats.ethree.maxHP}
                <span className="p0-20">
                  <img src={atk} alt="attack" className="battle-status-img" />{" "}
                  {gameStats.ethree.atk}
                </span>
                <span className="p0-20">
                  <img src={dfs} alt="defense" className="battle-status-img" />{" "}
                  {gameStats.ethree.dfs}
                </span>
                <span className="p0-20">
                  <img src={spd} alt="speed" className="battle-status-img" />{" "}
                  {gameStats.ethree.spd}
                </span>
                :{ethree.name[0].toUpperCase() + ethree.name.slice(1)}
              </p>
            </div>
            <div className="column center">
              <div>
                {genStars(etwo.stars)}
                <img
                  className={
                    gameStats.etwo.currentHP > 0
                      ? "enemy-member-sprite"
                      : "blind"
                  }
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    gameStats.etwo.name +
                    ".gif"
                  }
                  alt={etwo.name}
                />
              </div>

              <div className="first-member-enemy">
                {genStars(eone.stars)}
                <img
                  className={
                    gameStats.eone.currentHP > 0
                      ? "enemy-member-sprite "
                      : "blind"
                  }
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    eone.name +
                    ".gif"
                  }
                  alt={eone.name}
                />
              </div>
              <div>
                {genStars(ethree.stars)}
                <img
                  className={
                    gameStats.ethree.currentHP > 0
                      ? "enemy-member-sprite"
                      : "blind"
                  }
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
        </div>

        <div
          className={inAnimation ? "blind" : "row move-selection"}
          style={{ margin: "5% 0" }}
        >
          <div
            className={gameStats.one.currentHP > 0 ? "card col-lg-3" : "blind"}
            style={{ width: "15rem" }}
            onClick={() => handleMove("one")}
          >
            <div className="card-body">
              <div
                className={
                  gameStats.one.move.p > gameStats.ap
                    ? "dark-overlay3"
                    : "blind"
                }
              ></div>
              <h5 className="card-title">{gameStats.one.move.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Power: {gameStats.one.move.effect.split(" ")[2]}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Cost: {actionPoints(gameStats.one.move.p)}
              </h6>
              <p className="card-text">{gameStats.one.move.desc}</p>
            </div>
          </div>
          <div
            onClick={() => handleMove("two")}
            className={gameStats.two.currentHP > 0 ? "card col-lg-3" : "blind"}
            style={{ width: "15rem" }}
          >
            <div className="card-body">
              <div
                className={
                  gameStats.two.move.p > gameStats.ap
                    ? "dark-overlay3"
                    : "blind"
                }
              ></div>
              <h5 className="card-title">{gameStats.two.move.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Power: {gameStats.two.move.effect.split(" ")[2]}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Cost: {actionPoints(gameStats.two.move.p)}
              </h6>
              <p className="card-text">{gameStats.two.move.desc}</p>
            </div>
          </div>
          <div
            onClick={() => handleMove("three")}
            className={
              gameStats.three.currentHP > 0 ? "card col-lg-3" : "blind"
            }
            style={{ width: "15rem" }}
          >
            <div className="card-body">
              <div
                className={
                  gameStats.three.move.p > gameStats.ap
                    ? "dark-overlay3"
                    : "blind"
                }
              ></div>
              <h5 className="card-title">{gameStats.three.move.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Power: {gameStats.three.move.effect.split(" ")[2]}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Cost: {actionPoints(gameStats.three.move.p)}
              </h6>
              <p className="card-text">{gameStats.three.move.desc}</p>
            </div>
          </div>
          <div
            className="card col-lg-3"
            onClick={() => handleMove("four")}
            style={{ width: "15rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">Tackle</h5>
              <h6 className="card-subtitle mb-2 text-muted">Power: 45</h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Cost: {actionPoints(0)}
              </h6>
              <p className="card-text">The first available pokémon attacks</p>
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
