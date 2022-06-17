const spellClasses = require("../../spellClasses");

function extractCoord(spell) {
  let coord = [];
  for (let i = 0; i < spell[2].length; i++) {
    coord.push(spell[2][i]);
  }

  return coord;
}

function isCoordOverlay(playerCoord, spellCoord) {
  for (let i = 0; i < spellCoord.length; i++) {
    if (
      playerCoord[0] == spellCoord[i][0] &&
      playerCoord[1] == spellCoord[i][1]
    ) {
      return true;
    }
  }

  return false;
}

function createEffectsFromBattlefield(player) {
  let playerBattlefieldEffects = [];
  let spell;

  let playerCoord = player.position.user[0];

  for (let i = 0; i < player.battlefield.length; i++) {
    switch (player.battlefield[i][0]) {
      case "watersphere":
        let spellCoord = extractCoord(player.battlefield[i]);
        if (!isCoordOverlay(playerCoord, spellCoord)) continue;

        const Watersphere = spellClasses.Watersphere;
        spell = new Watersphere(player.battlefield[i][1]);
        playerBattlefieldEffects.push(spell);
        break;
    }
  }

  return playerBattlefieldEffects;
}

module.exports = createEffectsFromBattlefield;
