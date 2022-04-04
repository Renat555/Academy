const createPlayers = require("../createPlayers");
const makeMuve = require("./makeMove");
const savePlayers = require("../savePlayers");
const sendGameInformation = require("../sendGameInformation");

function playerMovement(request, collection, ws, wss) {
  createPlayers(collection, ws).then((result) => {
    let { user, enemy } = result;
    makeMuve(request, user, enemy);
    savePlayers(user, enemy, collection, ws).then((result) => {
      let response = { header: "playerMovement" };
      sendGameInformation(response, collection, ws, wss);
    });
  });
}

module.exports = playerMovement;
