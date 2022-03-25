import WebSocket from "ws";
import { MongoClient } from "mongodb";
import { dev, prod } from "./config";
import createGameWithComputer = require("./duelsEngine/createGame/createGameWithComputer");
import createGameWithHuman = require("./duelsEngine/createGame/createGameWithHuman");

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

      if (request["user"]["enemyType"] === "AI") {
        createGameWithComputer(request["user"], collection, ws);
      } else if (request["user"]["enemyType"] === "human") {
        createGameWithHuman(request["user"], collection, ws, wss);
      }
    });
  });
});
