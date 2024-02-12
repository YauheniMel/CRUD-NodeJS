import http from 'node:http';
import url from 'node:url';
import { get } from './routes/get';
import { post } from './routes/post';
import { deleteUser } from './routes/delete';
import { put } from './routes/put';
import { DB } from './database/index';
import { config } from 'dotenv';

config();

new DB();

export const server = http
  .createServer((req: any, res) => {
    const { path: route } = url.parse(req.url, true);

    if (!route || !route.startsWith('/api/users')) {
      res.statusCode = 404;
      res.statusMessage = 'Route is unavailable';

      return res.end('Route is unavailable');
    }

    switch (req.method) {
      case 'GET': {
        get(res, route);

        break;
      }
      case 'POST': {
        let payload = '';

        req.on('data', (chunck: any) => {
          payload += chunck;
        });
        req.on('end', function () {
          post(res, route, JSON.parse(payload));
        });

        break;
      }
      case 'PUT': {
        let payload = '';

        req.on('data', (chunck: any) => {
          payload += chunck;
        });
        req.on('end', function () {
          put(res, route, JSON.parse(payload));
        });

        break;
      }
      case 'DELETE': {
        deleteUser(res, route);

        break;
      }
    }
  })
  .on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });

server.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + process.env.PORT);
});
