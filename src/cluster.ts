import {availableParallelism} from 'node:os';
import cluster from "node:cluster";
import { config } from 'dotenv';
import {server} from "./index";
import * as console from "console";

config();

const numCPUs = availableParallelism();
if (cluster.isMaster) {
    cluster.setupPrimary({
        exec: __dirname + '/index.ts'
    })

    for (let i = 1; i < numCPUs; i++) {
        cluster.fork({PORT: 4000 + i});
    }

    cluster.on('fork', (worker) => {
        console.log('worker with id ' + worker.id + ' was created');
    });
    cluster.on('exit', (worker) => {
        console.log('worker with id ' + worker.id + ' died');
        cluster.fork();
    });

    server.on('request', (req) => {
        // cluster.workers.send()
        console.log(req.url);
        console.log(req.method);
    });
}