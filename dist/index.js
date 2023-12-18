"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //Importing the express
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const Dbconnect_1 = __importDefault(require("./db/Dbconnect"));
const routes_1 = __importDefault(require("./v1/routes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config(); //The dotenv for env usage
/**
 * The app instance
 */
let app = (0, express_1.default)();
//Validating json usage
app.use(express_1.default.json());
//Disabling cors
app.use((0, cors_1.default)());
/**
 * Creating an http server
 */
let server = http_1.default.createServer(app);
//Implemented the server in the socket
const io = new socket_io_1.Server(server, {
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
 * Routes
 */
app.use("/api/v1", routes_1.default);
/**
 * Connecting to mongo DB
 */
(0, Dbconnect_1.default)();
/**
 * Making the app listen
 */
server.listen(PORT, () => {
    console.log("---- App Running on PORT `", PORT, "` -----");
});
