const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Leaderboard = require("../models/Leaderboard");
const Master = require("../models/Master");
const config = require("config");
// /webmon

const changeLeaderBoard = async (username, nickname, updatedBP, name) => {
  const bannedList = ["mewtwo-megay", "mewtwo-megax", "charizard-megax"];
  const ll = bannedList.filter((x) => x === name);
  if (bannedList.filter((x) => x === name).length !== 0) {
    return;
  }

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
              cookies: 0,
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
    if (monToUpdated[0].pokemon.level === 100) {
      res.send({
        msg: "Updated",
        content: player,
      });
      return;
    }
    const candiesRequired =
      (monToUpdated[0].pokemon.level * (monToUpdated[0].pokemon.level + 1)) / 2;
    if (candies < candiesRequired) {
      res.send({
        msg: "Updated",
        content: player,
      });
      return;
    }
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
        candies: candies - candiesRequired,
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

router.put("/:username/cookie", async (req, res) => {
  const { mon } = req.body;
  try {
    const player = await Player.findOne({ username: req.params.username });
    const { cookies, totalBP, pokemons } = player;
    if (cookies < 1) {
      res.send({
        msg: "Updated",
        content: player,
      });
      return;
    }
    const successCookie = Math.floor(Math.random() * 10) === 4 ? true : false;
    const monToUpdate = pokemons.filter((m) => m.pokemon.name === mon);
    const index = pokemons.indexOf(monToUpdate[0]);
    monToUpdate[0].pokemon.potential = successCookie
      ? monToUpdate[0].pokemon.potential + 10
      : monToUpdate[0].pokemon.potential;

    const updatedBP = successCookie
      ? monToUpdate[0].pokemon.bp + 10
      : monToUpdate[0].pokemon.bp;
    monToUpdate[0].pokemon.bp = updatedBP;
    pokemons[index] = monToUpdate[0];

    const content = await Player.findOneAndUpdate(
      { username: req.params.username },
      {
        pokemons: pokemons,
        cookies: cookies - 1,
        totalBP: totalBP > updatedBP ? totalBP : updatedBP,
      },
      { new: true }
    );
    changeLeaderBoard(req.params.username, player.nickname, updatedBP, mon);

    res.send({
      msg: "Updated",
      content: content,
    });
  } catch (error) {
    console.log(error);
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
    const { mon, expGain, coinGain, candyGain, cookieGain } = req.body;
    const player = await Player.findOne({ username: req.params.username });
    const { candies, nickname, totalBP, coins, pokemons, cookies } = player;
    let monToUpdate = pokemons.filter((m) => m.pokemon.name === mon);
    const monIndex = pokemons.indexOf(monToUpdate[0]);
    const { exp, level, bp, potential } = monToUpdate[0].pokemon;
    let newExp = level === 100 ? exp : exp + expGain;
    let newLevel = level;
    let newBP = bp;
    //cu
    let expRequiredToLevel = newLevel * newLevel * 100;

    while (newExp >= expRequiredToLevel && level != 100) {
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
        cookies: cookies + cookieGain,
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
  const { gifts, candies, coins, cookies } = player;

  const giftClaimed = gifts.filter((g) => g._id == req.body.id);
  const { giftType, giftContent } = giftClaimed[0].gift;
  let content = {};
  if (giftType === "Reward") {
    content = await Player.findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        $inc: {
          candies: giftContent.candies,
          coins: giftContent.coins,
          cookies: giftContent.cookies,
        },
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

  res.send({
    msg: "Updated",
    content: content,
  });
});

const adminSendGift = async (gift, username) => {
  await Player.findOneAndUpdate(
    {
      username: username,
    },
    {
      $push: {
        gifts: {
          gift,
        },
      },
    },
    { new: true }
  );
};

router.put("/code", async (req, res) => {
  const adminList = config.get("adminList");
  const { code, name } = req.body;
  //backend verification: is admin
  if (adminList.find((m) => m === name)) {
    //available codes:
    /*
    ldb d
    ldb w :mon bp
    a r :coin :candy :cookies :msg
    a w :mon :bp :msg
    :username r :coin :candy :cookie :msg
    :username w :mon :bp :msg
    */

    try {
      const decoded = code.split(/[ ,]+/);
      let gift = {
        giftType: "",
        giftContent: {
          coins: 0,
          candies: 0,
        },
        giftMsg: "",
      };
      if (decoded[0] === "ldb") {
        const ldb = await Leaderboard.findOne({ phase: "Beta" });
        const { first, second, third } = ldb;
        if (decoded[1] === "d") {
          (gift.giftType = "Reward"),
            (gift.giftContent = {
              coins: 50000,
              candies: 100,
              cookies: 20,
            });
          gift.giftMsg = "Congratulations on reaching first place yesterday!";
          adminSendGift(gift, first.username);
          gift.giftContent.coins = 30000;
          gift.giftContent.candies = 50;
          gift.giftContent.cookies = 10;
          gift.giftMsg = "Congratulations on reaching second place yesterday!";
          adminSendGift(gift, second.username);
          gift.giftContent.coins = 20000;
          gift.giftContent.candies = 25;
          gift.giftContent.cookies = 5;
          gift.giftMsg = "Congratulations on reaching third place yesterday!";
          adminSendGift(gift, third.username);
        } else if (decoded[1] === "w") {
          gift.giftType = "Pokemon";
          gift.giftContent = {
            name: decoded[2],
            bp: parseInt(decoded[3]),
          };
          gift.giftMsg =
            "Congratulations for staying on the leaderboard until the end!";
          adminSendGift(gift, first.username);
          adminSendGift(gift, second.username);
          adminSendGift(gift, third.username);
        }
      } else if (decoded[0] === "a") {
        if (decoded[1] === "r") {
          gift.giftType = "Reward";
          gift.giftContent = {
            coins: parseInt(decoded[2]),
            candies: parseInt(decoded[3]),
            cookies: parseInt(decoded[4]),
          };
          let theMsg = "";
          for (let i = 5; i < decoded.length; i++) {
            theMsg = theMsg + decoded[i] + " ";
          }
          gift.giftMsg = theMsg;
          await Player.update(
            {},
            {
              $push: {
                gifts: {
                  gift,
                },
              },
            },
            { multi: true }
          );
        } else if (decoded[1] === "w") {
          gift.giftType = "Pokemon";
          gift.giftContent = {
            name: decoded[2],
            bp: parseInt(decoded[3]),
          };
          let theMsg = "";
          for (let i = 4; i < decoded.length; i++) {
            theMsg = theMsg + decoded[i] + " ";
          }
          gift.giftMsg = theMsg;
          await Player.update(
            {},
            {
              $push: {
                gifts: {
                  gift,
                },
              },
            },
            { multi: true }
          );
        }
      } else {
        const validUsername = await Player.findOne({ username: decoded[0] });
        if (!validUsername) {
          res.send({
            msg: "Cannot send to this player",
          });
          return;
        }

        if (decoded[1] === "r") {
          gift.giftType = "Reward";
          gift.giftContent = {
            coins: parseInt(decoded[2]),
            candies: parseInt(decoded[3]),
            cookies: parseInt(decoded[4]),
          };
          let theMsg = "";
          for (let i = 5; i < decoded.length; i++) {
            theMsg = theMsg + decoded[i] + " ";
          }
          gift.giftMsg = theMsg;
          adminSendGift(gift, decoded[0]);
        } else if (decoded[1] === "w") {
          gift.giftType = "Pokemon";
          gift.giftContent = {
            name: decoded[2],
            bp: parseInt(decoded[3]),
          };
          let theMsg = "";
          for (let i = 4; i < decoded.length; i++) {
            theMsg = theMsg + decoded[i] + " ";
          }
          gift.giftMsg = theMsg;
          adminSendGift(gift, decoded[0]);
        }
      }
      res.send({
        msg: "Done",
      });
    } catch (err) {
      console.log(err);
      res.send({
        msg: "Error",
      });
    }
  } else {
    res.send({
      msg: "NOT ALLOWED",
    });
  }
});

//route to initialize a player to become a master
router.post("/master", async (req, res) => {
  const { one, two, three, username, nickname, match } = req.body;
  const initialized = await Master.findOne({ username: username });
  if (!initialized) {
    const newMaster = new Master({
      username: username,
      nickname: nickname,
      one: one,
      two: two,
      three: three,
      matchedTypes: match,
      action: [0, 1, 2, 3],
    });
    await newMaster.save();
  } else {
    await Master.findOneAndUpdate(
      { username: username },
      {
        one: one,
        two: two,
        three: three,
        matchedTypes: match,
        action: [0, 1, 2, 3],
      }
    );
  }
  res.send({ msg: "Done" });
});

router.get("/master/:username", async (req, res) => {
  const masters = await Master.find();
  const playable = masters.filter((x) => x.username !== req.params.username);
  if (playable.length < 1) {
    res.send({ msg: "No" });
  } else {
    const opponent = playable[Math.floor(Math.random() * playable.length)];

    res.send({ msg: "Yes", opp: opponent });
  }
});

router.get("/master/ranking/load", async (req, res) => {
  const masters = await Master.find();
  const filteredMasters = [];
  masters.forEach((x) => {
    const pair = {
      nickname: x.nickname,
      MP: x.MP,
    };
    filteredMasters.push(pair);
  });

  for (let i = 0; i < filteredMasters.length; i++) {
    for (let j = i + 1; j < filteredMasters.length; j++) {
      if (filteredMasters[j].MP > filteredMasters[i].MP) {
        let temp = filteredMasters[i];
        filteredMasters[i] = filteredMasters[j];
        filteredMasters[j] = temp;
      }
    }
  }
  const ranking = filteredMasters;
  res.send({ ranking });
});
router.put("/master/:username", async (req, res) => {
  const master = await Master.findOne({ username: req.params.username });
  let mpGain = 0;
  if (req.body.status === "won") {
    if (req.body.emp - master.MP >= 50) {
      mpGain = 15;
    } else {
      mpGain = 10;
    }
  } else {
    if (master.MP - req.body.emp > 50) {
      mpGain = -15;
    } else {
      mpGain = -10;
    }
  }

  const updatedMaster = await Master.findOneAndUpdate(
    { username: req.params.username },
    { $inc: { MP: mpGain }, action: req.body.queue },
    { new: true }
  );
  res.send({
    data: mpGain,
  });
});
module.exports = router;
