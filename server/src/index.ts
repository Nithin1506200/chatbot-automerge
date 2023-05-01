import * as ws from "ws";
import env from "./config";
import App from "./engine/app";
const app = new App(parseInt(env.server_port));
// start listning to the server
app.listen();
