"use strict";

import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import express_ws from 'express-ws';
import Player from '../models/Player.js';

const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
app.use(express.static("public/"));
const options = {
    root: path.join(__dirname)
};

express_ws(app);

app.ws("/game/:roomName", (ws, req, next) => {
    // console.log(`New connection to ${req.params.roomName}`);
    const user = new Player(
        (data) => ws.send(data),
        req.params.roomName
    );

    ws.on('message', (data) => {
        user.handleMessage(data);
    });

    // Handle disconnection
    ws.on('close', () => {
        user.handleClose();
        console.log(`${user.name} disconnected`);
    });
});

app.get("/", function (req, res, next) {
    res.sendFile(`/index.html`, options);
});

export default app;
