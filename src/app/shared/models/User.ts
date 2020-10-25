import { Assignment } from "./assignments/Assignment";

export class User {
  id?: string;
  isAdmin?: boolean;
  isTeacher?: boolean;
  name: string;
  surname: string;
  userName: string;
  email: string;
  tasks: Assignment[];
  groups: [
    {
      id: number;
      name: string;
    }
  ];
}
