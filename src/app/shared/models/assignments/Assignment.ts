import { AssignedTask } from "../tasks/AssignedTask";

export class Assignment extends AssignedTask {
  deadline?: Date;
  completed: boolean;
  highScore: number;
}
