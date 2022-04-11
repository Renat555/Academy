import WebSocket from "ws";
import { MongoClient } from "mongodb";
import { dev, prod } from "./config";
import createGameWithComputer = require("./duelsEngine/createGame/createGameWithComputer");
import createGameWithHuman = require("./duelsEngine/createGame/createGameWithHuman");
import endMove = require("./duelsEngine/game/endMove/endMove");
import processingSpell = require("./duelsEngine/game/processingSpell/processingSpell");
import { gameOver } from "./duelsEngine/gameOver";
import computerMuve = require("./duelsEngine/computerMuve");
import processingEffect = require("./duelsEngine/game/processingEffect/processingEffect");
const playerMovement = require("./duelsEngine/game/processingMove/moveHero");

let urlMongo;

if (process.env.NODE_ENV == "dev") {
  urlMongo = dev.mongo.url;
} else {
  urlMongo = prod.mongo.url;
}

const mongoClient = new MongoClient(urlMongo);
const wss = new WebSocket.Server({ port: 3001, clientTracking: true });

mongoClient.connect(function (err, client) {
  if (!client) return;
  const db = client.db("duelsdb");
  const collection = db.collection("duels");
  wss.on("connection", function connection(ws) {
    ws.on("message", function (message) {
      let request = JSON.parse(message.toString());
      //console.log(request);

      switch (request["header"]) {
        case "createGame":
          if (request["user"]["enemyType"] === "AI") {
            createGameWithComputer(request["user"], collection, ws);
            setTimeout(() => {
              computerMuve(collection, ws, wss);
            }, 1000);
          } else if (request["user"]["enemyType"] === "human") {
            createGameWithHuman(request["user"], collection, ws, wss);
          }
          break;
        case "playerMovement":
          playerMovement(request["trajectory"], collection, ws, wss);
          break;
        case "spell":
          processingSpell(request["spell"], collection, ws, wss);
          break;
        case "effect":
          processingEffect(request, collection, ws, wss);
          break;
        case "endMove":
          endMove(collection, ws, wss);
          setTimeout(() => {
            computerMuve(collection, ws, wss);
          }, 1000);
          break;
        case "gameOver":
          gameOver(collection, ws, wss);
          break;
      }
    });

    ws.on("close", function close(event, message) {
      gameOver(collection, ws, wss);
    });
  });

  wss.on("close", function close() {
    client.close();
  });
});
