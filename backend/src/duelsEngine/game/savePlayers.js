function createSpellNamesFromEffects(arrEffects) {
  let arrNames = [];
  for (let i = 0; i < arrEffects.length; i++) {
    arrNames[i] = [];
    arrNames[i][0] = arrEffects[i]["spellName"];
    arrNames[i][1] = arrEffects[i]["duration"];
  }
  return arrNames;
}

function saveUser(user, mongoCollection, ws) {
  return new Promise((resolve, reject) => {
    user["buffs"] = createSpellNamesFromEffects(user["buffs"]);
    user["debuffs"] = createSpellNamesFromEffects(user["debuffs"]);

    mongoCollection.updateOne(
      { id: ws["id"] },
      {
        $set: {
          enemyType: user["enemyType"],
          actionPoints: user["actionPoints"],
          energyPoints: user["energyPoints"],
          maxHealth: user["maxHealth"],
          health: user["health"],
          muve: user["muve"],
          battlefield: user["battlefield"],
          position: user["position"],
          buffs: user["buffs"],
          debuffs: user["debuffs"],
          description: user["description"],
        },
      },
      (err, data) => {
        resolve();
      }
    );
  });
}

function saveEnemy(enemy, mongoCollection, ws) {
  return new Promise((resolve, reject) => {
    enemy["buffs"] = createSpellNamesFromEffects(enemy["buffs"]);
    enemy["debuffs"] = createSpellNamesFromEffects(enemy["debuffs"]);
    mongoCollection.updateOne(
      { id: ws["idEnemy"] },
      {
        $set: {
          enemyType: enemy["enemyType"],
          actionPoints: enemy["actionPoints"],
          energyPoints: enemy["energyPoints"],
          maxHealth: enemy["maxHealth"],
          health: enemy["health"],
          muve: enemy["muve"],
          battlefield: enemy["battlefield"],
          position: enemy["position"],
          buffs: enemy["buffs"],
          debuffs: enemy["debuffs"],
          description: enemy["description"],
        },
      },
      (err, data) => {
        resolve();
      }
    );
  });
}

function savePlayers(user, enemy, mongoCollection, ws) {
  return new Promise((resolve, reject) => {
    saveUser(user, mongoCollection, ws)
      .then((result) => saveEnemy(enemy, mongoCollection, ws))
      .then((result) => resolve());
  });
}

module.exports = savePlayers;
