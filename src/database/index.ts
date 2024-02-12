import { User, UserPayload } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class DB {
  private _users: User[] = [];
  static _instance?: DB;

  constructor() {
    if (DB._instance) {
      return DB._instance;
    }
    DB._instance = this;
  }

  public getUsers() {
    return this._users;
  }

  public getUserById(userId: string) {
    return this._users.find((user) => user.id === userId);
  }

  public createUser({ username, age, hobbies }: UserPayload) {
    const newUser = {
      id: uuidv4(),
      username,
      age,
      hobbies,
    };

    this._users = [...this._users, newUser];

    return newUser;
  }

  public updateUser(userId: string, payload: UserPayload) {
    const targetUser = this._users.find((user) => user.id === userId);

    if (!targetUser) return null;

    const updatedTargetUser = {
      ...targetUser,
      ...payload,
    };

    this._users = this._users.map((user) =>
      user.id === userId ? updatedTargetUser : user,
    );

    return updatedTargetUser;
  }

  public deleteUserById(userId: string) {
    const targetUser = this._users.find((user) => user.id === userId);

    this._users = this._users.filter((user) => user.id !== targetUser?.id);

    return targetUser;
  }
}
