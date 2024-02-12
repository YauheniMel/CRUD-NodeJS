import { getUserId } from '../utils/getUserId';
import { validate as uuidValidate } from 'uuid';
import { DB } from '../database';

export const get = (res: any, route: string) => {
  const db = new DB();

  const userId = getUserId(route);

  if (!userId) return res.end(JSON.stringify(db.getUsers()));

  if (!uuidValidate(userId)) {
    res.statusCode = 400;
    res.statusMessage = new Error('Id is invalid');

    return res.end('Id is invalid');
  }

  const targetUser = db.getUserById(userId);

  if (!targetUser) {
    res.statusCode = 404;
    res.statusMessage = new Error('User not found');

    return res.end('User not found');
  }

  res.end(JSON.stringify(targetUser));
};
