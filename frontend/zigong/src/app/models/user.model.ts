export interface IUser {
  id: number;
  name: string;
  lastName: string;
  birthDate: Date;
  createDate: Date;
  editDate: Date;
  active: boolean;
  removed: boolean;
}

export class User implements IUser {
  id: number;
  name: string;
  lastName: string;
  birthDate: Date;
  createDate: Date;
  editDate: Date;
  active: boolean;
  removed: boolean;
}
