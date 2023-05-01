import Client from "../client/client";

import ws from "ws";
/**
 *
 */
export default class Room {
  clients: Client[] = [];
  roomId: string;
  /**
   * when the client list is empty
   */
  onNoClients: CallableFunction | undefined;
  constructor(roomId: string) {
    this.roomId = roomId;
  }
  addClient(socket: ws.WebSocket, id: string, name: string) {
    const client = new Client(socket, id, name);
    this.clients.push(client);

    client.ws.onclose = () => {
      this.removeClient(client);
    };
    client.ws.onerror = () => {
      this.removeClient(client);
    };
    console.log("client added to room ", this.roomId, this.clients.length);
  }
  removeClient(client: Client) {
    //todo
    client.kill();
    this.clients = this.clients.filter((e) => e !== client);
    if (this.clients.length === 0 && this.onNoClients) {
      this.onNoClients();
    }
    console.log(
      "client got disconnected ",
      client.name,
      client.id,
      this.roomId
    );
  }
  kill() {
    this.clients.forEach((client) => client.kill());
    this.clients = [];
  }
}
