export class User {
  id?: string;
  isAdmin?: boolean;
  isTeacher?: boolean;
  name: string;
  surname: string;
  login: string;
  email: string;
  tasks: [
    {
      id: number;
      name: string;
      completed: boolean;
      highScore: number;
    }
  ];
  groups: [
    {
      id: number;
      name: string;
    }
  ];
}
