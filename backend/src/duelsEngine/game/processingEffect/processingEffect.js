const createPlayers = require("../createPlayers");
const createEffect = require("../createSpells/createEffect");
const applyUserEffectsOnEffect = require("./applyUserEffectsOnEffect");
const applyEnemyEffectsOnEffect = require("./applyEnemyEffectsOnEffect");
const applyEffect = require("./applyEffect");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function processingEffect(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    let spell = createEffect(request["spell"]);
    applyUserEffectsOnEffect(spell, user);
    applyEnemyEffectsOnEffect(spell, enemy);
    applyEffect(spell, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingSpell", spell: request["spell"] };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingEffect;
