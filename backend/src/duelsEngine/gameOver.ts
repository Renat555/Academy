import { Collection } from "mongodb";
import { WebSocket, WebSocketServer } from "ws";

export function gameOver(
  collection: Collection,
  ws: any,
  wss: WebSocketServer
) {
  collection.deleteOne({ id: ws["id"] });
  if (ws["enemyType"] == "AI") {
    collection.deleteOne({ id: ws["idEnemy"] });
  }
  collection.deleteOne({ id: ws["id"] }, function (err, doc) {
    if (ws["enemyType"] == "AI") {
      collection.deleteOne({ id: ws["idEnemy"] });
    }
    wss.clients.forEach(function each(client: any) {
      if (client.readyState == 1 && client["id"] == ws["idEnemy"]) {
        client.send(JSON.stringify({ header: "enemyIsLeft" }));
      }
    });
  });
}
