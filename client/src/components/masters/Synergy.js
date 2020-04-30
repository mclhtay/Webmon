import React from "react";
import masters from "./masters.json";
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
import pokemonArray from "../pokemons";
const Synergy = () => {
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

  const synergies = types.map((t, i) => (
    <div key={i} className="row giveMeSomeSpace">
      <div className="col-lg-4">
        <img src={t.type[1]} alt={t.type[0]} className="type-img" />
      </div>
      <div className="col-lg-8">
        <p>{t.type[2]}</p>
        <div className="row">
          {t.type[3].map((x, y) => (
            <div className="col-lg-2" key={y}>
              <img
                src={x.pokemon.sprite}
                alt={x.pokemon.name}
                title={x.pokemon.name}
                className="sprite-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ));
  return <div>{synergies}</div>;
};

export default Synergy;
