const endMuve = require("./game/endMove/endMove");
const processingSpell = require("./game/processingSpell/processingSpell");

function computerMuve(collection, ws, wss) {
  let player, computer;

  collection.findOne({ id: ws["id"] }).then((result) => {
    player = result;
    if (player["enemyType"] !== "AI") return;
    collection.findOne({ id: ws["idEnemy"] }, (err, doc) => {
      computer = doc;
      if (player == null || computer == null) {
        return;
      } else if (computer["muve"] == 0) {
        return;
      } else if (player["health"] <= 0 || computer["health"] <= 0) {
        return;
      } else if (
        computer["actionPoints"] == 0 ||
        computer["energyPoints"] == 0
      ) {
        setTimeout(() => {
          endMuve(collection, ws, wss);
        }, 2000);
      } else {
        setTimeout(() => {
          processingSpell("firespear", collection, ws, wss);

          setTimeout(() => {
            computerMuve(collection, ws, wss);
          }, 1000);
        }, 1000);
      }
    });
  });
}

module.exports = computerMuve;
