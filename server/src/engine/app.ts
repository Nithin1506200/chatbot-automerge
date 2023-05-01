import http from "http";
import ws, { WebSocketServer } from "ws";
import Room from "../room/room";
import { WsRequest } from "./request";

export default class App {
  ws_server: ws.Server;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  totalRooms: number = 0;
  rooms: Map<string, Room> = new Map([["test", new Room("test")]]);
  constructor(public port: number) {
    this.server = http.createServer();
    this.ws_server = new WebSocketServer({
      server: this.server,
    });
    this.ws_server.addListener("connection", (client, request) => {
      this.onConnectionRequest(client, request);
    });
  }
  /**
   * - get the client
   * - validate the client
   * - add to sepecific room
   * @param client
   * @param request
   */
  onConnectionRequest(client: ws.WebSocket, request: http.IncomingMessage) {
    const req: Map<keyof WsRequest, string> = new URLSearchParams(
      request.url?.slice(2)
    ) as any;
    // extract information of from websocket request
    const [id, name, room] = [req.get("id"), req.get("name"), req.get("room")];

    if (id && name && room) {
      // if the room exists add that to the room
      if (this.rooms.get(room)) {
        this.rooms.get(room)?.addClient(client, id, name);
      } else {
        const newRoom = new Room(room);
        newRoom.addClient(client, id, name);
        this.rooms.set(room, newRoom);
      }
    } else {
      // validate error
    }
  }

  /**
   * start litning to the server
   */
  listen() {
    this.server.listen(this.port);
    console.log("****** server running at port ", this.port);
  }
  addRooms() {}
}
