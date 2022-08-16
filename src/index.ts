import express, { Request, Response } from 'express';
import FileSystem from 'fs';
import 'colors';
import './db';
const app = express();
const port = 3000;

const Routes = FileSystem.readdirSync('./dist/routes');

for (const Route of Routes) {
    const RouteFile = require(`./routes/${Route}`);

    if (Array.isArray(RouteFile.config.methods)) {
        for (const Method of RouteFile.config.methods) {
            app[Method.toString().toLowerCase()](RouteFile.config.path, RouteFile.default);
        }
    } else {
        app[RouteFile.config.method.toString().toLowerCase()](RouteFile.config.path, RouteFile.default);
    }
}

function portCallback() {
    const URL = `https://localhost:${port}/`;
    console.log(`API successfully deployed on: `.green + URL.blue.underline)
}

app.listen(3000, portCallback)

//...
