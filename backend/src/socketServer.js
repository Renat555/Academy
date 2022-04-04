const WebSocket = require("ws");
const MongoClient = require("mongodb").MongoClient;

const createGameWithHuman = require("./duelsEngine/createGame/createGameWithHuman");
const createGameWithComputer = require("./duelsEngine/createGame/createGameWithComputer");
const computerMuve = require("./duelsEngine/computerMuve");
const processingSpell = require("./duelsEngine/game/processingSpell/processingSpell");
const processingEffect = require("./duelsEngine/game/processingEffect/processingEffect");
const processingDespell = require("./duelsEngine/game/processingDespell/processingDespell");
const muveHero = require("./duelsEngine/game/processingMove/moveHero");
const endMuve = require("./duelsEngine/game/endMove/endMove");
const processingBattlefieldSpell = require("./duelsEngine/game/processingBattlefieldSpell/processingBattlefieldSpell");

const isDev = process.env.NODE_ENV === "development";
let urlMongo;

if (isDev) {
  urlMongo = "mongodb://127.0.0.1:27017/duelsdb";
} else {
  urlMongo = "mongodb://Renat:muzuf@localhost:27017/duelsdb";
}

const mongoClient = new MongoClient(urlMongo, {
  useUnifiedTopology: true,
});
const wss = new WebSocket.Server({ port: 3001, clientTracking: true });

mongoClient.connect(function (err, client) {
  const db = client.db("duelsdb");
  const collection = db.collection("duels");

  wss.on("connection", function connection(ws) {
    ws.on("message", function (message) {
      let request = JSON.parse(message);
      console.log("new message");
      console.log(request);

      if (request["header"] == "createGame") {
        if (request["user"]["enemyType"] == "human") {
          createGameWithHuman(request["user"], collection, ws, wss);
        } else if (request["user"]["enemyType"] == "computer") {
          createGameWithComputer(request["user"], collection, ws);
          setTimeout(() => {
            computerMuve(collection, ws, wss);
          }, 1000);
        }
      }

      switch (request["header"]) {
        case "spell":
          processingSpell(request["spell"], collection, ws, wss);
          break;
        case "despell":
          processingDespell(request, collection, ws, wss);
          break;
        case "effect":
          processingEffect(request, collection, ws, wss);
          break;
        case "battlefieldSpell":
          processingBattlefieldSpell(request, collection, ws, wss);
          break;
        case "muveHero":
          muveHero(request["muve"], collection, ws, wss);
          break;
        case "endMuve":
          endMuve(collection, ws, wss);
          setTimeout(() => {
            computerMuve(collection, ws, wss);
          }, 1000);
          break;
      }
    });

    ws.on("close", function close(event, message) {
      if (message == "gameOver") {
        collection.deleteOne({ id: ws["id"] });
        if (ws["enemyType"] == "computer") {
          collection.deleteOne({ id: ws["idEnemy"] });
        }
      }

      collection.deleteOne({ id: ws["id"] }, function (err, doc) {
        if (ws["enemyType"] == "computer") {
          collection.deleteOne({ id: ws["idEnemy"] });
        }
        wss.clients.forEach(function each(client) {
          if (client.readyState == 1 && client["id"] == ws["idEnemy"]) {
            client.send(JSON.stringify({ header: "enemyIsLeft" }));
          }
        });
      });
    });
  });
});

wss.on("close", function close() {
  client.close();
});
