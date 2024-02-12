import {server} from "./index";
import {availableParallelism} from 'node:os';
import cluster from "node:cluster";
import { config } from 'dotenv';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// const __dirname = dirname(fileURLToPath(import.meta.url));


config();

// if(cluster.isPrimary) {
    const numCPUs = availableParallelism();

    cluster.setupPrimary({
        exec: __dirname + '/index.ts'
    })
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork({PORT: 4000 + i});
    }
    cluster.on('fork', (worker) => {
        console.log(worker.id);
    })
    cluster.on('exit', (worker) => {
        console.log('worker with id ' + worker.id + ' has been killed');
        cluster.fork();
    })


    // cluster.on('fork', (worker) => {
    //     console.log(worker);
    // })
// } else {
//     cluster.on('fork', (worker) => {
//         console.log(worker);
//     })
//     // let i = 1;
//     // while (i < numCPUs) {
//     if(process.env.PORT) {
//         for (let i = 0; i < numCPUs; i++) {
//             server.listen(process.env.PORT, () => {
//                 console.log('Server is up on port ' + process.env.PORT);
//             });
//         }
//     }


    // }
// }