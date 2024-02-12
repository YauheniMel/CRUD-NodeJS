import { DB } from '../database';
import { getUserId } from '../utils/getUserId';
import { validate as uuidValidate } from 'uuid';

export const deleteUser = (res: any, route: string) => {
  const db = new DB();

  const userId = getUserId(route);

  if (!userId || !uuidValidate(userId)) {
    res.statusCode = 400;
    res.statusMessage = new Error('Id is invalid');

    return res.end('Id is invalid');
  }

  const deletedUser = db.deleteUserById(userId);

  if (!deletedUser) {
    res.statusCode = 404;
    res.statusMessage = new Error('User not found');

    return res.end('User not found');
  }

  res.statusCode = 204;

  res.end(JSON.stringify(deletedUser));
};
