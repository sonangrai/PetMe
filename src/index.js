import express from "express"; //Importing the express
import http from "http";
import { Server } from "socket.io";
require("dotenv").config(); //The dotenv for env usage

/**
 * The app instance
 */
let app = express();

/**
 * Creating an http server
 */
let server = http.createServer(app);
//Implemented the server in the socket
const io = new Server(server, {
  transports: ["polling"],
  cors: {
    origin: "*",
  },
});

/**
 * Making port for the app
 */
let PORT = process.env.PORT || 4001;

/**
 * Making the app listen
 */
server.listen(PORT, () => {
  console.log("---- App Running on PORT `", PORT, "` -----");
});
