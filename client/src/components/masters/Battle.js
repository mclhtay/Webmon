import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../../actions/utils";
import Spinner from "../spinner.gif";
import { initializeMaster, updateMaster } from "../../actions/master";
import atk from "./atk.jpg";
import dfs from "./dfs.jpg";
import spd from "./spd.jpg";
import ap from "./ap.jpg";
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
  updateMaster,
}) => {
  const [gameStats, setGameStats] = useState({
    one: {
      name: "one.name",
      atk: 0,
      dfs: 0,
      spd: 0,
      stars: 0,
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
      stars: 0,
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
      stars: 0,
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
      stars: 0,
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
      stars: 0,
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
      stars: 0,
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
  const [special, setSpecial] = useState(false);
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
            default:
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
            default:
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
          stars: one.stars,
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
          stars: two.stars,
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
          stars: three.stars,
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
          stars: eone.stars,
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
          stars: etwo.stars,
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
          stars: ethree.stars,
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
        equeue: equeue,
        activeTrait: activeTrait,
        eactiveTrait: eactiveTrait,
      });
    }
  }, [loading, secondary, viewport, gameSwitch]);
  const [inAnimation, setInAnimation] = useState(false);
  useEffect(() => {
    if (inAnimation === false) {
      if (
        gameStats.eone.currentHP === 0 &&
        gameStats.etwo.currentHP === 0 &&
        gameStats.ethree.currentHP === 0 &&
        gameSwitch
      ) {
        updateMaster(eMP, name, gameStats.queue, "won");
        handleViewportChange("master", "won");
      } else if (
        gameStats.one.currentHP === 0 &&
        gameStats.two.currentHP === 0 &&
        gameStats.three.currentHP === 0 &&
        gameSwitch
      ) {
        updateMaster(eMP, name, gameStats.queue, "lost");
        handleViewportChange("master", "lose");
      }
    }
  }, [inAnimation]);

  if (loading) {
    return (
      <div>
        <img src={Spinner} alt="loading" />
      </div>
    );
  }

  //summon arceus
  if (gameStats.ap === 5 && special === false) {
    const mons = [gameStats.one.name, gameStats.two.name, gameStats.three.name];
    if (
      mons.includes("palkia") &&
      mons.includes("giratina") &&
      mons.includes("dialga") &&
      gameStats.one.currentHP > 0 &&
      gameStats.two.currentHP > 0 &&
      gameStats.three.currentHP > 0
    ) {
      setSpecial(true);
    }
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

  const damageDealt = (starCount, power, a, d) => {
    return Math.floor((2 * starCount * 30) / 5 + (2 * power * a) / d / 50 + 2);
  };

  const changeStats = (mon, side, monMove) => {
    const myOne = gameStats.one,
      myTwo = gameStats.two,
      myThree = gameStats.three,
      theirOne = gameStats.eone,
      theirTwo = gameStats.etwo,
      theirThree = gameStats.ethree;

    let damage = 0;
    let msg = "";
    if (side === "me") {
      const theMove = monMove.effect.split(" ");
      const theBonus = mon.bonus
        ? mon.bonus.split(" ")
        : ["NO", "BONUS", "EXISTS", "OMG"];
      let mass = false;
      switch (theMove[0]) {
        case "T":
          switch (theMove[1]) {
            case "A":
              myOne.atk = myOne.atk + parseInt(theMove[2]);
              myTwo.atk = myTwo.atk + parseInt(theMove[2]);
              myThree.atk = myThree.atk + parseInt(theMove[2]);

              msg = `Team gained ${theMove[2]} Attack. `;
              break;
            case "D":
              myOne.dfs = myOne.dfs + parseInt(theMove[2]);
              myTwo.dfs = myTwo.dfs + parseInt(theMove[2]);
              myThree.dfs = myThree.dfs + parseInt(theMove[2]);
              msg = `Team gained ${theMove[2]} Defense. `;
              break;
            default:
              msg = "Nothing happened";
              break;
          }
          break;
        case "M":
          damage = parseInt(theMove[2]);
          mass = true;
          break;
        case "O":
          damage = parseInt(theMove[2]);
          break;
        default:
          msg = "Nothing happened";
          break;
      }
      switch (theBonus[1]) {
        case "T":
          switch (theBonus[2]) {
            case "A":
              const increaseAMT = parseInt(theBonus[3]);
              const chance =
                Math.floor(Math.random() * 100) + 1 <= parseInt(theBonus[4])
                  ? true
                  : false;
              myOne.atk = myOne.atk + (chance ? increaseAMT : 0);
              myTwo.atk = myTwo.atk + (chance ? increaseAMT : 0);
              myThree.atk = myThree.atk + (chance ? increaseAMT : 0);
              msg += chance
                ? `Team gained ${increaseAMT} Attack with trait bonus.`
                : "";
              break;
            case "H":
              myOne.currentHP =
                myOne.currentHP + parseInt(theBonus[3]) >= myOne.maxHP
                  ? myOne.maxHP
                  : myOne.currentHP + parseInt(theBonus[3]);
              myTwo.currentHP =
                myTwo.currentHP + parseInt(theBonus[3]) >= myTwo.maxHP
                  ? myTwo.maxHP
                  : myTwo.currentHP + parseInt(theBonus[3]);
              myThree.currentHP =
                myThree.currentHP + parseInt(theBonus[3]) >= myThree.maxHP
                  ? myThree.maxHP
                  : myThree.currentHP + parseInt(theBonus[3]);
              msg += `Team gained ${theBonus[3]} HP with trait bonus. `;
              break;
            default:
              break;
          }
          break;

        case "O":
          switch (theBonus[2]) {
            case "A":
              if (theirOne.currentHP > 0) {
                theirOne.atk =
                  theirOne.atk + parseInt(theBonus[3]) >= 0
                    ? theirOne.atk + parseInt(theBonus[3])
                    : 0;
              } else if (theirTwo.currentHP > 0) {
                theirTwo.atk =
                  theirTwo.atk + parseInt(theBonus[3]) >= 0
                    ? theirTwo.atk + parseInt(theBonus[3])
                    : 0;
              } else {
                theirThree.atk =
                  theirThree.atk + parseInt(theBonus[3]) >= 0
                    ? theirThree.atk + parseInt(theBonus[3])
                    : 0;
              }
              msg += `Decreased enemy attack by ${theBonus[3]}. `;
              break;
            case "C":
              const chance =
                Math.floor(Math.random() * 100) + 1 <= parseInt(theBonus[4])
                  ? true
                  : false;
              damage = chance ? damage * 2 : damage;
              msg += chance ? "The ability landed a critical hit. " : "";
              break;
            default:
              break;
          }
        default:
          break;
      }
      if (mass) {
        //see if is fairy
        if (theBonus[1] === "Fairy") {
          theirOne.currentHP =
            theirOne.currentHP - parseInt(theMove[2]) * mon.stars < 0
              ? 0
              : theirOne.currentHP - parseInt(theMove[2]) * mon.stars;
          theirTwo.currentHP =
            theirTwo.currentHP - parseInt(theMove[2]) * mon.stars < 0
              ? 0
              : theirTwo.currentHP - parseInt(theMove[2]) * mon.stars;
          theirThree.currentHP =
            theirThree.currentHP - parseInt(theMove[2]) * mon.stars < 0
              ? 0
              : theirThree.currentHP - parseInt(theMove[2]) * mon.stars;
          msg += `${
            theMove[2] * mon.stars
          } true damage was dealt to the enemy team`;
        } else {
          if (theBonus[1] === "Normal" || theBonus[2] === "C") {
            theirOne.currentHP =
              theirOne.bonus && theirOne.bonus.split(" ")[1] === "Ghost"
                ? theirOne.currentHP
                : theirOne.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirOne.dfs) <
                  0
                ? 0
                : theirOne.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirOne.dfs);
            theirTwo.currentHP =
              theirTwo.bonus && theirTwo.bonus.split(" ")[1] === "Ghost"
                ? theirTwo.currentHP
                : theirTwo.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs) <
                  0
                ? 0
                : theirTwo.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs);

            theirThree.currentHP =
              theirThree.bonus && theirThree.bonus.split(" ")[1] === "Ghost"
                ? theirThree.currentHP
                : theirThree.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirThree.dfs) <
                  0
                ? 0
                : theirThree.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirThree.dfs);
            msg += `Enemy team was damaged`;
          } else {
            theirOne.currentHP =
              theirOne.currentHP -
                damageDealt(mon.stars, damage, mon.atk, theirOne.dfs) <
              0
                ? 0
                : theirOne.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirOne.dfs);
            theirTwo.currentHP =
              theirTwo.currentHP -
                damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs) <
              0
                ? 0
                : theirTwo.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs);
            theirThree.currentHP =
              theirThree.currentHP -
                damageDealt(mon.stars, damage, mon.atk, theirThree.dfs) <
              0
                ? 0
                : theirThree.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirThree.dfs);
            msg += `Enemy team was damaged`;
          }
        }
      } else {
        if (theBonus[1] === "Fairy") {
          if (theirOne.currentHP > 0) {
            theirOne.currentHP =
              theirOne.currentHP - parseInt(theMove[2]) * mon.stars < 0
                ? 0
                : theirOne.currentHP - parseInt(theMove[2]) * mon.stars;
          } else if (theirTwo.currentHP > 0) {
            theirTwo.currentHP =
              theirTwo.currentHP - parseInt(theMove[2]) * mon.stars < 0
                ? 0
                : theirTwo.currentHP - parseInt(theMove[2]) * mon.stars;
          } else if (theirThree.currentHP > 0) {
            theirThree.currentHP =
              theirThree.currentHP - parseInt(theMove[2]) * mon.stars < 0
                ? 0
                : theirThree.currentHP - parseInt(theMove[2]) * mon.stars;
          }
          msg += `The enemy was dealt ${theMove[2] * mon.stars} true damage`;
        } else {
          if (theBonus[1] === "Normal" || theBonus[2] === "C") {
            if (theirOne.currentHP > 0) {
              theirOne.currentHP =
                theirOne.bonus && theirOne.bonus.split(" ")[1] === "Ghost"
                  ? theirOne.currentHP
                  : theirOne.currentHP -
                      damageDealt(mon.stars, damage, mon.atk, theirOne.dfs) <
                    0
                  ? 0
                  : theirOne.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirOne.dfs);
              if (theirOne.bonus && theirOne.bonus.split(" ")[1] === "Ghost") {
                msg += "The move was ineffective";
              } else
                msg += `The move dealt ${damageDealt(
                  mon.stars,
                  damage,
                  mon.atk,
                  theirOne.dfs
                )} damage to ${theirOne.name}`;
            } else if (theirTwo.currentHP > 0) {
              theirTwo.currentHP =
                theirTwo.bonus && theirTwo.bonus.split(" ")[1] === "Ghost"
                  ? theirTwo.currentHP
                  : theirTwo.currentHP -
                      damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs) <
                    0
                  ? 0
                  : theirTwo.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs);
              if (theirTwo.bonus && theirTwo.bonus.split(" ")[1] === "Ghost") {
                msg += "The move was ineffective";
              } else
                msg += `The move dealt ${damageDealt(
                  mon.stars,
                  damage,
                  mon.atk,
                  theirTwo.dfs
                )} damage to ${theirTwo.name}`;
            } else {
              theirThree.currentHP =
                theirThree.bonus && theirThree.bonus.split(" ")[1] === "Ghost"
                  ? theirThree.currentHP
                  : theirThree.currentHP -
                      damageDealt(mon.stars, damage, mon.atk, theirThree.dfs) <
                    0
                  ? 0
                  : theirThree.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirThree.dfs);
              if (
                theirThree.bonus &&
                theirThree.bonus.split(" ")[1] === "Ghost"
              ) {
                msg += "The move was ineffective";
              } else
                msg += `The move dealt ${damageDealt(
                  mon.stars,
                  damage,
                  mon.atk,
                  theirThree.dfs
                )} damage to ${theirThree.name}`;
            }
          } else {
            if (theirOne.currentHP > 0) {
              theirOne.currentHP =
                theirOne.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirOne.dfs) <
                0
                  ? 0
                  : theirOne.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirOne.dfs);
              msg += `Enemy was dealt ${damageDealt(
                mon.stars,
                damage,
                mon.atk,
                theirOne.dfs
              )} damage`;
            } else if (theirTwo.currentHP > 0) {
              theirTwo.currentHP =
                theirTwo.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs) <
                0
                  ? 0
                  : theirTwo.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirTwo.dfs);
              msg += `Enemy was dealt ${damageDealt(
                mon.stars,
                damage,
                mon.atk,
                theirTwo.dfs
              )} damage`;
            } else if (theirThree.currentHP > 0) {
              theirThree.currentHP =
                theirThree.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, theirThree.dfs) <
                0
                  ? 0
                  : theirThree.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, theirThree.dfs);
              msg += `Enemy was dealt ${damageDealt(
                mon.stars,
                damage,
                mon.atk,
                theirThree.dfs
              )} damage`;
            }
          }
        }
      }
    } else {
      const theMove = monMove.effect.split(" ");
      const theBonus = mon.bonus
        ? mon.bonus.split(" ")
        : ["NO", "BONUS", "EXISTS", "OMG"];

      let mass = false;
      switch (theMove[0]) {
        case "T":
          switch (theMove[1]) {
            case "A":
              theirOne.atk = theirOne.atk + parseInt(theMove[2]);
              theirTwo.atk = theirTwo.atk + parseInt(theMove[2]);
              theirThree.atk = theirThree.atk + parseInt(theMove[2]);

              msg = `Enemy team gained ${theMove[2]} Attack. `;
              break;
            case "D":
              theirOne.dfs = theirOne.dfs + parseInt(theMove[2]);
              theirTwo.dfs = theirTwo.dfs + parseInt(theMove[2]);
              theirThree.dfs = theirThree.dfs + parseInt(theMove[2]);
              msg = `Enemy team gained ${theMove[2]} Defense. `;
              break;
            default:
              msg = "Nothing happened";
              break;
          }
          break;
        case "M":
          damage = parseInt(theMove[2]);
          mass = true;
          break;
        case "O":
          damage = parseInt(theMove[2]);
          break;
        default:
          msg = "Nothing happened";
          break;
      }
      switch (theBonus[1]) {
        case "T":
          switch (theBonus[2]) {
            case "A":
              const increaseAMT = parseInt(theBonus[3]);
              const chance =
                Math.floor(Math.random() * 100) + 1 <= parseInt(theBonus[4])
                  ? true
                  : false;
              theirOne.atk = theirOne.atk + (chance ? increaseAMT : 0);
              theirTwo.atk = theirTwo.atk + (chance ? increaseAMT : 0);
              theirThree.atk = theirThree.atk + (chance ? increaseAMT : 0);
              msg += chance
                ? `Enemy team gained ${increaseAMT} Attack with trait bonus.`
                : "";
              break;
            case "H":
              theirOne.currentHP =
                theirOne.currentHP + parseInt(theBonus[3]) >= theirOne.maxHP
                  ? theirOne.maxHP
                  : theirOne.currentHP + parseInt(theBonus[3]);
              theirTwo.currentHP =
                theirTwo.currentHP + parseInt(theBonus[3]) >= theirTwo.maxHP
                  ? theirTwo.maxHP
                  : theirTwo.currentHP + parseInt(theBonus[3]);
              theirThree.currentHP =
                theirThree.currentHP + parseInt(theBonus[3]) >= theirThree.maxHP
                  ? theirThree.maxHP
                  : theirThree.currentHP + parseInt(theBonus[3]);
              msg += `Enemy team gained ${theBonus[3]} HP with trait bonus. `;
              break;
            default:
              break;
          }
          break;
        case "O":
          switch (theBonus[2]) {
            case "A":
              if (myOne.currentHP > 0) {
                myOne.atk =
                  myOne.atk + parseInt(theBonus[3]) >= 0
                    ? myOne.atk + parseInt(theBonus[3])
                    : 0;
              } else if (myTwo.currentHP > 0) {
                myTwo.atk =
                  myTwo.atk + parseInt(theBonus[3]) >= 0
                    ? myTwo.atk + parseInt(theBonus[3])
                    : 0;
              } else {
                myThree.atk =
                  myThree.atk + parseInt(theBonus[3]) >= 0
                    ? myThree.atk + parseInt(theBonus[3])
                    : 0;
              }
              msg += `Decreased your attack by ${theBonus[3]}. `;
              break;
            case "C":
              const chance =
                Math.floor(Math.random() * 100) + 1 <= parseInt(theBonus[4])
                  ? true
                  : false;
              damage = chance ? damage * 2 : damage;
              msg += chance ? "The ability landed a critical hit. " : "";
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      if (mass) {
        //see if is fairy
        if (theBonus[1] === "Fairy") {
          myOne.currentHP =
            myOne.currentHP - parseInt(theMove[2]) * mon.stars < 0
              ? 0
              : myOne.currentHP - parseInt(theMove[2]) * mon.stars;
          myTwo.currentHP =
            myTwo.currentHP - parseInt(theMove[2]) * mon.stars < 0
              ? 0
              : myTwo.currentHP - parseInt(theMove[2]) * mon.stars;
          myThree.currentHP =
            myThree.currentHP - parseInt(theMove[2]) * mon.stars < 0
              ? 0
              : myThree.currentHP - parseInt(theMove[2]) * mon.stars;
          msg += `${theMove[2] * mon.stars} true damage was dealt to your team`;
        } else {
          if (theBonus[1] === "Normal" || theBonus[2] === "C") {
            myOne.currentHP =
              myOne.bonus && myOne.bonus.split(" ")[1] === "Ghost"
                ? myOne.currentHP
                : myOne.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myOne.dfs) <
                  0
                ? 0
                : myOne.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myOne.dfs);
            myTwo.currentHP =
              myTwo.bonus && myTwo.bonus.split(" ")[1] === "Ghost"
                ? myTwo.currentHP
                : myTwo.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myTwo.dfs) <
                  0
                ? 0
                : myTwo.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myTwo.dfs);
            myThree.currentHP =
              myThree.bonus && myThree.bonus.split(" ")[1] === "Ghost"
                ? myThree.currentHP
                : myThree.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myThree.dfs) <
                  0
                ? 0
                : myThree.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myThree.dfs);
            msg += `Your team was damaged`;
          } else {
            myOne.currentHP =
              myOne.currentHP -
                damageDealt(mon.stars, damage, mon.atk, myOne.dfs) <
              0
                ? 0
                : myOne.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myOne.dfs);
            myTwo.currentHP =
              myTwo.currentHP -
                damageDealt(mon.stars, damage, mon.atk, myTwo.dfs) <
              0
                ? 0
                : myTwo.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myTwo.dfs);
            myThree.currentHP =
              myThree.currentHP -
                damageDealt(mon.stars, damage, mon.atk, myThree.dfs) <
              0
                ? 0
                : myThree.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myThree.dfs);
            msg += `Your team was damaged`;
          }
        }
      } else {
        if (theBonus[1] === "Fairy") {
          if (myOne.currentHP > 0) {
            myOne.currentHP =
              myOne.currentHP - parseInt(theMove[2]) * mon.stars < 0
                ? 0
                : myOne.currentHP - parseInt(theMove[2]) * mon.stars;
          } else if (myTwo.currentHP > 0) {
            myTwo.currentHP =
              myTwo.currentHP - parseInt(theMove[2]) * mon.stars < 0
                ? 0
                : myTwo.currentHP - parseInt(theMove[2]) * mon.stars;
          } else if (myThree.currentHP > 0) {
            myThree.currentHP =
              myThree.currentHP - parseInt(theMove[2]) * mon.stars < 0
                ? 0
                : myThree.currentHP - parseInt(theMove[2]) * mon.stars;
          }
          msg += `Your team was dealt ${theMove[2] * mon.stars} true damage`;
        } else {
          if (theBonus[1] === "Normal" || theBonus[2] === "C") {
            if (myOne.currentHP > 0) {
              myOne.currentHP =
                myOne.bonus && myOne.bonus.split(" ")[1] === "Ghost"
                  ? myOne.currentHP
                  : myOne.currentHP -
                      damageDealt(mon.stars, damage, mon.atk, myOne.dfs) <
                    0
                  ? 0
                  : myOne.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myOne.dfs);
              if (myOne.bonus && myOne.bonus.split(" ")[1] === "Ghost") {
                msg += "The move was ineffective";
              } else
                msg += `The move dealt ${damageDealt(
                  mon.stars,
                  damage,
                  mon.atk,
                  myOne.dfs
                )} damage to ${myOne.name}`;
            } else if (myTwo.currentHP > 0) {
              myTwo.currentHP =
                myTwo.bonus && myTwo.bonus.split(" ")[1] === "Ghost"
                  ? myTwo.currentHP
                  : myTwo.currentHP -
                      damageDealt(mon.stars, damage, mon.atk, myTwo.dfs) <
                    0
                  ? 0
                  : myTwo.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myTwo.dfs);
              if (myTwo.bonus && myTwo.bonus.split(" ")[1] === "Ghost") {
                msg += "The move was ineffective";
              } else
                msg += `The move dealt ${damageDealt(
                  mon.stars,
                  damage,
                  mon.atk,
                  myTwo.dfs
                )} damage to ${myTwo.name}`;
            } else {
              myThree.currentHP =
                myThree.bonus && myThree.bonus.split(" ")[1] === "Ghost"
                  ? myThree.currentHP
                  : myThree.currentHP -
                      damageDealt(mon.stars, damage, mon.atk, myThree.dfs) <
                    0
                  ? 0
                  : myThree.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myThree.dfs);
              if (myThree.bonus && myThree.bonus.split(" ")[1] === "Ghost") {
                msg += "The move was ineffective";
              } else
                msg += `The move dealt ${damageDealt(
                  mon.stars,
                  damage,
                  mon.atk,
                  myThree.dfs
                )} damage to ${myThree.name}`;
            }
          } else {
            if (myOne.currentHP > 0) {
              myOne.currentHP =
                myOne.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myOne.dfs) <
                0
                  ? 0
                  : myOne.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myOne.dfs);
              msg += `Enemy was dealt ${damageDealt(
                mon.stars,
                damage,
                mon.atk,
                myOne.dfs
              )} damage`;
            } else if (myTwo.currentHP > 0) {
              myTwo.currentHP =
                myTwo.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myTwo.dfs) <
                0
                  ? 0
                  : myTwo.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myTwo.dfs);
              msg += `Enemy was dealt ${damageDealt(
                mon.stars,
                damage,
                mon.atk,
                myTwo.dfs
              )} damage`;
            } else if (myThree.currentHP > 0) {
              myThree.currentHP =
                myThree.currentHP -
                  damageDealt(mon.stars, damage, mon.atk, myThree.dfs) <
                0
                  ? 0
                  : myThree.currentHP -
                    damageDealt(mon.stars, damage, mon.atk, myThree.dfs);
              msg += `Enemy was dealt ${damageDealt(
                mon.stars,
                damage,
                mon.atk,
                myThree.dfs
              )} damage`;
            }
          }
        }
      }
    }

    setGameStats({
      ...gameStats,
      one: myOne,
      two: myTwo,
      three: myThree,
      eone: theirOne,
      etwo: theirTwo,
      ethree: theirThree,
      ap: side === "me" ? gameStats.ap - monMove.p : gameStats.ap,
      eap: side !== "me" ? gameStats.eap - monMove.p : gameStats.eap,
    });
    return msg;
  };

  const continueGame = (m) => {
    let myMon,
      myMonMove,
      oMonMove,
      oMon = {};
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
          oMon = gameStats.eone;
          oMonMove = gameStats.eone.move;
          break;
        }
      } else if (n === 2) {
        if (
          gameStats.etwo.currentHP > 0 &&
          gameStats.eap >= gameStats.etwo.move.p
        ) {
          oMon = gameStats.etwo;
          oMonMove = gameStats.etwo.move;
          break;
        }
      } else {
        if (
          gameStats.ethree.currentHP > 0 &&
          gameStats.eap >= gameStats.ethree.move.p
        ) {
          oMon = gameStats.ethree;
          oMonMove = gameStats.ethree.move;
          break;
        }
      }
    }

    if (!oMonMove) {
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
                  setTimeout(() => {
                    setGameStats({
                      ...gameStats,
                      queue: queue,
                      equeue: equeue,
                      ap:
                        gameStats.ap - myMonMove.p + 1 > 5
                          ? 5
                          : gameStats.ap - myMonMove.p + 1,
                      eap:
                        gameStats.eap - oMonMove.p + 1 > 5
                          ? 5
                          : gameStats.eap - oMonMove.p + 1,
                      round: gameStats.round + 1,
                    });
                    setInAnimation(false);
                  }, 2000);
                }, 2000);
              }, 3000);
            } else {
              setTimeout(() => {
                setGameStats({
                  ...gameStats,
                  queue: queue,
                  equeue: equeue,
                  ap:
                    gameStats.ap - myMonMove.p + 1 > 5
                      ? 5
                      : gameStats.ap - myMonMove.p + 1,
                  eap: gameStats.eap + 1 > 5 ? 5 : gameStats.eap + 1,
                  round: gameStats.round + 1,
                });
                setInAnimation(false);
              }, 2000);
            }
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
                  setTimeout(() => {
                    setGameStats({
                      ...gameStats,
                      queue: queue,
                      equeue: equeue,
                      ap:
                        gameStats.ap - myMonMove.p + 1 > 5
                          ? 5
                          : gameStats.ap - myMonMove.p + 1,
                      eap:
                        gameStats.eap - oMonMove.p + 1 > 5
                          ? 5
                          : gameStats.eap - oMonMove.p + 1,
                      round: gameStats.round + 1,
                    });
                    setInAnimation(false);
                  }, 2000);
                }, 2000);
              }, 3000);
            } else {
              setTimeout(() => {
                setGameStats({
                  ...gameStats,
                  queue: queue,
                  equeue: equeue,
                  eap:
                    gameStats.eap - oMonMove.p + 1 > 5
                      ? 5
                      : gameStats.eap - oMonMove.p + 1,
                  ap: gameStats.ap + 1 > 5 ? 5 : gameStats.ap + 1,
                  round: gameStats.round + 1,
                });
                setInAnimation(false);
              }, 2000);
            }
          }, 2000);
        }, 3000);
      }, 3000);
    }
  };

  const handleMove = (e) => {
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

  const summonArceus = () => {
    const stars = Math.floor(
      (gameStats.one.stars + gameStats.two.stars + gameStats.three.stars) / 3
    );
    setGameStats({
      ...gameStats,
      one: {
        name: "arceus",
        atk: 120 * stars,
        dfs: 120 * stars,
        spd: 120 * stars,
        stars: stars,
        currentHP: 120 * stars,
        maxHP: 120 * stars,
        move: {
          name: "Judgement",
          effect: "M H 100",
          desc: "Arceus attacks the enemy team and deals damage",
          p: 0,
        },
        bonus: "D Normal",
      },
      two: {
        ...gameStats.two,
        currentHP: 0,
      },
      three: {
        ...gameStats.three,
        currentHP: 0,
      },
    });

    setSpecial(false);
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

      <div id="game" className={gameSwitch ? "come-in" : "blind"}>
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
              <div className={gameStats.two.currentHP > 0 ? "" : "blind"}>
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
              <div
                className={
                  gameStats.one.currentHP > 0 ? "first-member" : "blind"
                }
              >
                {genStars(one.stars)}
                <img
                  className={
                    gameStats.one.currentHP > 0
                      ? "team-member-sprite flip-img "
                      : "blind"
                  }
                  src={
                    "http://play.pokemonshowdown.com/sprites/ani/" +
                    gameStats.one.name +
                    ".gif"
                  }
                  alt={one.name}
                />
              </div>
              <div className={gameStats.three.currentHP > 0 ? "" : "blind"}>
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
              <div className={gameStats.etwo.currentHP > 0 ? "" : "blind"}>
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

              <div
                className={
                  gameStats.eone.currentHP > 0 ? "first-member-enemy" : "blind"
                }
              >
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
              <div className={gameStats.ethree.currentHP > 0 ? "" : "blind"}>
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
          <div className={special ? "come-in col-lg-12" : "blind"}>
            <button className="btn btn-sm btn-primary" onClick={summonArceus}>
              Summon Arceus
            </button>
          </div>
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
  updateMaster: PropTypes.func.isRequired,
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
  updateMaster,
})(Battle);
