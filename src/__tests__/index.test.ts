import {spawn} from "child_process";
import axios from "axios";

describe('GET', () => {
    let pid: number | undefined;
    beforeEach(async () => new Promise(function (resolve, reject) {
            const args = ["--port", "5000"];
            const child = spawn("ts-node ./src/index.ts", args, {
                shell: true
            });
            pid = child.pid;
            child.on('close', function (code) {
                resolve(code);
            });
            child.on('error', function (err) {
                reject(err);
            });
    }));

    it('Get all records with a GET api/users request (an empty array is expected)', async () => {
        const result = await axios.get('http://localhost:5000/api/users')
        expect(result).toBe(1);
    })

    // it('A new object is created by a POST api/users request (a response containing newly created record is expected)', () => {
    //     // tests
    // })
    //
    // it('With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)', () => {
    //     // tests
    // })
})