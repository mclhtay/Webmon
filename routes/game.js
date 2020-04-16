const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Leaderboard = require("../models/Leaderboard");
// /webmon

const changeLeaderBoard = async (username, nickname, updatedBP, name) => {
  const leaderboard = await Leaderboard.findOne({ phase: "Beta" });
  const { first, second, third } = leaderboard;
  const newLeader = {
    username: username,
    nickname: nickname,
    BP: updatedBP,
    pokemon: name,
  };
  const unOrdered = [first, second, third, newLeader];

  for (let i = 0; i < unOrdered.length; i++) {
    for (let j = i + 1; j < unOrdered.length; j++) {
      if (unOrdered[j].BP > unOrdered[i].BP) {
        const temp = unOrdered[i];
        unOrdered[i] = unOrdered[j];
        unOrdered[j] = temp;
      }
    }
  }
  const ordered = [];
  ordered.push(unOrdered[0]);
  for (let i = 1; i < unOrdered.length; i++) {
    let found = false;
    for (let j = 0; j < ordered.length; j++) {
      if (ordered[j].username === unOrdered[i].username) {
        found = true;
      }
    }
    if (!found) {
      ordered.push(unOrdered[i]);
    }
  }
  await Leaderboard.findOneAndUpdate(
    { phase: "Beta" },
    { first: ordered[0], second: ordered[1], third: ordered[2] },
    { new: true }
  );
};

router.get("/:name", async (req, res) => {
  const player = await Player.findOne({ username: req.params.name });

  if (!player) {
    res.send({
      msg: "No Player",
    });
  } else {
    res.send({
      msg: "Yes Player",
      content: player,
    });
  }
});

router.post("/", async (req, res) => {
  const { username, nickname, gender, starter } = req.body;
  const randomPotential = Math.floor(Math.random() * 6) + 5;
  try {
    const player = new Player({
      username: username,
      nickname: nickname,
      gender: gender,
      pokemons: [
        {
          pokemon: {
            name: starter,
            bp: randomPotential,
            potential: randomPotential,
          },
        },
      ],
      totalBP: randomPotential,
      coins: 500,
      defaultP: starter,
      gifts: [
        {
          gift: {
            giftType: "Reward",
            giftContent: {
              coins: 10000,
              candies: 10,
            },
            giftMsg:
              "Thank you for registering! Here's your reward for being a beta tester!",
          },
        },
      ],
    });
    await player.save();
    res.send({
      msg: "Success",
      nickname: player.nickname,
      gender: player.gender,
      pokemons: player.pokemons,
      totalBP: player.totalBP,
      coins: player.coins,
      candies: player.candies,
      bagSize: player.bagSize,
      gifts: player.gifts,
    });
  } catch (error) {
    console.log(error);
    res.send({
      msg: "Error",
    });
  }
});

