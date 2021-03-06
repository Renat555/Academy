const createPlayers = require("../createPlayers");
const createSpell = require("../createSpells/createSpell");
const applyUserEffectsOnSpell = require("./applyUserEffectsOnSpell");
const applyEnemyEffectsOnSpell = require("./applyEnemyEffectsOnSpell");
const applySpell = require("./applySpell");
const sendGameInformation = require("../sendGameInformation");
const savePlayers = require("../savePlayers");

function processingSpell(spellName, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    let spell = createSpell(spellName);

    if (ws["enemyType"] == "AI" && ws["muve"] == "0") {
      applyUserEffectsOnSpell(spell, enemy, user);
      applyEnemyEffectsOnSpell(spell, enemy, user);
      applySpell(spell, enemy, user);
    } else {
      applyUserEffectsOnSpell(spell, user, enemy);
      applyEnemyEffectsOnSpell(spell, user, enemy);
      applySpell(spell, user, enemy);
    }
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "processingSpell", spell: spellName };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = processingSpell;
