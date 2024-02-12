import { DB } from '../database';
import { UserPayload } from '../types';

export const post = (res: any, route: string, payload: UserPayload) => {
  const db = new DB();

  if (!payload?.username || !payload?.hobbies || !payload?.age) {
    res.statusCode = 400;
    res.statusMessage = new Error('Not enough user data');

    return res.end('Not enough user data');
  }

  const newUser = db.createUser(payload);

  res.end(JSON.stringify(newUser));
};
