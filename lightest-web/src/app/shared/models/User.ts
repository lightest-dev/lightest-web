export class User {
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
