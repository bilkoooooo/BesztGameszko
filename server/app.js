"use strict";

import app from "./controllers/server.js";

const [, , portArg, hostArg] = process.argv;
const port = parseInt(portArg.split('=')[1], 10) ?? 3001;
const host = hostArg.split('=')[1] ?? 'localhost';

app.listen(port, () => console.log(`Started https://${host}:${port}`));
