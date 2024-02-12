import { v4 } from 'uuid/index';

export interface UserPayload {
  username: string;
  age: number;
  hobbies: string[];
}

export interface User extends UserPayload {
  id: any;
}