router.put("/:username/bag", async (req, res) => {
  try {
    const player = await Player.findOne({ username: req.params.username });
    const { bagSize, coins } = player;
    const updatedPlayer = await Player.findOneAndUpdate(
      { username: req.params.username },
      { bagSize: bagSize + 10, coins: coins - 500 },
      { new: true }
    );
    res.send({
      msg: "Updated",
      content: updatedPlayer,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:username/newMon", async (req, res) => {
  const { newMon } = req.body;
  try {
    const updatedPlayer = await Player.findOneAndUpdate(
      { username: req.params.username },
      {
        defaultP: newMon,
      },
      { new: true }
    );
    res.send({
      msg: "Updated",
      content: updatedPlayer,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:username/candy", async (req, res) => {
  const { mon } = req.body;
  try {
    const player = await Player.findOne({ username: req.params.username });
    let { candies, totalBP, pokemons, nickname } = player;
    let monToUpdated = pokemons.filter((m) => m.pokemon.name === mon);
    const index = pokemons.indexOf(monToUpdated[0]);

    const { potential, bp, level, name } = monToUpdated[0].pokemon;
    const updatedBP = bp + potential;
    monToUpdated[0].pokemon.name = name;
    monToUpdated[0].pokemon.potential = potential;
    monToUpdated[0].pokemon.level = level + 1;
    monToUpdated[0].pokemon.bp = updatedBP;
    monToUpdated[0].pokemon.exp = 0;
    pokemons[index] = monToUpdated[0];
    const updatedPlayer = await Player.findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        candies: candies - 1,
        totalBP: totalBP > updatedBP ? totalBP : updatedBP,
        pokemons: pokemons,
      },

      { new: true }
    );

    changeLeaderBoard(req.params.username, nickname, updatedBP, name);

    res.send({
      msg: "Updated",
      content: updatedPlayer,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:username/abandon", async (req, res) => {
  const { mon } = req.body;
  try {
    const player = await Player.findOne({ username: req.params.username });
    const { pokemons } = player;
    let monToDelete = pokemons.filter((m) => m.pokemon.name === mon);
    const index = pokemons.indexOf(monToDelete[0]);
    const newPokemons = pokemons
      .slice(0, index)
      .concat(pokemons.slice(index + 1));
    const content = await Player.findOneAndUpdate(
      { username: req.params.username },
      { pokemons: newPokemons },
      { new: true }
    );

    res.send({
      msg: "Updated",
      content: content,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:username/battle", async (req, res) => {
  try {
    const { mon, expGain, coinGain, candyGain } = req.body;
    const player = await Player.findOne({ username: req.params.username });
    const { candies, nickname, totalBP, coins, pokemons } = player;
    let monToUpdate = pokemons.filter((m) => m.pokemon.name === mon);
    const monIndex = pokemons.indexOf(monToUpdate[0]);
    const { exp, level, bp, potential } = monToUpdate[0].pokemon;
    let newExp = exp + expGain;
    let newLevel = level;
    let newBP = bp;
    let expRequiredToLevel = newLevel * 10 + (newLevel - 1) * 10;

    while (newExp >= expRequiredToLevel) {
      newLevel += 1;
      newExp = newExp - expRequiredToLevel;
      newBP = newBP + potential;
      expRequiredToLevel = newLevel * 10 + (newLevel - 1) * 10;
    }
    monToUpdate[0].pokemon.name = mon;
    monToUpdate[0].pokemon.potential = potential;
    monToUpdate[0].pokemon.exp = newExp;
    monToUpdate[0].pokemon.level = newLevel;
    monToUpdate[0].pokemon.bp = newBP;
    pokemons[monIndex] = monToUpdate[0];
    const content = await Player.findOneAndUpdate(
      { username: req.params.username },
      {
        pokemons: pokemons,
        candies: candies + candyGain,
        coins: coins + coinGain,
        totalBP: newBP > totalBP ? newBP : totalBP,
      },
      { new: true }
    );

    await changeLeaderBoard(req.params.username, nickname, newBP, mon);

    res.send({
      msg: "Updated",
      content: content,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:username/coins", async (req, res) => {
  try {
    const player = await Player.findOne({ username: req.params.username });
    const content = await Player.findOneAndUpdate(
      { username: req.params.username },
      { coins: player.coins - req.body.coinRed },
      { new: true }
    );
    res.send({
      msg: "Updated",
      content: content,
    });
  } catch (err) {
    console.log(err);
  }
});
router.put("/:username/catch", async (req, res) => {
  try {
    const { name, potential } = req.body;
    let player = await Player.findOne({ username: req.params.username });
    let monExists = player.pokemons.filter((m) => m.pokemon.name === name);
    let content = {};
    if (monExists.length > 0) {
      const index = player.pokemons.indexOf(monExists);
      monExists[0].pokemon.level = 1;
      monExists[0].pokemon.bp = potential;
      monExists[0].pokemon.potential = potential;
      monExists[0].pokemon.exp = 0;
      player.pokemons[index] = monExists[0];

      content = await Player.findOneAndUpdate(
        { username: req.params.username },
        {
          pokemons: player.pokemons,
          totalBP: player.totalBP > potential ? player.totalBP : potential,
        },
        { new: true }
      );
    } else {
      const pokemon = {
        name: name,
        potential: potential,
        bp: potential,
        level: 1,
        exp: 0,
      };

      content = await Player.findOneAndUpdate(
        { username: req.params.username },
        {
          $push: {
            pokemons: {
              pokemon,
            },
          },
          totalBP: player.totalBP > potential ? player.totalBP : potential,
        },
        { new: true }
      );
    }
    changeLeaderBoard(req.params.username, player.nickname, potential, name);

    res.send({
      msg: "Updated",
      content: content,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:username/gift", async (req, res) => {
  const player = await Player.findOne({ username: req.params.username });
  const { gifts, candies, coins } = player;

  const giftClaimed = gifts.filter((g) => g._id == req.body.id);
  const { giftType, giftContent } = giftClaimed[0].gift;
  let content = {};
  if (giftType === "Reward") {
    content = await Player.findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        $inc: { candies: giftContent.candies, coins: giftContent.coins },
        $pull: {
          gifts: { _id: giftClaimed[0]._id },
        },
      },
      { new: true }
    );
  } else if (giftType === "Pokemon") {
    const pokemon = {
      name: giftContent.name,
      potential: giftContent.bp,
      bp: giftContent.bp,
      level: 1,
      exp: 0,
    };
    content = await Player.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: {
          pokemons: {
            pokemon,
          },
        },
        $pull: {
          gifts: { _id: giftClaimed[0]._id },
        },
        totalBP:
          player.totalBP > giftContent.bp ? player.totalBP : giftContent.bp,
      },
      { new: true }
    );
    changeLeaderBoard(
      req.params.username,
      player.nickname,
      giftContent.bp,
      giftContent.name
    );
  }
  console.log(content.gifts);
  res.send({
    msg: "Updated",
    content: content,
  });
});
module.exports = router;
