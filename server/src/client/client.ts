import ws from "ws";
export default class Client {
  /**
   * socket connection
   */
  ws: ws.WebSocket;
  /**
   * unique id of the client
   */
  id: string;
  name: string;
  private onClose: ((e: ws.CloseEvent) => void) | null = null;
  private onError: ((e: ws.ErrorEvent) => void) | null = null;
  constructor(socket: ws.WebSocket, id: string, name: string) {
    this.ws = socket;
    this.id = id;
    this.name = name;
    this.ws.onclose = this.onClose;
    this.ws.onerror = this.onError;
  }
  kill() {
    this.ws.close();
  }
}
