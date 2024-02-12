import { UserPayload } from '../types';
import { DB } from '../database';
import { getUserId } from '../utils/getUserId';
import { validate as uuidValidate } from 'uuid';

export const put = (res: any, route: string, payload: UserPayload) => {
  const db = new DB();

  const userId = getUserId(route);

  const dataIsValid = Object.keys(payload).every((key) =>
    ['username', 'age', 'hobbies'].includes(key),
  );

  if (!userId || !dataIsValid || !uuidValidate(userId)) {
    res.statusCode = 400;
    res.statusMessage = new Error('Provided invalid user data');

    return res.end('Provided invalid user data');
  }

  const updatedUser = db.updateUser(userId, payload);

  if (!updatedUser) {
    res.statusCode = 404;
    res.statusMessage = new Error("User doesn't exist");

    return res.end("User doesn't exist");
  }

  res.end(JSON.stringify(updatedUser));
};
